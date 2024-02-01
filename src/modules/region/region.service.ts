import { Injectable } from '@nestjs/common';

import { RegionLargeGroupDTO, RegionSmallGroupDTO } from './dto';
import { RegionRepository } from './region.repository';

@Injectable()
export class RegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async findRegionLargeGroups() {
    const regions = await this.regionRepository.findRegionLargeGroups();
    return regions.map((region) => new RegionLargeGroupDTO(region));
  }

  async findRegionLargeGroup(id: string) {
    const region = await this.regionRepository.findRegionLargeGroup(id);
    return new RegionLargeGroupDTO(region);
  }

  async findRegionSmallGroupsByLargeGroup(largeGroupId: string) {
    const regions = await this.regionRepository.findRegionSmallGroupsByLargeGroup(largeGroupId);

    return regions.map((region) => new RegionSmallGroupDTO(region));
  }
}
