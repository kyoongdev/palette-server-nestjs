import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';
import { PrismaService } from '@/database/prisma.service';

import { CommonUserDTO } from './dto/common-user.dto';
import { UserDTO } from './dto/user.dto';
import { USER_ERROR_CODE } from './exception/errorCode';
import { UserException } from './exception/user.exception';

@Injectable()
export class UserRepository extends PrismaDatabase {
  async findCommonUser(id: string) {
    const user = await this.getRepository().user.findUnique({
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
    const user = await this.getRepository().user.findUnique({
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
    const user = await this.getRepository().user.findFirst({
      where: {
        email,
      },
    });

    return user ? new UserDTO(user) : null;
  }

  async findCommonUsers(args: Prisma.UserFindManyArgs) {
    const users = await this.getRepository().user.findMany({
      ...args,
      include: {
        musician: true,
      },
    });

    return users.map((user) => new CommonUserDTO(user));
  }

  async findUsers(args: Prisma.UserFindManyArgs) {
    const users = await this.getRepository().user.findMany({
      ...args,
      include: {
        musician: true,
      },
    });

    return users.map((user) => new UserDTO(user));
  }

  async countUser(args: Prisma.UserCountArgs) {
    return await this.getRepository().user.count(args);
  }
}
