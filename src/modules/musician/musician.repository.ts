import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindCommonMusician } from '@/interface/musician.interface';
import { commonMusicianInclude } from '@/utils/constants/include/musician';

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

  async findMusicians<T = FindCommonMusician>(args = {} as Prisma.MusicianFindManyArgs): Promise<T[]> {
    const { where, include, select, ...rest } = args;
    const musicians = (await this.database.getRepository().musician.findMany({
      where,
      include: include ?? commonMusicianInclude,
      ...rest,
    })) as T[];

    return musicians;
  }

  async countMusicians(args = {} as Prisma.MusicianCountArgs) {
    const count = await this.database.getRepository().musician.count(args);

    return count;
  }

  async createMusician(data: Prisma.MusicianCreateInput) {
    return await this.database.getRepository().musician.create({
      data,
    });
  }

  async updateMusician(id: string, data: Prisma.MusicianUpdateInput) {
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
