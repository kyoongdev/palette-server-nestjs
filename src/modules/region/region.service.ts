import { Injectable } from '@nestjs/common';

import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async findRegionLargeGroups() {
    return await this.regionRepository.findRegionLargeGroups();
  }

  async findRegionLargeGroup(id: string) {
    return await this.regionRepository.findRegionLargeGroup(id);
  }

  async findRegionSmallGroupsByLargeGroup(largeGroupId: string) {
    return await this.regionRepository.findRegionSmallGroupsByLargeGroup(largeGroupId);
  }
}
