import { Module } from '@nestjs/common';

import { ContactRepository } from '@/modules/contact/contact.repository';
import { FileRepository } from '@/modules/file/file.repository';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { LicenseRepository } from '@/modules/license/license.repository';
import { MoodRepository } from '@/modules/mood/mood.repository';
import { RegionRepository } from '@/modules/region/region.repository';
import { SaleTypeRepository } from '@/modules/sale-type/sale-type.repository';
import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';

import { AdminArtistService } from './artist/artist.service';
import { AdminMrBeatService } from './mr-beat/mr-beat.service';
import { AdminServiceController } from './service.controller';
import { AdminServiceRepository } from './service.repository';
import { AdminServiceService } from './service.service';

@Module({
  providers: [
    AdminServiceService,
    AdminMrBeatService,
    AdminArtistService,
    AdminServiceRepository,
    ArtistRepository,
    MrBeatRepository,
    RecordingRepository,
    AlbumArtRepository,
    MixMasteringRepository,
    SaleTypeRepository,
    FileRepository,
    LicenseRepository,
    ContactRepository,
    MoodRepository,
    GenreRepository,
    RegionRepository,
  ],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
