import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileService } from '@/modules/file/file.service';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';

import { MrBeatController } from './mr-beat-controller';
import { MrBeatRepository } from './mr-beat.repository';
import { MrBeatService } from './mr-beat.service';

@Module({
  providers: [
    MrBeatRepository,
    MrBeatService,
    FileService,
    LicenseRepository,
    ContactRepository,
    MoodRepository,
    GenreRepository,
  ],
  controllers: [MrBeatController],
})
export class MrBeatModule {}
