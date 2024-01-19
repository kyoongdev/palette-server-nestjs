import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { CommonUserDTO, CreateUserDTO, UpdateUserDTO, UserDTO } from './dto';
import { CreateSocialUserDTO } from './dto/create-social-user.dto';
import { USER_ERROR_CODE } from './exception/error-code';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaDatabase) {}

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
      throw new CustomException(USER_ERROR_CODE.USER_NOT_FOUND);
    }

    return user;
  }

  async findUserBySocialId(socialId: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        social: {
          socialId,
        },
      },
      include: {
        musician: true,
      },
    });

    if (!user) {
      throw new CustomException(USER_ERROR_CODE.USER_NOT_FOUND);
    }

    return new UserDTO(user);
  }

  async checkUserBySocialId(socialId: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        social: {
          socialId,
        },
      },
      include: {
        musician: true,
      },
    });

    return user ?? null;
  }

  async checkUserByEmail(email: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        email,
      },
      include: {
        musician: true,
      },
    });

    return user ?? null;
  }

  async findUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.getRepository().user.findMany({
      ...args,
      include: {
        musician: true,
      },
    });

    return users;
  }

  async countUser(args = {} as Prisma.UserCountArgs) {
    return await this.database.getRepository().user.count(args);
  }

  async createUser(data: CreateUserDTO) {
    const user = await this.database.getRepository().user.create({
      data,
      include: {
        musician: true,
      },
    });

    return user;
  }

  async createSocialUser(data: CreateSocialUserDTO) {
    const { socialId, socialType, ...rest } = data;
    const user = await this.database.getRepository().user.create({
      data: {
        ...rest,
        social: {
          create: {
            socialId: data.socialId,
            socialType: data.socialType,
          },
        },
      },
      include: {
        musician: true,
      },
    });

    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateArgs['data']) {
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
