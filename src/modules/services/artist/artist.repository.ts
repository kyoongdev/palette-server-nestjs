import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindArtist } from '@/interface/artist.interface';
import { artistDetailInclude } from '@/utils/constants/include/artist';

import { ARTIST_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ArtistRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findArtist(id: string) {
    const artist: FindArtist | undefined = await this.database.getRepository().artist.findUnique({
      where: {
        id,
      },
      include: artistDetailInclude,
    });

    if (!artist) {
      throw new CustomException(ARTIST_ERROR_CODE.ARTIST_NOT_FOUND);
    }

    return artist;
  }

  async countArtists(args = {} as Prisma.ArtistCountArgs) {
    return this.database.getRepository().artist.count(args);
  }

  async findArtists(args = {} as Prisma.ArtistFindManyArgs) {
    const { where, select, include, ...rest } = args;
    return this.database.getRepository().artist.findMany({
      where,
      include,
      ...rest,
    });
  }

  async findArtistsWithSQL(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async createArtist(data: Prisma.ArtistCreateArgs['data']) {
    const artist = await this.database.getRepository().artist.create({
      data,
    });

    return artist;
  }

  async updateArtist(id: string, data: Prisma.ArtistUpdateArgs['data']) {
    await this.database.getRepository().artist.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteArtist(id: string) {
    await this.database.getRepository().artist.delete({
      where: {
        id,
      },
    });
  }
}
