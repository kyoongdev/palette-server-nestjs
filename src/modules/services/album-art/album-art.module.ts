import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';

import { AlbumArtController } from './album-art.controller';
import { AlbumArtRepository } from './album-art.repository';
import { AlbumArtService } from './album-art.service';

@Module({
  providers: [
    AlbumArtRepository,
    AlbumArtService,
    FileRepository,
    SaleTypeRepository,
    ContactRepository,
    LicenseRepository,
  ],
  controllers: [AlbumArtController],
})
export class AlbumArtModule {}
