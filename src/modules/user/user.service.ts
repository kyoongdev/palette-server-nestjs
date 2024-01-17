import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Prisma } from '@prisma/client';

import { Transactional } from '@/utils/aop/transaction/transaction';
import { EncryptProvider } from '@/utils/encrypt';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';
import { validatePassword } from '@/utils/regex';

import { CheckEmailResultDTO, UpdatePasswordDTO, UpdateUserDTO } from './dto';
import { CheckEmailDTO } from './dto/check-email.dto';
import { USER_ERROR_CODE } from './exception/errorCode';
import { UserException } from './exception/user.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypt: EncryptProvider,
    private readonly configService: ConfigService
  ) {}

  async findCommonUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const users = await this.userRepository.findCommonUsers({
      ...args,
      skip,
      take,
    });
    const count = await this.userRepository.countUser({
      where: args.where,
    });
    return new PaginationDTO(users, { paging, count });
  }

  async findCommonUser(id: string) {
    return this.userRepository.findCommonUser(id);
  }

  async checkEmail(data: CheckEmailDTO) {
    const user = await this.userRepository.checkUserByEmail(data.email);
    return new CheckEmailResultDTO({
      email: data.email,
      isExists: Boolean(user),
    });
  }

  @Transactional()
  async updateUser(id: string, data: UpdateUserDTO) {
    await this.findCommonUser(id);

    await this.userRepository.updateUser(id, data);
  }

  async updatePassword(id: string, data: UpdatePasswordDTO) {
    if (!validatePassword(data.newPassword)) {
      throw new UserException(USER_ERROR_CODE.PASSWORD_FORMAT_ERROR);
    }

    const userPassword = await this.userRepository.findUserPassword(id);

    const isMatch = this.encrypt.comparePassword(data.password, userPassword);

    if (!isMatch) {
      throw new UserException(USER_ERROR_CODE.PASSWORD_NOT_MATCH);
    }

    const newPassword = this.encrypt.hashPassword(data.newPassword);

    await this.userRepository.updateUser(id, { password: newPassword });
  }

  @Transactional()
  async deleteUser(id: string) {
    await this.findCommonUser(id);
    await this.userRepository.deleteUser(id);
  }
}
