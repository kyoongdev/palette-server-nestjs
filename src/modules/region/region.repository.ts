import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

import { RegionLargeGroupDTO, RegionSmallGroupDTO } from './dto';

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

    return regions.map((region) => new RegionLargeGroupDTO(region));
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

    return new RegionLargeGroupDTO(region);
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

    return smallRegions.map((smallRegion) => new RegionSmallGroupDTO(smallRegion));
  }
}
