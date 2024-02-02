import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class MixMasteringRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findMixMastering(id: string) {}

  async findMixMasterings(args = {} as Prisma.MixMasteringFindManyArgs) {
    const { where, include, select, ...rest } = args;
  }

  async countMixMasterings(args = {} as Prisma.MixMasteringCountArgs) {}

  async findSQLMixMasterings(sql: Prisma.Sql) {}

  async createMixMastering(data: Prisma.MixMasteringCreateInput) {}

  async updateMixMastering(id: string, data: Prisma.MixMasteringUpdateInput) {}

  async deleteMixMastering(id: string) {}
}
