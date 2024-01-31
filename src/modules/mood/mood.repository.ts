import { Injectable } from '@nestjs/common';

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

  async findMoods() {
    const moods = await this.database.getRepository().mood.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return moods.map((mood) => new MoodDTO(mood));
  }
  async createMood(data: CreateMoodDTO) {
    const mood = await this.database.getRepository().mood.create({
      data: {
        ...data,
        order: data.order ?? 0,
      },
    });

    return mood;
  }

  async updateMood(id: string, data: CreateMoodDTO) {
    const isExist = await this.findMood(id);

    if (data.order) {
      await this.database.getRepository().mood.updateMany({
        where: {
          ...(isExist.order > data.order
            ? {
                AND: [
                  {
                    order: {
                      lt: isExist.order,
                    },
                  },
                  {
                    order: {
                      gte: data.order,
                    },
                  },
                ],
              }
            : {
                AND: [
                  {
                    order: {
                      lte: data.order,
                    },
                  },
                  {
                    order: {
                      gt: isExist.order,
                    },
                  },
                ],
              }),
        },
        data: {
          order: {
            ...(isExist.order > data.order
              ? {
                  increment: 1,
                }
              : {
                  decrement: 1,
                }),
          },
        },
      });
    }

    await this.database.getRepository().mood.updateMany({
      where: {
        id,
      },
      data: {
        ...data,
        order: data.order ?? 0,
      },
    });
  }

  async deleteMood(id: string) {
    const isExist = await this.findMood(id);

    await this.database.getRepository().mood.updateMany({
      where: {
        order: {
          gt: isExist.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    await this.database.getRepository().mood.delete({
      where: {
        id,
      },
    });
  }
}
