import { Injectable } from '@nestjs/common';

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

  async findArtistSaleTypes() {
    return await this.database.getRepository().artistSaleType.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }

  async findAlbumArtSaleTypes() {
    return await this.database.getRepository().albumArtSaleType.findMany({
      orderBy: {
        order: 'asc',
      },
    });
  }
}
