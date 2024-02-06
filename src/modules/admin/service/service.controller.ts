import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { MrBeatDTO, UpdateMrBeatDTO } from '@/modules/services/mr-beat/dto';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { ApproveServiceDTO, RejectServiceDTO, ServiceCountDTO } from './dto';
import { FindServiceQuery } from './dto/query/find-service.query';
import { ServiceListDTO } from './dto/service-list.dto';
import { AdminMrBeatService } from './mr-beat/mr-beat.service';
import { AdminServiceService } from './service.service';

@ApiTags('[관리자] 서비스')
@Controller('services')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminServiceController {
  constructor(
    private readonly serviceService: AdminServiceService,
    private readonly mrBeatService: AdminMrBeatService
  ) {}

  @Get()
  @ApiOperation({ summary: '서비스 목록 조회 API', description: '서비스 목록 조회' })
  @ResponseApi({
    type: ServiceListDTO,
    isPaging: true,
  })
  async findServices(@Paging() paging: PagingDTO, @Query() query: FindServiceQuery) {
    return await this.serviceService.findServices(paging, query);
  }

  @Get('count')
  @ApiOperation({ summary: '서비스 카운트 API', description: '서비스 카운트' })
  @ResponseApi({
    type: ServiceCountDTO,
  })
  async countServices() {
    return await this.serviceService.countServices();
  }

  @Get(':serviceId/mr-beats/detail')
  @ApiOperation({ description: 'MrBeat 조회', summary: 'MrBeat 조회 API' })
  @ResponseApi({
    type: MrBeatDTO,
  })
  async findMrBeat(@Param('serviceId') serviceId: string) {
    return await this.mrBeatService.findMrBeatByServiceId(serviceId);
  }

  @Patch('/mr-beats/:mrBeatId')
  @ApiOperation({ description: 'MrBeat 수정', summary: 'MrBeat 수정 API - 뮤지션만 사용 가능' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMrBeat(@Param('mrBeatId') mrBeatId: string, @Body() body: UpdateMrBeatDTO) {
    return await this.mrBeatService.updateMrBeat(mrBeatId, body);
  }

  @Delete('/mr-beats/:mrBeatId')
  @ApiOperation({ description: 'MrBeat 삭제', summary: 'MrBeat 삭제 API - 뮤지션만 사용 가능' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMrBeat(@Param('mrBeatId') mrBeatId: string) {
    return await this.mrBeatService.deleteMrBeat(mrBeatId);
  }

  @Post(':serviceId/approve')
  @ApiOperation({ summary: '서비스 승인 API', description: '서비스 승인' })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async approveService(@Param('serviceId') serviceId: string, @Body() body: ApproveServiceDTO) {
    await this.serviceService.approveService(serviceId, body);
  }

  @Post(':serviceId/reject')
  @ApiOperation({ summary: '서비스 반려 API', description: '서비스 반려' })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async rejectService(@Param('serviceId') serviceId: string, @Body() body: RejectServiceDTO) {
    await this.serviceService.rejectService(serviceId, body);
  }
}
