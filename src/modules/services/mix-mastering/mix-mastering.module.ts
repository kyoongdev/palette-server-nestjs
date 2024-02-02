import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';

import { MixMasteringController } from './mix-mastering.controller';
import { MixMasteringRepository } from './mix-mastering.repository';
import { MixMasteringService } from './mix-mastering.service';

@Module({
  providers: [
    MixMasteringService,
    MixMasteringRepository,
    FileRepository,
    GenreRepository,
    ContactRepository,
    LicenseRepository,
  ],
  controllers: [MixMasteringController],
})
export class MixMasteringModule {}
