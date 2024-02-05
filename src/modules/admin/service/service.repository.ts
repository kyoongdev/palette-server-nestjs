import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';
import { adminServiceInclude } from '@/utils/constants/include/service';

@Injectable()
export class AdminServiceRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async countService(args = {} as Prisma.MusicianServiceCountArgs) {
    return await this.database.getRepository().musicianService.count(args);
  }

  async findServices(args = {} as Prisma.MusicianServiceFindManyArgs) {
    const { where, include, select, ...rest } = args;
    const services = await this.database.getRepository().musicianService.findMany({
      where,
      include: adminServiceInclude,
      ...rest,
    });

    return services;
  }
}
