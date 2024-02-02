import { Prisma } from '@prisma/client';

import { BaseMixMasteringSQL, BaseMixMasteringSQLProps } from './base-mix-mastering.sql';

interface MixMasteringSQLProps extends BaseMixMasteringSQLProps {}

export class MixMasteringSQL extends BaseMixMasteringSQL {
  constructor(props: MixMasteringSQLProps) {
    super(props);
  }

  getSqlQuery(isAdmin = false) {
    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM MixMastering mixMastering
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    GROUP BY mixMastering.id, serviceReview.id, genre.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`mixMastering.isAuthorized = 1 AND mixMastering.isPending = 0`;

    return Prisma.sql`
    WHERE 
    ${isAdminWhere}
    `;
  }

  getOrderBy() {
    return Prisma.sql`ORDER BY mixMastering.createdAt DESC`;
  }
}
