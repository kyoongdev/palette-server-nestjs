import { Module } from '@nestjs/common';

import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
