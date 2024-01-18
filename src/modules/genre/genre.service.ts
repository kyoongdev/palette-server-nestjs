import { Injectable } from '@nestjs/common';

import { GenreRepository } from './genre.repository';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async findGenres() {
    return await this.genreRepository.findGenres();
  }
}
