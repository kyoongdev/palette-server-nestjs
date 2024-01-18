import { Module } from '@nestjs/common';

import { MoodController } from './mood.controller';
import { MoodRepository } from './mood.repository';
import { MoodService } from './mood.service';

@Module({
  providers: [MoodService, MoodRepository],
  controllers: [MoodController],
})
export class MoodModule {}
