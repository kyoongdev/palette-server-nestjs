import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';
import { FindServiceList } from '@/interface/service.interface';
import { serviceInclude } from '@/utils/constants/include/service';

@Injectable()
export class ServiceRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async countService(args = {} as Prisma.MusicianServiceCountArgs) {
    return await this.database.getRepository().musicianService.count(args);
  }

  async findServices<T = FindServiceList>(args = {} as Prisma.MusicianServiceFindManyArgs): Promise<T[]> {
    const { where, include, select, ...rest } = args;
    const services = (await this.database.getRepository().musicianService.findMany({
      where,
      include: include ?? serviceInclude,
      ...rest,
    })) as T[];

    return services;
  }
}
