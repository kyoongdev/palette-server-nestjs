import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { ReqUser } from '@/common/decorator/user.decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { RequestMusician } from '@/interface/token.interface';
import { EmptyResponseDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { MusicianServiceListDTO } from './dto';
import { ServiceService } from './service.service';

@ApiTags('서비스')
@Controller()
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('sale-services')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '판매 서비스 목록 조회 API - 뮤지션만 사용 가능', description: '판매 서비스 목록 조회' })
  @ResponseApi({
    type: MusicianServiceListDTO,
    isPaging: true,
  })
  async findSaleServices(@Paging() paging: PagingDTO, @ReqUser() user: RequestMusician) {
    return await this.serviceService.findSaleServices(user.musician.id, paging);
  }

  @Get('pending')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '판매 서비스 목록 조회 API - 뮤지션만 사용 가능', description: '판매 서비스 목록 조회' })
  @ResponseApi({
    type: MusicianServiceListDTO,
    isPaging: true,
  })
  async findPendingServices(@Paging() paging: PagingDTO, @ReqUser() user: RequestMusician) {
    return await this.serviceService.findPendingServices(user.musician.id, paging);
  }

  @Post(':serviceId/sale-stop')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '서비스 중지 API - 뮤지션만 사용 가능', description: '서비스 중지' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async stopService(@ReqUser() user: RequestMusician, @Param('serviceId') serviceId: string) {
    await this.serviceService.stopSaleService(serviceId, user.musician.id);
  }

  @Post(':serviceId/sale-start')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '서비스 시작 API - 뮤지션만 사용 가능', description: '서비스 시작' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async startService(@ReqUser() user: RequestMusician, @Param('serviceId') serviceId: string) {
    await this.serviceService.startSaleService(serviceId, user.musician.id);
  }

  @Delete(':serviceId')
  @Auth([JwtAuthGuard, RoleGuard('MUSICIAN')])
  @ApiOperation({ summary: '서비스 삭제 API - 뮤지션만 사용 가능', description: '서비스 삭제' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteService(@ReqUser() user: RequestMusician, @Param('serviceId') serviceId: string) {
    await this.serviceService.deleteService(serviceId, user.musician.id);
  }
}
