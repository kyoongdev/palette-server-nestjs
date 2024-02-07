import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindArtist, FindArtistList, FindSQLArtistList } from '@/interface/artist.interface';
import { artistDetailInclude, artistListInclude } from '@/utils/constants/include/artist';

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

  async findArtistByServiceId(id: string) {
    const service = await this.database.getRepository().musicianService.findUnique({
      where: {
        id,
      },
      include: {
        artist: {
          include: artistDetailInclude,
        },
      },
    });

    if (!service || !service.artist) {
      throw new CustomException(ARTIST_ERROR_CODE.ARTIST_NOT_FOUND);
    }

    return service.artist;
  }

  async countArtists(args = {} as Prisma.ArtistCountArgs) {
    return this.database.getRepository().artist.count(args);
  }

  async findArtists<T = FindArtistList>(args = {} as Prisma.ArtistFindManyArgs): Promise<T[]> {
    const { where, select, include, ...rest } = args;
    const artists = (await this.database.getRepository().artist.findMany({
      where,
      include: include ?? artistListInclude,
      ...rest,
    })) as T[];

    return artists;
  }

  async findArtistsWithSQL<T = FindSQLArtistList>(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw<T[]>(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async createArtist(data: Prisma.ArtistCreateInput) {
    const artist = await this.database.getRepository().artist.create({
      data,
    });

    return artist;
  }

  async updateArtist(id: string, data: Prisma.ArtistUpdateInput) {
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
