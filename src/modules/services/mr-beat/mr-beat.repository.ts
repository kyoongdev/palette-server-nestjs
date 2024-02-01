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

  async countMrBeats(args = {} as Prisma.MrBeatCountArgs) {
    return this.database.getRepository().mrBeat.count(args);
  }

  async findMrBeats(args = {} as Prisma.MrBeatFindManyArgs) {
    const { where, include, select, ...rest } = args;
    const mrBeats: FindMrBeatList[] = await this.database.getRepository().mrBeat.findMany({
      ...rest,
      where,
      include: mrBeatListInclude,
    });

    return mrBeats;
  }

  async findMrBeatsWithSQL(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw<FindSQLMrBeatList[]>(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async createMrBeat(data: Prisma.MrBeatCreateArgs['data']) {
    const mrBeat = await this.database.getRepository().mrBeat.create({
      data,
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
