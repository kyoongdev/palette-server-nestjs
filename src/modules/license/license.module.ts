import { Module } from '@nestjs/common';

import { LicenseController } from './license.controller';
import { LicenseRepository } from './license.repository';
import { LicenseService } from './license.service';

@Module({
  providers: [LicenseService, LicenseRepository],
  controllers: [LicenseController],
})
export class LicenseModule {}
