import { Module } from '@nestjs/common';

import { ValidateServiceModule } from '../validation/validate-service.module';

import { RecordingController } from './recording.controller';
import { RecordingRepository } from './recording.repository';
import { RecordingService } from './recording.service';

@Module({
  providers: [RecordingService, RecordingRepository],
  imports: [ValidateServiceModule],
  controllers: [RecordingController],
})
export class RecordingModule {}
