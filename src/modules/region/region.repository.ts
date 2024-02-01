import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { REGION_ERROR_CODE } from './exception/error-code';

@Injectable()
export class RegionRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findRegionLargeGroups() {
    const regions = await this.database.getRepository().regionLargeGroup.findMany({
      include: {
        regions: {
          orderBy: {
            name: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return regions;
  }

  async findRegionLargeGroup(id: string) {
    const region = await this.database.getRepository().regionLargeGroup.findUnique({
      where: { id },
      include: {
        regions: {
          orderBy: {
            name: 'asc',
          },
        },
      },
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
}
