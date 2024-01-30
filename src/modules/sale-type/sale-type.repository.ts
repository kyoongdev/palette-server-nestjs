import { Injectable } from '@nestjs/common';

import { PrismaDatabase } from '@/database/prisma.repository';

@Injectable()
export class SaleTypeRepository {
  constructor(private readonly database: PrismaDatabase) {}

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
