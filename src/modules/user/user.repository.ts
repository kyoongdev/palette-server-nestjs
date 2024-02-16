import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindCommonUser } from '@/interface/user.interface';
import { checkUserBySocialIdInclude, commonUserInclude } from '@/utils/constants/include/user';

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
      include: commonUserInclude,
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
      include: commonUserInclude,
    });

    if (!user) {
      throw new CustomException(USER_ERROR_CODE.USER_NOT_FOUND);
    }

    return user;
  }

  async checkUserBySocialId(socialId: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        social: {
          socialId,
        },
      },
      include: checkUserBySocialIdInclude,
    });

    return user ?? null;
  }

  async checkUserByEmail(email: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        email,
      },
      include: commonUserInclude,
    });

    return user ?? null;
  }

  async checkUserByNickname(nickname: string) {
    const user = await this.database.getRepository().user.findFirst({
      where: {
        nickname,
      },
      include: commonUserInclude,
    });

    return user ?? null;
  }

  async findUsers<T = FindCommonUser>(args = {} as Prisma.UserFindManyArgs): Promise<T[]> {
    const { where, include, select, ...rest } = args;
    const users = (await this.database.getRepository().user.findMany({
      where: where,
      include: include ?? commonUserInclude,
      ...rest,
    })) as T[];

    return users;
  }

  async countUser(args = {} as Prisma.UserCountArgs) {
    return await this.database.getRepository().user.count(args);
  }

  async createUser(data: Prisma.UserCreateInput) {
    const user = await this.database.getRepository().user.create({
      data,
      include: commonUserInclude,
    });

    return user;
  }

  async createSocialUser(data: CreateSocialUserDTO) {
    const { socialId, socialType, profileImageId, ...rest } = data;
    const user = await this.database.getRepository().user.create({
      data: {
        ...rest,
        social: {
          create: {
            socialId: data.socialId,
            socialType: data.socialType,
          },
        },
        profileImage: {
          connect: {
            id: profileImageId,
          },
        },
      },
      include: commonUserInclude,
    });

    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    await this.database.getRepository().user.updateMany({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string) {
    await this.database.getRepository().user.updateMany({
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
