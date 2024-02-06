import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { RequestMusician } from '@/interface/token.interface';
import { PagingDTO } from '@/utils/pagination';
import { Auth } from '@/utils/swagger';

import { ServiceService } from './service.service';

@ApiTags('서비스')
@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('sale-services')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '판매 서비스 목록 조회 API - 뮤지션만 사용 가능', description: '판매 서비스 목록 조회' })
  async findSaleServices(@Paging() paging: PagingDTO, @ReqUser() user: RequestMusician) {
    return await this.serviceService.findSaleServices(user.musician.id, paging);
  }

  @Get('pending')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '판매 서비스 목록 조회 API - 뮤지션만 사용 가능', description: '판매 서비스 목록 조회' })
  async findPendingServices(@Paging() paging: PagingDTO, @ReqUser() user: RequestMusician) {
    // return await this.serviceService.findPendingServices(user.musician.id, paging);
  }
}
