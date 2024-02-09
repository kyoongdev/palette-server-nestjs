import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { CreateMoodDTO, MoodDTO } from './dto';
import { MOOD_ERROR_CODE } from './exception/error-code';

@Injectable()
export class MoodRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMood(id: string) {
    const mood = await this.database.getRepository().mood.findUnique({
      where: {
        id,
      },
    });

    if (!mood) {
      throw new CustomException(MOOD_ERROR_CODE.MOOD_NOT_FOUND);
    }

    return mood;
  }

  async findMoods(args = {} as Prisma.MoodFindManyArgs) {
    const moods = await this.database.getRepository().mood.findMany(args);

    return moods;
  }

  async countMood(args = {} as Prisma.MoodCountArgs) {
    const count = await this.database.getRepository().mood.count(args);

    return count;
  }

  async createMood(data: CreateMoodDTO) {
    const mood = await this.database.getRepository().mood.create({
      data,
    });

    return mood;
  }

  async updateMood(id: string, data: CreateMoodDTO) {
    await this.database.getRepository().mood.updateMany({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMood(id: string) {
    await this.database.getRepository().mood.delete({
      where: {
        id,
      },
    });
  }
}
