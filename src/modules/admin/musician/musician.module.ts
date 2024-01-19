import { Module } from '@nestjs/common';

import { MusicianRepository } from '@/modules/musician/musician.repository';

import { AdminMusicianController } from './musician.controller';
import { AdminMusicianService } from './musician.service';

@Module({
  providers: [AdminMusicianService, MusicianRepository],
  controllers: [AdminMusicianController],
})
export class AdminMusicianModule {}
