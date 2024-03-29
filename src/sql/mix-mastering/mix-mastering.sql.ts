import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { FindMixMasteringQuery } from '@/modules/services/mix-mastering/dto/query';

import { BaseMixMasteringSQL, BaseMixMasteringSQLProps } from './base-mix-mastering.sql';

interface MixMasteringSQLProps extends BaseMixMasteringSQLProps {
  query: FindMixMasteringQuery;
  isAdmin: boolean;
}

@Injectable()
export class MixMasteringSQL extends BaseMixMasteringSQL {
  query: FindMixMasteringQuery;

  getSqlQuery({ isAdmin = false, query, paging }: MixMasteringSQLProps) {
    this.query = query;
    this.paging = paging;
    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM MixMastering mixMastering
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    GROUP BY mixMastering.id, serviceReview.id, genre.id, musicBefore.id, musicAfter.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`mixMastering.isAuthorized = 1 AND mixMastering.isPending = 0 AND mixMastering.isSaleStopped = 0`;
    const genreWhere = this.query.genreId
      ? Prisma.sql`AND mixMasteringGenre.genreId = ${this.query.genreId}`
      : Prisma.empty;

    return Prisma.sql`
    WHERE 
    ${isAdminWhere}
    ${genreWhere}
    `;
  }

  getOrderBy() {
    const sort = this.query.sort;
    if (sort === 'POPULAR') {
      return Prisma.sql`ORDER BY score DESC`;
    }
    return Prisma.sql`ORDER BY mixMastering.createdAt DESC`;
  }
}
