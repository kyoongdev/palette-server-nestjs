import { Module } from '@nestjs/common';

import { MrBeatController } from './mr-beat-controller';
import { MrBeatRepository } from './mr-beat.repository';
import { MrBeatService } from './mr-beat.service';

@Module({
  providers: [MrBeatRepository, MrBeatService],
  controllers: [MrBeatController],
})
export class MrBeatModule {}
