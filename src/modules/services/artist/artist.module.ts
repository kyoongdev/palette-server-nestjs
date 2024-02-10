import { Module } from '@nestjs/common';

import { ArtistSQL } from '@/sql/artist';

import { ValidateServiceModule } from '../validation/validate-service.module';

import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
  providers: [ArtistRepository, ArtistService, ArtistSQL],
  imports: [ValidateServiceModule],
  controllers: [ArtistController],
})
export class ArtistModule {}
