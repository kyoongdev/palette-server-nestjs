import { Module } from '@nestjs/common';

import { RecordingSQL } from '@/sql/recording';

import { ValidateServiceModule } from '../validation/validate-service.module';

import { RecordingController } from './recording.controller';
import { RecordingRepository } from './recording.repository';
import { RecordingService } from './recording.service';

@Module({
  providers: [RecordingService, RecordingRepository, RecordingSQL],
  imports: [ValidateServiceModule],
  controllers: [RecordingController],
})
export class RecordingModule {}
