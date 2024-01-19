import { Module } from '@nestjs/common';

import { MusicianController } from './musician.controller';
import { MusicianRepository } from './musician.repository';
import { MusicianService } from './musician.service';

export const MusicianModules = [];

@Module({
  providers: [MusicianService, MusicianRepository],
  controllers: [MusicianController],
  imports: MusicianModules,
})
export class MusicianModule {}
