import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { ApproveServiceDTO, RejectServiceDTO, ServiceCountDTO } from './dto';
import { FindServiceQuery } from './dto/query/find-service.query';
import { ServiceListDTO } from './dto/service-list.dto';
import { AdminServiceService } from './service.service';

@ApiTags('[관리자] 서비스')
@Controller('services')
// @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminServiceController {
  constructor(private readonly serviceService: AdminServiceService) {}

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
