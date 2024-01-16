import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';

import { CommonUserDTO, CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { USER_ERROR_CODE } from './exception/errorCode';
import { UserException } from './exception/user.exception';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findCommonUser(id: string) {
    const user = await this.database.getRepository().user.findUnique({
      where: {
        id,
      },
      include: {
        musician: true,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.USER_NOT_FOUND);
    }

    return new CommonUserDTO(user);
  }

  async findUser(id: string) {
    const user = await this.database.getRepository().user.findUnique({
      where: {
        id,
      },
      include: {
        musician: true,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.USER_NOT_FOUND);
    }

    return new UserDTO(user);
  }

  async checkUserByEmail(email: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        email,
      },
    });

    return user ? new UserDTO(user) : null;
  }

  async findCommonUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.getRepository().user.findMany({
      ...args,
      include: {
        musician: true,
      },
    });

    return users.map((user) => new CommonUserDTO(user));
  }

  async findUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.getRepository().user.findMany({
      ...args,
      include: {
        musician: true,
      },
    });

    return users.map((user) => new UserDTO(user));
  }

  async countUser(args = {} as Prisma.UserCountArgs) {
    return await this.database.getRepository().user.count(args);
  }

  async createUser(data: CreateUserDTO) {
    const user = await this.database.getRepository().user.create({
      data,
    });

    return new CommonUserDTO(user);
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.database.getRepository().user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string) {
    await this.database.getRepository().user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteUser(id: string) {
    await this.database.getRepository().user.delete({
      where: {
        id,
      },
    });
  }
}
