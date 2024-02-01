import { Module } from '@nestjs/common';

import { RegionRepository } from '@/modules/region/region.repository';

import { RecordingController } from './recording.controller';
import { RecordingRepository } from './recording.repository';
import { RecordingService } from './recording.service';

@Module({
  providers: [RecordingService, RecordingRepository, RegionRepository],
  controllers: [RecordingController],
})
export class RecordingModule {}
