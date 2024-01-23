import { Module } from '@nestjs/common';

import { MrBeatModule } from './mr-beat/mr-beat.module';

export const ServiceModules = [MrBeatModule];
@Module({
  imports: [MrBeatModule],
})
export class ServiceModule {}
