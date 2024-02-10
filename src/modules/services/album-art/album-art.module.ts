import { Module } from '@nestjs/common';

import { AlbumArtSQL } from '@/sql/album-art/album-art.sql';

import { ValidateServiceModule } from '../validation/validate-service.module';

import { AlbumArtController } from './album-art.controller';
import { AlbumArtRepository } from './album-art.repository';
import { AlbumArtService } from './album-art.service';

@Module({
  providers: [AlbumArtRepository, AlbumArtService, AlbumArtSQL],
  imports: [ValidateServiceModule],
  controllers: [AlbumArtController],
})
export class AlbumArtModule {}
