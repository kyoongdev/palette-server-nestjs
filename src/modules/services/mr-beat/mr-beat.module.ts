import { Module } from '@nestjs/common';

import { MrBeatSQL } from '@/sql';

import { ValidateServiceModule } from '../validation/validate-service.module';

import { MrBeatController } from './mr-beat-controller';
import { MrBeatRepository } from './mr-beat.repository';
import { MrBeatService } from './mr-beat.service';

@Module({
  providers: [MrBeatRepository, MrBeatService, MrBeatSQL],
  imports: [ValidateServiceModule],
  controllers: [MrBeatController],
})
export class MrBeatModule {}
