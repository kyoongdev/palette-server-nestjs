import { Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AdminServiceService } from './service.service';

@ApiTags('[관리자] 서비스')
@Controller('services')
export class AdminServiceController {
  constructor(private readonly serviceService: AdminServiceService) {}

  @Post(':serviceId/approve')
  @ApiOperation({ summary: '서비스 승인 API', description: '서비스 승인' })
  async approveService(@Param('serviceId') serviceId: string) {
    await this.serviceService.approveService();
  }

  @Post(':serviceId/reject')
  @ApiOperation({ summary: '서비스 반려 API', description: '서비스 반려' })
  async rejectService(@Param('serviceId') serviceId: string) {
    await this.serviceService.rejectService();
  }
}
