import { Module } from '@nestjs/common';

import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { RegionRepository } from '@/modules/region/region.repository';

import { RecordingController } from './recording.controller';
import { RecordingRepository } from './recording.repository';
import { RecordingService } from './recording.service';

@Module({
  providers: [RecordingService, RecordingRepository, RegionRepository, LicenseRepository, FileRepository],
  controllers: [RecordingController],
})
export class RecordingModule {}
