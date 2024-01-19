import { Injectable } from '@nestjs/common';

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
  }
}
