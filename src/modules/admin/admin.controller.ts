import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminService } from './admin.service';
import { AdminDTO } from './dto';

@ApiTags('[관리자]')
@Controller()
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ description: '관리자 목록 조회', summary: '관리자 목록 조회 API' })
  @ApiQuery({
    type: PagingDTO,
  })
  @ResponseApi({
    type: AdminDTO,
    isPaging: true,
  })
  async findAdmins(@Paging() paging: PagingDTO) {
    return await this.adminService.findCommonAdmins(paging);
  }
}
