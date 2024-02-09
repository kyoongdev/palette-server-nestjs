import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { CreateGenreDTO, GenreDTO, UpdateGenreDTO } from './dto';
import { GENRE_ERROR_CODE } from './exception/error-code';

@Injectable()
export class GenreRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findGenre(id: string) {
    const genre = await this.database.getRepository().genre.findUnique({
      where: {
        id,
      },
    });

    if (!genre) {
      throw new CustomException(GENRE_ERROR_CODE.GENRE_NOT_FOUND);
    }

    return genre;
  }

  async findGenres(args = {} as Prisma.GenreFindManyArgs) {
    const genres = await this.database.getRepository().genre.findMany(args);

    return genres;
  }

  async countGenre(args = {} as Prisma.GenreCountArgs) {
    const count = await this.database.getRepository().genre.count(args);

    return count;
  }
  async createGenre(data: CreateGenreDTO) {
    const genre = await this.database.getRepository().genre.create({
      data: {
        ...data,
        order: data.order ?? 0,
      },
    });

    return genre;
  }

  async updateGenre(id: string, data: UpdateGenreDTO) {
    await this.database.getRepository().genre.updateMany({
      where: {
        id,
      },
      data,
    });
  }

  async deleteGenre(id: string) {
    await this.database.getRepository().genre.delete({
      where: {
        id,
      },
    });
  }
}
