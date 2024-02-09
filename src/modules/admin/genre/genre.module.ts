import { Module } from '@nestjs/common';

import { GenreRepository } from '@/modules/genre/genre.repository';

import { AdminGenreController } from './genre.controller';
import { AdminGenreService } from './genre.service';

@Module({
  providers: [GenreRepository, AdminGenreService],
  controllers: [AdminGenreController],
})
export class AdminGenreModule {}
