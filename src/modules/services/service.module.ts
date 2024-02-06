import { Module } from '@nestjs/common';

import { AlbumArtModule } from './album-art/album-art.module';
import { AlbumArtRepository } from './album-art/album-art.repository';
import { ArtistModule } from './artist/artist.module';
import { ArtistRepository } from './artist/artist.repository';
import { MixMasteringModule } from './mix-mastering/mix-mastering.module';
import { MixMasteringRepository } from './mix-mastering/mix-mastering.repository';
import { MrBeatModule } from './mr-beat/mr-beat.module';
import { MrBeatRepository } from './mr-beat/mr-beat.repository';
import { RecordingModule } from './recording/recording.module';
import { RecordingRepository } from './recording/recording.repository';
import { ReviewModule } from './review/review.module';
import { ServiceRepository } from './service.repository';
import { ServiceService } from './service.service';
import { ServiceController } from './servie.controller';

export const ServiceModules = [
  MrBeatModule,
  ArtistModule,
  RecordingModule,
  MixMasteringModule,
  AlbumArtModule,
  ReviewModule,
];
@Module({
  providers: [
    ServiceService,
    ServiceRepository,
    ArtistRepository,
    AlbumArtRepository,
    MixMasteringRepository,
    RecordingRepository,
    MrBeatRepository,
  ],
  imports: ServiceModules,
  controllers: [ServiceController],
})
export class ServiceModule {}
