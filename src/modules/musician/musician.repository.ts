import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { MUSICIAN_ERROR_CODE } from './exception/error-code';

@Injectable()
export class MusicianRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMusician(id: string) {
    const musician = await this.database.getRepository().musician.findFirst({
      where: {
        id,
      },
    });

    if (!musician) {
      throw new CustomException(MUSICIAN_ERROR_CODE.MUSICIAN_NOT_FOUND);
    }

    return musician;
  }
  async findMusicianByUserId(userId: string) {
    const musician = await this.database.getRepository().musician.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!musician) {
      throw new CustomException(MUSICIAN_ERROR_CODE.MUSICIAN_NOT_FOUND);
    }

    return musician;
  }

  async findMusicians(args = {} as Prisma.MusicianFindManyArgs) {
    const { where, include, select, ...rest } = args;
    const musicians = await this.database.getRepository().musician.findMany({
      where,
      include: {
        _count: {
          select: {
            services: true,
          },
        },
        user: {
          include: {
            profileImage: true,
          },
        },
      },
      ...rest,
    });

    return musicians;
  }

  async countMusicians(args = {} as Prisma.MusicianCountArgs) {
    const count = await this.database.getRepository().musician.count(args);

    return count;
  }

  async createMusician(data: Prisma.MusicianCreateArgs['data']) {
    return await this.database.getRepository().musician.create({
      data,
    });
  }

  async updateMusician(id: string, data: Prisma.MusicianUpdateArgs['data']) {
    await this.database.getRepository().musician.updateMany({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async deleteMusician(id: string) {
    await this.database.getRepository().musician.updateMany({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }

  async hardDeleteMusician(id: string) {
    await this.database.getRepository().musician.delete({
      where: {
        id,
      },
    });
  }
}
