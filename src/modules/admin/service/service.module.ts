import { Module } from '@nestjs/common';

import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';
import { ValidateServiceModule } from '@/modules/services/validation/validate-service.module';

import { AdminAlbumArtService } from './album-art/album-art.service';
import { AdminArtistService } from './artist/artist.service';
import { AdminMixMasteringService } from './mix-mastering/mix-mastering.service';
import { AdminMrBeatService } from './mr-beat/mr-beat.service';
import { AdminRecordingService } from './recording/recording.service';
import { AdminServiceController } from './service.controller';
import { AdminServiceRepository } from './service.repository';
import { AdminServiceService } from './service.service';

@Module({
  providers: [
    AdminServiceService,
    AdminMrBeatService,
    AdminArtistService,
    AdminAlbumArtService,
    AdminRecordingService,
    AdminMixMasteringService,
    AdminServiceRepository,
    ArtistRepository,
    MrBeatRepository,
    RecordingRepository,
    AlbumArtRepository,
    MixMasteringRepository,
  ],
  imports: [ValidateServiceModule],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
