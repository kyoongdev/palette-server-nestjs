import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { RegionLargeGroupDTO, RegionSmallGroupDTO } from './dto';
import { RegionService } from './region.service';

@ApiTags('지역')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Get('/large-groups')
  @ApiOperation({ description: '지역 대분류 조회', summary: '지역 대분류 조회 API' })
  @ResponseApi({
    type: RegionLargeGroupDTO,
    isArray: true,
  })
  async findRegionLargeGroups() {
    return await this.regionService.findRegionLargeGroups();
  }

  @Get('/large-groups/:largeGroupId')
  @ApiOperation({ description: '지역 대분류 상세 조회', summary: '지역 대분류 상세 조회 API' })
  @ResponseApi({
    type: RegionLargeGroupDTO,
  })
  async findRegionLargeGroup(@Param('largeGroupId') largeGroupId: string) {
    return await this.regionService.findRegionLargeGroup(largeGroupId);
  }

  @Get('/large-groups/:largeGroupId/small-groups')
  @ApiOperation({ description: '대지역을 통한 소분류 조회', summary: '대지역을 통한 소분류 조회 API' })
  @ResponseApi({
    type: RegionSmallGroupDTO,
    isArray: true,
  })
  async findRegionSmallGroupsByLargeGroup(@Param('largeGroupId') largeGroupId: string) {
    return await this.regionService.findRegionSmallGroupsByLargeGroup(largeGroupId);
  }
}
