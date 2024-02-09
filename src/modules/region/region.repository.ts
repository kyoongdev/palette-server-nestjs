import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { regionLargeGroupInclude } from '@/utils/constants/include/region';

import { REGION_ERROR_CODE } from './exception/error-code';

@Injectable()
export class RegionRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findRegionLargeGroups(args = {} as Prisma.RegionLargeGroupFindManyArgs) {
    const { include, where, select, ...rest } = args;
    const regions = await this.database.getRepository().regionLargeGroup.findMany({
      ...rest,
      include: regionLargeGroupInclude,
    });

    return regions;
  }

  async countRegionLargeGroups(args = {} as Prisma.RegionLargeGroupCountArgs) {
    const count = await this.database.getRepository().regionLargeGroup.count(args);

    return count;
  }

  async findRegionLargeGroup(id: string) {
    const region = await this.database.getRepository().regionLargeGroup.findUnique({
      where: { id },
      include: regionLargeGroupInclude,
    });

    if (!region) {
      throw new CustomException(REGION_ERROR_CODE.LARGE_GROUP_NOT_FOUND);
    }

    return region;
  }

  async findRegionSmallGroup(id: string) {
    const region = await this.database.getRepository().regionSmallGroup.findUnique({
      where: { id },
    });

    if (!region) {
      throw new CustomException(REGION_ERROR_CODE.SMALL_GROUP_NOT_FOUND);
    }

    return region;
  }

  async findRegionSmallGroupsByLargeGroup(largeGroupId: string) {
    const smallRegions = await this.database.getRepository().regionSmallGroup.findMany({
      where: {
        largeGroupId,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return smallRegions;
  }

  async createRegionLargeGroup(data: Prisma.RegionLargeGroupCreateInput) {
    const region = await this.database.getRepository().regionLargeGroup.create({
      data,
    });

    return region;
  }

  async createRegionSmallGroup(data: Prisma.RegionSmallGroupCreateInput) {
    const region = await this.database.getRepository().regionSmallGroup.create({
      data,
    });

    return region;
  }

  async updateRegionLargeGroup(id: string, data: Prisma.RegionLargeGroupUpdateInput) {
    await this.database.getRepository().regionLargeGroup.update({
      where: { id },
      data,
    });
  }

  async updateRegionSmallGroup(id: string, data: Prisma.RegionSmallGroupUpdateInput) {
    await this.database.getRepository().regionSmallGroup.update({
      where: { id },
      data,
    });
  }

  async deleteRegionLargeGroup(id: string) {
    await this.database.getRepository().regionLargeGroup.delete({
      where: { id },
    });
  }

  async deleteRegionSmallGroup(id: string) {
    await this.database.getRepository().regionSmallGroup.delete({
      where: { id },
    });
  }
}
