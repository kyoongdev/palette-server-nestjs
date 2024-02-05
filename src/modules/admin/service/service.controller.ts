import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { EmptyResponseDTO } from '@/utils';
import { ResponseApi } from '@/utils/swagger';

import { ApproveServiceDTO, RejectServiceDTO, ServiceCountDTO } from './dto';
import { AdminServiceService } from './service.service';

@ApiTags('[관리자] 서비스')
@Controller('services')
export class AdminServiceController {
  constructor(private readonly serviceService: AdminServiceService) {}

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
