import { Prisma } from '@prisma/client';

import { BaseRecordingSQL, BaseRecordingSQLProps } from './base-recording.sql';

interface RecordingSQLProps extends BaseRecordingSQLProps {}

export class RecordingSQL extends BaseRecordingSQL {
  constructor(props: RecordingSQLProps) {
    super(props);
  }

  getSqlQuery(isAdmin = false) {
    return Prisma.sql`
    ${this.getBaseSelect()}
    FROM Recording recording
    ${this.getBaseJoin()}
    ${this.getWhere(isAdmin)}
    GROUP BY recording.id, thumbnail.id
    ${this.getOrderBy()}
    LIMIT ${this.paging.page},${this.paging.limit ?? 10}
    `;
  }

  getWhere(isAdmin = false) {
    const isAdminWhere = isAdmin
      ? Prisma.sql`1 = 1`
      : Prisma.sql`recording.isAuthorized = true AND recording.isPending = false`;
    return `
    WHERE
    ${isAdminWhere}
    `;
  }

  getOrderBy() {
    return `
    ORDER BY score DESC
    `;
  }
}
