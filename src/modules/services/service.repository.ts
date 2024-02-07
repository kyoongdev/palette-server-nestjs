import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindServiceList } from '@/interface/service.interface';
import { serviceInclude } from '@/utils/constants/include/service';

import { SERVICE_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ServiceRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findService(serviceId: string) {
    const service = await this.database.getRepository().musicianService.findUnique({
      where: {
        id: serviceId,
      },
      include: serviceInclude,
    });

    if (!service) {
      throw new CustomException(SERVICE_ERROR_CODE.SERVICE_NOT_FOUND);
    }

    return service;
  }

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

  async updateService(id: string, data: Prisma.MusicianServiceUpdateInput) {
    await this.database.getRepository().musicianService.update({
      where: {
        id,
      },
      data,
    });
  }

  async checkServiceClicked(args = {} as Prisma.MusicianServiceClickedFindFirstArgs) {
    return await this.database.getRepository().musicianServiceClicked.findFirst(args);
  }
}
