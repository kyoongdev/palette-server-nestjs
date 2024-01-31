import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { CreateGenreDTO, GenreDTO } from './dto';
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

  async findGenres() {
    const genres = await this.database.getRepository().genre.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return genres.map((genre) => new GenreDTO(genre));
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

  async updateGenre(id: string, data: CreateGenreDTO) {
    const isExist = await this.findGenre(id);

    if (data.order) {
      await this.database.getRepository().genre.updateMany({
        where: {
          ...(isExist.order > data.order
            ? {
                AND: [
                  {
                    order: {
                      lt: isExist.order,
                    },
                  },
                  {
                    order: {
                      gte: data.order,
                    },
                  },
                ],
              }
            : {
                AND: [
                  {
                    order: {
                      lte: data.order,
                    },
                  },
                  {
                    order: {
                      gt: isExist.order,
                    },
                  },
                ],
              }),
        },
        data: {
          order: {
            ...(isExist.order > data.order
              ? {
                  increment: 1,
                }
              : {
                  decrement: 1,
                }),
          },
        },
      });
    }

    await this.database.getRepository().genre.updateMany({
      where: {
        id,
      },
      data: {
        ...data,
        order: data.order ?? 0,
      },
    });
  }

  async deleteGenre(id: string) {
    const isExist = await this.findGenre(id);

    await this.database.getRepository().genre.updateMany({
      where: {
        order: {
          gt: isExist.order,
        },
      },
      data: {
        order: {
          decrement: 1,
        },
      },
    });

    await this.database.getRepository().genre.delete({
      where: {
        id,
      },
    });
  }
}
