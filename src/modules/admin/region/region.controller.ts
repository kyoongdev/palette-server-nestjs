import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { Role } from '@/interface/token.interface';
import {
  CreateRegionLargeGroupDTO,
  CreateRegionSmallGroupDTO,
  RegionSmallGroupDTO,
  UpdateRegionLargeGroupDTO,
} from '@/modules/region/dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminRegionLargeGroupDTO } from './dto';
import { AdminRegionService } from './region.service';

@ApiTags('[관리자] 지역')
@Auth([JwtAuthGuard, RoleGuard(Role.ADMIN)])
@Controller('regions')
export class AdminRegionController {
  constructor(private readonly regionService: AdminRegionService) {}

  @Get('/large-groups/:regionLargeGroupId/detail')
  @ApiOperation({ summary: '지역 대그룹 조회 API', description: '지역 대그룹 조회 API' })
  @ResponseApi({
    type: AdminRegionLargeGroupDTO,
  })
  async findRegionLargeGroup(@Param('regionLargeGroupId') regionLargeGroupId: string) {
    return await this.regionService.findRegionLargeGroup(regionLargeGroupId);
  }

  @Get('/large-groups')
  @ApiQuery({
    type: PagingDTO,
  })
  @ApiOperation({ summary: '지역 대그룹 목록 조회 API', description: '지역 대그룹 목록 조회 API' })
  @ResponseApi({
    type: AdminRegionLargeGroupDTO,
    isPaging: true,
  })
  async findRegionLargeGroups(@Paging() paging: PagingDTO) {
    return await this.regionService.findRegionLargeGroups(paging);
  }

  @Get('/large-groups/:regionLargeGroupId/small-groups')
  @ApiOperation({ summary: '지역 소그룹 목록 조회 API', description: '지역 소그룹 목록 조회 API' })
  @ResponseApi({
    type: RegionSmallGroupDTO,
    isArray: true,
  })
  async findRegionSmallGroupsByLargeGroup(@Param('regionLargeGroupId') regionLargeGroupId: string) {
    return await this.regionService.findRegionSmallGroupsByLargeGroup(regionLargeGroupId);
  }

  @Post('/large-groups')
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '지역 대그룹 생성 API', description: '지역 대그룹 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createRegionLargeGroup(@Body() body: CreateRegionLargeGroupDTO) {
    return await this.regionService.createRegionLargeGroup(body);
  }

  @Post('/large-groups/:regionLargeGroupId/small-groups')
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '지역 소그룹 생성 API', description: '지역 소그룹 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createRegionSmallGroup(
    @Param('regionLargeGroupId') regionLargeGroupId: string,
    @Body() body: RegionSmallGroupDTO
  ) {
    return await this.regionService.createRegionSmallGroup(regionLargeGroupId, body);
  }

  @Patch('/large-groups/:regionLargeGroupId')
  @ApiOperation({ summary: '지역 대그룹 수정 API', description: '지역 대그룹 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRegionLargeGroup(
    @Param('regionLargeGroupId') regionLargeGroupId: string,
    @Body() body: UpdateRegionLargeGroupDTO
  ) {
    await this.regionService.updateRegionLargeGroup(regionLargeGroupId, body);
  }

  @Patch('/small-groups/:regionSmallGroupId')
  @ApiOperation({ summary: '지역 소그룹 수정 API', description: '지역 소그룹 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateRegionSmallGroup(
    @Param('regionSmallGroupId') regionSmallGroupId: string,
    @Body() body: CreateRegionSmallGroupDTO
  ) {
    await this.regionService.updateRegionSmallGroup(regionSmallGroupId, body);
  }

  @Delete('/large-groups/:regionLargeGroupId')
  @ApiOperation({ summary: '지역 대그룹 삭제 API', description: '지역 대그룹 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteRegionLargeGroup(@Param('regionLargeGroupId') regionLargeGroupId: string) {
    await this.regionService.deleteRegionLargeGroup(regionLargeGroupId);
  }

  @Delete('/small-groups/:regionSmallGroupId')
  @ApiOperation({ summary: '지역 소그룹 삭제 API', description: '지역 소그룹 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteRegionSmallGroup(@Param('regionSmallGroupId') regionSmallGroupId: string) {
    await this.regionService.deleteRegionSmallGroup(regionSmallGroupId);
  }
}
