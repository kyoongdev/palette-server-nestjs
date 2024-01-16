import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { ClsService } from 'nestjs-cls';

import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { CreateUserDTO, UpdateUserDTO } from './dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cls: ClsService
  ) {}

  async findUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
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

  async findUser(id: string) {
    return this.userRepository.findUser(id);
  }

  async createUser(data: CreateUserDTO) {}

  async updateUser(id: string, data: UpdateUserDTO) {}

  async deleteUser(id: string) {}
}
