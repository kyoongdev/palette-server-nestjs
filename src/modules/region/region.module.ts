import { Module } from '@nestjs/common';

import { RegionController } from './region.controller';
import { RegionRepository } from './region.repository';
import { RegionService } from './region.service';

@Module({
  providers: [RegionService, RegionRepository],
  controllers: [RegionController],
})
export class RegionModule {}
