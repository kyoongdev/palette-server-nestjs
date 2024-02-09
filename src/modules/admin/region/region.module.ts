import { Module } from '@nestjs/common';

import { RegionRepository } from '@/modules/region/region.repository';

import { AdminRegionController } from './region.controller';
import { AdminRegionService } from './region.service';

@Module({
  providers: [RegionRepository, AdminRegionService],
  controllers: [AdminRegionController],
})
export class AdminRegionModule {}
