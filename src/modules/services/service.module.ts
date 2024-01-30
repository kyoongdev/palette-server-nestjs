import { Module } from '@nestjs/common';

import { ArtistModule } from './artist/artist.module';
import { MrBeatModule } from './mr-beat/mr-beat.module';

export const ServiceModules = [MrBeatModule, ArtistModule];
@Module({
  imports: [MrBeatModule, ArtistModule],
})
export class ServiceModule {}
