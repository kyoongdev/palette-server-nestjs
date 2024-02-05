import { Module } from '@nestjs/common';

import { AlbumArtRepository } from '@/modules/services/album-art/album-art.repository';
import { ArtistRepository } from '@/modules/services/artist/artist.repository';
import { MixMasteringRepository } from '@/modules/services/mix-mastering/mix-mastering.repository';
import { MrBeatRepository } from '@/modules/services/mr-beat/mr-beat.repository';
import { RecordingRepository } from '@/modules/services/recording/recording.repository';

import { AdminServiceController } from './service.controller';
import { AdminServiceRepository } from './service.repository';
import { AdminServiceService } from './service.service';

@Module({
  providers: [
    AdminServiceService,
    ArtistRepository,
    MrBeatRepository,
    RecordingRepository,
    AlbumArtRepository,
    MixMasteringRepository,
    AdminServiceRepository,
  ],
  controllers: [AdminServiceController],
})
export class AdminServiceModule {}
