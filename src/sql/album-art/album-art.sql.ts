import { Prisma } from '@prisma/client';

import { BaseAlbumARtSQL, BaseAlbumArtSQLProps } from './base-album-art.sql';

interface AlbumArtSQLProps extends BaseAlbumArtSQLProps {}

export class AlbumArtSQL extends BaseAlbumARtSQL {
  constructor(props: AlbumArtSQLProps) {
    super(props);
  }

  getSqlQuery(isAdmin = false) {
    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM AlbumArt albumArt
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    GROUP BY albumArt.id, serviceReview.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const isAdminWhere = isAdmin ? Prisma.sql`1 = 1` : Prisma.sql`albumArt.isAuthorized = 1 AND albumArt.isPending = 0`;

    return Prisma.sql`
    WHERE 
    ${isAdminWhere}
    `;
  }

  getOrderBy() {
    return Prisma.sql`ORDER BY albumArt.createdAt DESC`;
  }
}
