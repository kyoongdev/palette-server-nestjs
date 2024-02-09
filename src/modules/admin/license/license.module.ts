import { Module } from '@nestjs/common';

import { LicenseRepository } from '@/modules/license/license.repository';

import { AdminLicenseController } from './license.controller';
import { AdminLicenseService } from './license.service';

@Module({
  providers: [LicenseRepository, AdminLicenseService],
  controllers: [AdminLicenseController],
})
export class AdminLicenseModule {}
