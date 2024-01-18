import { Module } from '@nestjs/common';

import { GenreController } from './genre.controller';
import { GenreRepository } from './genre.repository';
import { GenreService } from './genre.service';

@Module({
  providers: [GenreRepository, GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
