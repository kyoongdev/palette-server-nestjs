import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { Paging } from '@/common/decorator';
import { JwtAuthGuard } from '@/common/guards/jwt.guard';
import { RoleGuard } from '@/common/guards/role.guard';
import { ResponseWithIdInterceptor } from '@/common/interceptor/response-with-id.interceptor';
import { CreateLicenseDTO } from '@/modules/license/dto/create-license.dto';
import { UpdateLicenseDTO } from '@/modules/license/dto/update-license.dto';
import { EmptyResponseDTO, ResponseWithIdDTO } from '@/utils';
import { PagingDTO } from '@/utils/pagination';
import { Auth, ResponseApi } from '@/utils/swagger';

import { AdminLicenseDTO } from './dto';
import { AdminLicenseService } from './license.service';

@ApiTags('[관리자] 라이센스')
@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@Controller('licenses')
export class AdminLicenseController {
  constructor(private readonly licenseService: AdminLicenseService) {}

  @Get(':licenseId/detail')
  @ApiOperation({ summary: '라이센스 조회 상세 조회 API', description: '라이센스 상세 조회 API' })
  @ResponseApi({
    type: AdminLicenseDTO,
  })
  async findLicense(@Param('licenseId') licenseId: string) {
    return await this.licenseService.findLicense(licenseId);
  }

  @Get()
  @ApiQuery({ type: PagingDTO })
  @ApiOperation({ summary: '라이센스 목록 조회 API', description: '라이센스 목록 조회 API' })
  @ResponseApi({
    type: AdminLicenseDTO,
    isPaging: true,
  })
  async findLicenses(@Paging() paging: PagingDTO) {
    return await this.licenseService.findLicenses(paging);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @ApiOperation({ summary: '라이센스 생성 API', description: '라이센스 생성 API' })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createLicense(@Body() body: CreateLicenseDTO) {
    return await this.licenseService.createLicense(body);
  }

  @Patch(':licenseId')
  @ApiOperation({ summary: '라이센스 수정 API', description: '라이센스 수정 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateLicense(@Param('licenseId') licenseId: string, @Body() body: UpdateLicenseDTO) {
    return await this.licenseService.updateLicense(licenseId, body);
  }

  @Delete(':licenseId')
  @ApiOperation({ summary: '라이센스 삭제 API', description: '라이센스 삭제 API' })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteLicense(@Param('licenseId') licenseId: string) {
    return await this.licenseService.deleteLicense(licenseId);
  }
}
