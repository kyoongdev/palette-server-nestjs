import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { MUSICIAN_ERROR_CODE } from './exception/error-code';

@Injectable()
export class MusicianRepository {
  constructor(private readonly database: PrismaDatabase) {}

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

  async createMusician(data: Prisma.MusicianCreateArgs['data']) {
    return await this.database.getRepository().musician.create({
      data,
    });
  }

  async updateMusician(id: string, data: Prisma.MusicianUpdateArgs['data']) {
    await this.database.getRepository().musician.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMusician(id: string) {
    await this.database.getRepository().musician.update({
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
