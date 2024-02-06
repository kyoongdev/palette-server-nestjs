import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { FindSQLAlbumArt } from '@/interface/album-art.interface';
import { albumArtInclude, albumArtListInclude } from '@/utils/constants/include/album-art';

import { ALBUM_ART_ERROR_CODE } from './exception/error-code';

@Injectable()
export class AlbumArtRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findAlbumArt(id: string) {
    const albumArt = await this.database.getRepository().albumArt.findUnique({
      where: {
        id,
      },
      include: albumArtInclude,
    });

    if (!albumArt) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ALBUM_ART_NOT_FOUND);
    }

    return albumArt;
  }

  async findAlbumArtByServiceId(id: string) {
    const service = await this.database.getRepository().musicianService.findUnique({
      where: {
        id,
      },
      include: {
        albumArt: {
          include: albumArtInclude,
        },
      },
    });

    if (!service || !service.albumArt) {
      throw new CustomException(ALBUM_ART_ERROR_CODE.ALBUM_ART_NOT_FOUND);
    }

    return service.albumArt;
  }

  async findAlbumArts(args = {} as Prisma.AlbumArtFindManyArgs) {
    const { include, where, select, ...rest } = args;

    const albumArts = await this.database.getRepository().albumArt.findMany({
      where,
      include: albumArtListInclude,
      ...rest,
    });

    return albumArts;
  }

  async countAlbumArts(args = {} as Prisma.AlbumArtCountArgs) {
    const count = await this.database.getRepository().albumArt.count(args);

    return count;
  }

  async findAlbumArtsWithSQL(sql: Prisma.Sql) {
    const data = await this.database.getRepository().$queryRaw<FindSQLAlbumArt[]>(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.getRepository().$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    return {
      data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async createAlbumArt(data: Prisma.AlbumArtCreateInput) {
    const albumArt = await this.database.getRepository().albumArt.create({
      data,
    });

    return albumArt;
  }

  async updateAlbumArt(id: string, data: Prisma.AlbumArtUpdateInput) {
    await this.database.getRepository().albumArt.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteAlbumArt(id: string) {
    await this.database.getRepository().albumArt.delete({
      where: {
        id,
      },
    });
  }
}
