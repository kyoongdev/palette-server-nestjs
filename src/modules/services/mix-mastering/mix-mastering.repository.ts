import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindMixMasteringList, FindSQLMixMastering } from '@/interface/mix-mastering';
import { mixMasteringInclude, mixMasteringListInclude } from '@/utils/constants/include/mix-mastering';

import { MIX_MASTERING_ERROR_CODE } from './exception/error-code';

@Injectable()
export class MixMasteringRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMixMastering(id: string) {
    const mixMastering = await this.database.getRepository().mixMastering.findUnique({
      where: {
        id,
      },
      include: mixMasteringInclude,
    });

    if (!mixMastering) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.MIX_MASTERING_NOT_FOUND);
    }

    return mixMastering;
  }

  async findMixMasteringByServiceId(id: string) {
    const service = await this.database.getRepository().musicianService.findUnique({
      where: {
        id,
      },
      include: {
        mixMastering: {
          include: mixMasteringInclude,
        },
      },
    });

    if (!service || !service.mixMastering) {
      throw new CustomException(MIX_MASTERING_ERROR_CODE.MIX_MASTERING_NOT_FOUND);
    }

    return service.mixMastering;
  }

  async findMixMasterings<T = FindMixMasteringList>(args = {} as Prisma.MixMasteringFindManyArgs): Promise<T[]> {
    const { where, include, select, ...rest } = args;

    const mixMasterings = (await this.database.getRepository().mixMastering.findMany({
      where,
      include: include ?? mixMasteringListInclude,
      ...rest,
    })) as T[];

    return mixMasterings;
  }

  async countMixMasterings(args = {} as Prisma.MixMasteringCountArgs) {
    const count = await this.database.getRepository().mixMastering.count(args);

    return count;
  }

  async findSQLMixMasterings(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw<FindSQLMixMastering[]>(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async createMixMastering(data: Prisma.MixMasteringCreateInput) {
    const mixMastering = await this.database.getRepository().mixMastering.create({
      data,
    });

    return mixMastering;
  }

  async updateMixMastering(id: string, data: Prisma.MixMasteringUpdateInput) {
    await this.database.getRepository().mixMastering.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteMixMastering(id: string) {
    await this.database.getRepository().mixMastering.delete({
      where: {
        id,
      },
    });
  }
}
