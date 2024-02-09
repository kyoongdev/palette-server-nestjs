import { Injectable } from '@nestjs/common';

import { GenreDTO } from './dto';
import { GenreRepository } from './genre.repository';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async findGenres() {
    const genres = await this.genreRepository.findGenres({
      orderBy: {
        order: 'asc',
      },
    });

    return genres.map((genre) => new GenreDTO(genre));
  }
}
