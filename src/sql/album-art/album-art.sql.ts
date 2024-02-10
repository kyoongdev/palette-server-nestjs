import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { FindAlbumArtQuery } from '@/modules/services/album-art/dto/query/find-album-art.query';

import { BaseAlbumArtSQL, BaseAlbumArtSQLProps } from './base-album-art.sql';

interface AlbumArtSQLProps extends BaseAlbumArtSQLProps {
  query: FindAlbumArtQuery;
  isAdmin: boolean;
}

@Injectable()
export class AlbumArtSQL extends BaseAlbumArtSQL {
  query: FindAlbumArtQuery;

  getSqlQuery({ isAdmin = false, paging, query }: AlbumArtSQLProps) {
    this.query = query;
    this.paging = paging;

    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM AlbumArt albumArt
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    ${Prisma.sql`GROUP BY albumArt.id, serviceReview.id, image.id`}
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`albumArt.isAuthorized = 1 AND albumArt.isPending = 0 AND albumArt.isSaleStopped = 0`;

    const saleTypeWhere = this.query?.saleTypeId
      ? Prisma.sql`AND albumArtSaleTypeBridge.saleTypeId = ${this.query.saleTypeId}`
      : Prisma.empty;

    return Prisma.sql`
    WHERE 
    ${isAdminWhere}
    ${saleTypeWhere}
    `;
  }

  getOrderBy() {
    const sort = this.query?.sort;

    if (sort === 'POPULAR') {
      return Prisma.sql`ORDER BY score DESC`;
    }

    return Prisma.sql`ORDER BY albumArt.createdAt DESC`;
  }
}
