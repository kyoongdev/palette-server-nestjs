import { Prisma } from '@prisma/client';

import { FindArtistListQuery } from '@/modules/services/artist/dto/query';

import { BaseArtistSQL, BaseArtistSQLProps } from './base-artist.sql';

interface ArtistSQLProps extends BaseArtistSQLProps {
  query: FindArtistListQuery;
}

export class ArtistSQL extends BaseArtistSQL {
  query: FindArtistListQuery;

  constructor(props: ArtistSQLProps) {
    super(props);
    this.query = props.query;
  }

  getSqlQuery(isAdmin = false) {
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
    const isAdminWhere = isAdmin ? Prisma.sql`1 = 1` : Prisma.sql`artist.isAuthorized = 1 AND artist.isPending = 0`;

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
