import { Injectable } from '@nestjs/common';

import {
  CreateRegionLargeGroupDTO,
  CreateRegionSmallGroupDTO,
  RegionLargeGroupDTO,
  RegionSmallGroupDTO,
  UpdateRegionLargeGroupDTO,
} from '@/modules/region/dto';
import { RegionRepository } from '@/modules/region/region.repository';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminRegionLargeGroupDTO } from './dto';

@Injectable()
export class AdminRegionService {
  constructor(private readonly regionRepository: RegionRepository) {}

  async findRegionLargeGroup(id: string) {
    const region = await this.regionRepository.findRegionLargeGroup(id);

    return new AdminRegionLargeGroupDTO(region);
  }

  async findRegionLargeGroups(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.regionRepository.countRegionLargeGroups();
    const regions = await this.regionRepository.findRegionLargeGroups({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      regions.map((region) => new AdminRegionLargeGroupDTO(region)),
      { paging, count }
    );
  }

  async findRegionSmallGroupsByLargeGroup(largeGroupId: string) {
    const regions = await this.regionRepository.findRegionSmallGroupsByLargeGroup(largeGroupId);

    return regions.map((region) => new RegionSmallGroupDTO(region));
  }

  async createRegionLargeGroup(data: CreateRegionLargeGroupDTO) {
    const region = await this.regionRepository.createRegionLargeGroup(data.toCreateArgs());

    return region.id;
  }

  async updateRegionLargeGroup(id: string, data: UpdateRegionLargeGroupDTO) {
    await this.regionRepository.findRegionLargeGroup(id);
    await this.regionRepository.updateRegionLargeGroup(id, data.toUpdateArgs());
  }

  async deleteRegionLargeGroup(id: string) {
    await this.regionRepository.findRegionLargeGroup(id);
    await this.regionRepository.deleteRegionLargeGroup(id);
  }

  async createRegionSmallGroup(largeGroupId: string, data: CreateRegionSmallGroupDTO) {
    const region = await this.regionRepository.createRegionSmallGroup({
      largeGroup: {
        connect: { id: largeGroupId },
      },
      name: data.name,
    });

    return region.id;
  }

  async updateRegionSmallGroup(id: string, data: CreateRegionSmallGroupDTO) {
    await this.regionRepository.findRegionSmallGroup(id);
    await this.regionRepository.updateRegionSmallGroup(id, {
      name: data.name,
    });
  }

  async deleteRegionSmallGroup(id: string) {
    await this.regionRepository.findRegionSmallGroup(id);
    await this.regionRepository.deleteRegionSmallGroup(id);
  }
}
