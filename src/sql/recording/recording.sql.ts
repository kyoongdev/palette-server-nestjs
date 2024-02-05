import { Prisma } from '@prisma/client';

import { FindRecordingListQuery } from '@/modules/services/recording/dto/query';

import { BaseRecordingSQL, BaseRecordingSQLProps } from './base-recording.sql';

interface RecordingSQLProps extends BaseRecordingSQLProps {
  query: FindRecordingListQuery;
}

export class RecordingSQL extends BaseRecordingSQL {
  query: FindRecordingListQuery;

  constructor(props: RecordingSQLProps) {
    super(props);
    this.query = props.query;
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
      : Prisma.sql`recording.isAuthorized = 1 AND recording.isPending = 0`;

    const regionLargeGroupWhere = this.query.regionLargeGroupId
      ? Prisma.sql`AND recordingRegion.regionLargeGroupId = ${this.query.regionLargeGroupId}`
      : Prisma.empty;

    const regionSmallGroupWhere = this.query.regionSmallGroupId
      ? Prisma.sql`AND recordingRegion.regionSmallGroupId = ${this.query.regionSmallGroupId}`
      : Prisma.empty;

    const isEngineerSupportedWhere =
      typeof this.query.isEngineerSupported === 'boolean'
        ? Prisma.sql`AND recording.isEngineerSupported = ${this.query.isEngineerSupported ? '1' : '0'}`
        : Prisma.empty;

    return Prisma.sql`
    WHERE
    ${isAdminWhere}
    ${regionLargeGroupWhere}
    ${regionSmallGroupWhere}
    ${isEngineerSupportedWhere}
    `;
  }

  getOrderBy() {
    return Prisma.sql`ORDER BY recording.createdAt DESC`;
  }
}
