import { Module } from '@nestjs/common';

import { MoodRepository } from '@/modules/mood/mood.repository';

import { AdminMoodController } from './mood.controller';
import { AdminMoodService } from './mood.service';

@Module({
  providers: [MoodRepository, AdminMoodService],
  exports: [AdminMoodController],
})
export class AdminMoodModule {}
