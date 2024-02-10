import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { FindArtistListQuery } from '@/modules/services/artist/dto/query';

import { BaseArtistSQL, BaseArtistSQLProps } from './base-artist.sql';

interface ArtistSQLProps extends BaseArtistSQLProps {
  query: FindArtistListQuery;
  isAdmin: boolean;
}

@Injectable()
export class ArtistSQL extends BaseArtistSQL {
  query: FindArtistListQuery;

  getSqlQuery({ isAdmin = false, query, paging }: ArtistSQLProps) {
    this.query = query;
    this.paging = paging;

    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM Artist artist
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    GROUP BY artist.id, thumbnail.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`artist.isAuthorized = 1 AND artist.isPending = 0 AND artist.isSaleStopped = 0`;

    const saleTypeIdWhere = this.query.saleTypeId
      ? Prisma.sql`AND saleType.saleTypeId = ${this.query.saleTypeId}`
      : Prisma.empty;

    return Prisma.sql`
    WHERE
    ${isAdminWhere}
    ${saleTypeIdWhere}
    `;
  }

  getOrderBy() {
    const sort = this.query.sort;
    if (sort === 'POPULARITY') {
      return Prisma.sql`ORDER BY score DESC`;
    }
    return Prisma.empty;
  }
}
