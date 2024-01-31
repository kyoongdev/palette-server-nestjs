import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';

import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
  providers: [
    ArtistRepository,
    ArtistService,
    FileRepository,
    ContactRepository,
    LicenseRepository,
    SaleTypeRepository,
  ],
  controllers: [ArtistController],
})
export class ArtistModule {}
