import { Module } from '@nestjs/common';

import { MixMasteringSQL } from '@/sql/mix-mastering';

import { ValidateServiceModule } from '../validation/validate-service.module';

import { MixMasteringController } from './mix-mastering.controller';
import { MixMasteringRepository } from './mix-mastering.repository';
import { MixMasteringService } from './mix-mastering.service';

@Module({
  providers: [MixMasteringService, MixMasteringRepository, MixMasteringSQL],
  imports: [ValidateServiceModule],
  controllers: [MixMasteringController],
})
export class MixMasteringModule {}
