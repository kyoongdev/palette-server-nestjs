import { Prisma } from '@prisma/client';

import { FindMrBeatsQuery } from '@/modules/services/mr-beat/dto/query/find-mr-beats.query';

import { BaseMrBeatSQL, BaseMrBeatSQLProps } from './base-mr-beat.sql';

interface MrBeatSQLProps extends BaseMrBeatSQLProps {
  query: FindMrBeatsQuery;
}

export class MrBeatSQL extends BaseMrBeatSQL {
  query: FindMrBeatsQuery;

  constructor(props: MrBeatSQLProps) {
    super(props);
    this.query = props.query;
  }

  getSqlQuery(isAdmin = false) {
    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM MrBeat mrBeat
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    GROUP BY mrBeat.id, serviceReview.id, mood.id, genre.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const moodWhere = this.query.moodId ? Prisma.sql`AND mood.id = ${this.query.moodId}` : Prisma.empty;
    const genreWhere = this.query.genreId ? Prisma.sql`AND genre.id = ${this.query.genreId}` : Prisma.empty;
    const groupTypeWhere = this.query.groupType
      ? Prisma.sql`AND mrBeat.groupType = ${this.query.groupType}`
      : Prisma.empty;
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`mrBeat.isAuthorized = 1 AND mrBeat.isPending = 0 AND mrBeat.isSaleStopped = 0`;

    return Prisma.sql`
    WHERE 
    ${isAdminWhere}
    ${moodWhere}
    ${genreWhere}
    ${groupTypeWhere}
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
