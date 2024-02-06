import { Module } from '@nestjs/common';

import { AlbumArtModule } from './album-art/album-art.module';
import { ArtistModule } from './artist/artist.module';
import { MixMasteringModule } from './mix-mastering/mix-mastering.module';
import { MrBeatModule } from './mr-beat/mr-beat.module';
import { RecordingModule } from './recording/recording.module';
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
  providers: [ServiceService, ServiceRepository],
  imports: ServiceModules,
  controllers: [ServiceController],
})
export class ServiceModule {}
