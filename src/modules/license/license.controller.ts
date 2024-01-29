import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { ResponseApi } from '@/utils/swagger';

import { LicenseDTO } from './dto';
import { LicenseService } from './license.service';

@ApiTags('라이센스')
@Controller('licenses')
export class LicenseController {
  constructor(private readonly licenseService: LicenseService) {}

  @Get()
  @ApiOperation({ summary: '라이센스 목록 조회 API', description: '라이센스 목록을 조회합니다.' })
  @ResponseApi({
    type: LicenseDTO,
    isArray: true,
  })
  async findLicenses() {
    return await this.licenseService.findLicenses();
  }
}
