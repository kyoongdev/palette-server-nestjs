import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { MR_BEAT_ERROR_CODE } from './exception/error-code';

@Injectable()
export class MrBeatRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMrBeat(id: string) {
    const mrBeat = await this.database.getRepository().mrBeat.findUnique({
      where: {
        id,
      },
      include: {
        contacts: {
          include: {
            contact: true,
          },
        },
        genre: true,
        mood: true,
        licenses: {
          include: {
            license: true,
          },
        },
        music: true,
        thumbnail: true,
        musicianServices: {
          include: {
            musician: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!mrBeat) {
      throw new CustomException(MR_BEAT_ERROR_CODE.MR_BEAT_NOT_FOUND);
    }
    return mrBeat;
  }

  async countMrBeat(args = {} as Prisma.MrBeatCountArgs) {
    return this.database.getRepository().mrBeat.count(args);
  }

  async findMrBeats(args = {} as Prisma.MrBeatFindManyArgs) {
    const { where, include, select, ...rest } = args;
    const mrBeats = await this.database.getRepository().mrBeat.findMany({
      where,
      include: {
        contacts: {
          include: {
            contact: true,
          },
        },
        genre: true,
        mood: true,
        licenses: {
          include: {
            license: true,
          },
        },
        music: true,
        thumbnail: true,
        musicianServices: {
          include: {
            musician: {
              include: {
                user: true,
              },
            },
          },
        },
      },
      ...rest,
    });

    return mrBeats;
  }

  async createMrBeat(musicianId: string, data: Prisma.MrBeatCreateArgs['data']) {
    const mrBeat = await this.database.getRepository().mrBeat.create({
      data: {
        ...data,
        musicianServices: {
          create: {
            musicianId,
          },
        },
      },
    });

    return mrBeat;
  }

  async updateMrBeat(id: string, data: Prisma.MrBeatUpdateArgs['data']) {
    await this.database.getRepository().mrBeat.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMrBeat(id: string) {
    await this.database.getRepository().mrBeat.delete({
      where: {
        id,
      },
    });
  }
}
