import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

import { GenreDTO } from './dto';

@Injectable()
export class GenreRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findGenres() {
    const genres = await this.database.getRepository().genre.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    return genres.map((genre) => new GenreDTO(genre));
  }
}
