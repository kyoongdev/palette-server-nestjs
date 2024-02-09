import { Injectable } from '@nestjs/common';

import { CreateGenreDTO, UpdateGenreDTO } from '@/modules/genre/dto';
import { GenreRepository } from '@/modules/genre/genre.repository';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { AdminGenreDTO } from './dto';

@Injectable()
export class AdminGenreService {
  constructor(private readonly genreRepository: GenreRepository) {}

  async findGenre(id: string) {
    const genre = await this.genreRepository.findGenre(id);

    return new AdminGenreDTO(genre);
  }

  async findGenres(paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.genreRepository.countGenre();
    const genres = await this.genreRepository.findGenres({
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      genres.map((genre) => new AdminGenreDTO(genre)),
      { paging, count }
    );
  }

  @Transactional()
  async createGenre(data: CreateGenreDTO) {
    const genre = await this.genreRepository.createGenre(data);

    return genre.id;
  }

  @Transactional()
  async updateGenre(id: string, data: UpdateGenreDTO) {
    await this.genreRepository.updateGenre(id, data);
  }

  @Transactional()
  async deleteGenre(id: string) {
    await this.genreRepository.deleteGenre(id);
  }
}
