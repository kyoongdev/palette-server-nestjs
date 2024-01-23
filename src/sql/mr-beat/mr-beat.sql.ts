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

  getSqlQuery() {
    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM MrBeat as mrBeat
    ${this.getBaseJoin()}
    ${this.getWhere()}
    GROUP BY mrBeat.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere() {
    const moodWhere = this.query.moodId ? Prisma.sql`AND mood.id = ${this.query.moodId}` : Prisma.empty;
    const genreWhere = this.query.genreId ? Prisma.sql`AND genre.id = ${this.query.genreId}` : Prisma.empty;
    const groupTypeWhere = this.query.groupType
      ? Prisma.sql`AND mrBeat.groupType = ${this.query.groupType}`
      : Prisma.empty;

    return Prisma.sql`
    WHERE 1=1
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
