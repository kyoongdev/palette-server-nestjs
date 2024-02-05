import { Module } from '@nestjs/common';

import { AlbumArtModule } from './album-art/album-art.module';
import { ArtistModule } from './artist/artist.module';
import { MixMasteringModule } from './mix-mastering/mix-mastering.module';
import { MrBeatModule } from './mr-beat/mr-beat.module';
import { RecordingModule } from './recording/recording.module';
import { ReviewModule } from './review/review.module';

export const ServiceModules = [
  MrBeatModule,
  ArtistModule,
  RecordingModule,
  MixMasteringModule,
  AlbumArtModule,
  ReviewModule,
];
@Module({
  imports: ServiceModules,
})
export class ServiceModule {}
