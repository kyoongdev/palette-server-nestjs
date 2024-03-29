import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindMrBeat, FindMrBeatList, FindSQLMrBeatList } from '@/interface/mr-beat.interface';
import { mrBeatDetailInclude, mrBeatListInclude } from '@/utils/constants/include/mr-beat';

import { MR_BEAT_ERROR_CODE } from './exception/error-code';

@Injectable()
export class MrBeatRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMrBeat(id: string) {
    const mrBeat: FindMrBeat | undefined = await this.database.getRepository().mrBeat.findUnique({
      where: {
        id,
      },
      include: mrBeatDetailInclude,
    });

    if (!mrBeat) {
      throw new CustomException(MR_BEAT_ERROR_CODE.MR_BEAT_NOT_FOUND);
    }
    return mrBeat;
  }

  async findMrBeatByServiceId(id: string) {
    const service = await this.database.getRepository().musicianService.findUnique({
      where: {
        id,
      },
      include: {
        mrBeat: {
          include: mrBeatDetailInclude,
        },
      },
    });

    if (!service || !service.mrBeat) {
      throw new CustomException(MR_BEAT_ERROR_CODE.MR_BEAT_NOT_FOUND);
    }
    return service.mrBeat;
  }

  async countMrBeats(args = {} as Prisma.MrBeatCountArgs) {
    return this.database.getRepository().mrBeat.count(args);
  }

  async findMrBeats<T = FindMrBeatList>(args = {} as Prisma.MrBeatFindManyArgs): Promise<T[]> {
    const { where, include, select, ...rest } = args;
    const mrBeats = (await this.database.getRepository().mrBeat.findMany({
      ...rest,
      where,
      include: include ?? mrBeatListInclude,
    })) as T[];

    return mrBeats;
  }

  async findMrBeatsWithSQL<T = FindSQLMrBeatList>(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw<T[]>(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async createMrBeat(data: Prisma.MrBeatCreateInput) {
    const mrBeat = await this.database.getRepository().mrBeat.create({
      data,
    });

    return mrBeat;
  }

  async updateMrBeat(id: string, data: Prisma.MrBeatUpdateInput) {
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
