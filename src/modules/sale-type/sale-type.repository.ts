import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';

import { SALE_TYPE_ERROR_CODE } from './exception/error-code';

@Injectable()
export class SaleTypeRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findArtistSaleType(id: string) {
    const saleType = await this.database.getRepository().artistSaleType.findUnique({
      where: {
        id,
      },
    });

    if (!saleType) {
      throw new CustomException(SALE_TYPE_ERROR_CODE.SALE_TYPE_NOT_FOUND);
    }

    return saleType;
  }

  async findAlbumArtSaleType(id: string) {
    const saleType = await this.database.getRepository().albumArtSaleType.findUnique({
      where: {
        id,
      },
    });

    if (!saleType) {
      throw new CustomException(SALE_TYPE_ERROR_CODE.SALE_TYPE_NOT_FOUND);
    }

    return saleType;
  }

  async findArtistSaleTypes(args = {} as Prisma.ArtistSaleTypeFindManyArgs) {
    return await this.database.getRepository().artistSaleType.findMany(args);
  }

  async countArtistSaleTypes(args = {} as Prisma.ArtistSaleTypeCountArgs) {
    return await this.database.getRepository().artistSaleType.count(args);
  }

  async findAlbumArtSaleTypes(args = {} as Prisma.AlbumArtSaleTypeFindManyArgs) {
    return await this.database.getRepository().albumArtSaleType.findMany(args);
  }

  async countAlbumArtSaleTypes(args = {} as Prisma.AlbumArtSaleTypeCountArgs) {
    return await this.database.getRepository().albumArtSaleType.count(args);
  }

  async createArtistSaleType(data: Prisma.ArtistSaleTypeCreateInput) {
    return await this.database.getRepository().artistSaleType.create({
      data,
    });
  }

  async createAlbumArtSaleType(data: Prisma.AlbumArtSaleTypeCreateInput) {
    return await this.database.getRepository().albumArtSaleType.create({
      data,
    });
  }

  async updateArtistSaleType(id: string, data: Prisma.ArtistSaleTypeUpdateInput) {
    await this.database.getRepository().artistSaleType.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateAlbumArtSaleType(id: string, data: Prisma.AlbumArtSaleTypeUpdateInput) {
    await this.database.getRepository().albumArtSaleType.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteArtistSaleType(id: string) {
    await this.database.getRepository().artistSaleType.delete({
      where: {
        id,
      },
    });
  }

  async deleteAlbumArtSaleType(id: string) {
    await this.database.getRepository().albumArtSaleType.delete({
      where: {
        id,
      },
    });
  }
}
