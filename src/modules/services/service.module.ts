import { Module } from '@nestjs/common';

import { ArtistModule } from './artist/artist.module';
import { MrBeatModule } from './mr-beat/mr-beat.module';
import { RecordingModule } from './recording/recording.module';

export const ServiceModules = [MrBeatModule, ArtistModule, RecordingModule];
@Module({
  imports: [MrBeatModule, ArtistModule, RecordingModule],
})
export class ServiceModule {}
