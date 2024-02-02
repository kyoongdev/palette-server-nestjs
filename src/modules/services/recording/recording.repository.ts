import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindSQLRecordingList } from '@/interface/recording.interface';
import { recordingInclude, recordingListInclude } from '@/utils/constants/include/recording';

import { RECORDING_ERROR_CODE } from './exception/error-code';

@Injectable()
export class RecordingRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findRecording(id: string) {
    const recording = this.database.getRepository().recording.findUnique({
      where: {
        id,
      },
      include: recordingInclude,
    });

    if (!recording) {
      throw new CustomException(RECORDING_ERROR_CODE.RECORDING_NOT_FOUND);
    }
    return recording;
  }

  async findRecordings(args = {} as Prisma.RecordingFindManyArgs) {
    const { select, include, where, ...rest } = args;
    const recordings = await this.database.getRepository().recording.findMany({
      where,
      include: recordingListInclude,
      ...rest,
    });

    return recordings;
  }

  async countRecordings(args = {} as Prisma.RecordingCountArgs) {
    const count = await this.database.getRepository().recording.count(args);
    return count;
  }

  async findRecordingsWithSQL(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw<FindSQLRecordingList[]>(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }
  async createRecording(data: Prisma.RecordingCreateInput) {
    const recording = await this.database.getRepository().recording.create({
      data,
    });

    return recording;
  }

  async updateRecording(id: string, data: Prisma.RecordingUpdateInput) {
    await this.database.getRepository().recording.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteRecording(id: string) {
    await this.database.getRepository().recording.delete({
      where: {
        id,
      },
    });
  }
}
