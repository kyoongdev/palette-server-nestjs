import { Prisma } from '@prisma/client';

import { BaseArtistSQL, BaseArtistSQLProps } from './base-artist.sql';

interface ArtistSQLProps extends BaseArtistSQLProps {}

export class ArtistSQL extends BaseArtistSQL {
  constructor(props: ArtistSQLProps) {
    super(props);
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
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`artist.isAuthorized = true AND artist.isPending = false`;
    return Prisma.sql`
    WHERE
    ${isAdminWhere}
    `;
  }

  getOrderBy() {
    return Prisma.empty;
  }
}
