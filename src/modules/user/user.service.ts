import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { EncryptProvider } from '@/utils/encrypt';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';
import { validatePassword } from '@/utils/regex';

import {
  CheckEmailResultDTO,
  CheckNicknameDTO,
  CheckNicknameResultDTO,
  CommonUserDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from './dto';
import { CheckEmailDTO } from './dto/check-email.dto';
import { USER_ERROR_CODE } from './exception/error-code';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypt: EncryptProvider
  ) {}

  async findCommonUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const users = await this.userRepository.findUsers({
      ...args,
      skip,
      take,
    });
    const count = await this.userRepository.countUser({
      where: args.where,
    });

    return new PaginationDTO(
      users.map((user) => new CommonUserDTO(user)),
      { paging, count }
    );
  }

  async findCommonUser(id: string) {
    const user = await this.userRepository.findUser(id);
    return new CommonUserDTO(user);
  }

  async checkEmail(data: CheckEmailDTO) {
    const user = await this.userRepository.checkUserByEmail(data.email);
    return new CheckEmailResultDTO({
      email: data.email,
      isExists: Boolean(user),
    });
  }

  async checkNickname(data: CheckNicknameDTO) {
    const user = await this.userRepository.checkUserByNickname(data.nickname);
    return new CheckNicknameResultDTO({
      nickname: data.nickname,
      isExists: Boolean(user),
    });
  }

  async findEmail() {
    //TODO: 이메일 찾기 + 휴대폰 번호 인증
  }

  @Transactional()
  async updateUser(id: string, data: UpdateUserDTO) {
    await this.userRepository.updateUser(id, data);
  }

  @Transactional()
  async updatePassword(id: string, data: UpdatePasswordDTO) {
    const user = await this.userRepository.findUser(id);

    if (!user.password) {
      throw new CustomException(USER_ERROR_CODE.PASSWORD_NOT_EXIST);
    }

    const isMatch = this.encrypt.comparePassword(data.password, user.password);

    if (!isMatch) {
      throw new CustomException(USER_ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    if (!data.newPassword) {
      return;
    }

    if (!validatePassword(data.newPassword)) {
      throw new CustomException(USER_ERROR_CODE.PASSWORD_FORMAT_ERROR);
    }

    const newPassword = this.encrypt.hashPassword(data.newPassword);

    await this.userRepository.updateUser(id, { password: newPassword });
  }

  @Transactional()
  async deleteUser(id: string) {
    await this.userRepository.deleteUser(id);
  }
}
