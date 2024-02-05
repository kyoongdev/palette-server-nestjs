import { Prisma } from '@prisma/client';
import { camelCase } from 'lodash';

import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

import { SERVICE_TYPE_VALUE, ServiceType } from '../../validation';

export class FindServiceQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '마켓명', nullable: true, enum: SERVICE_TYPE_VALUE } })
  marketName?: ServiceType;

  public toFindManyArgs(): Prisma.MusicianServiceFindManyArgs {
    const marketWhere = {
      isAuthorized: true,
      isPending: false,
    };
    console.log({ marketName: this.marketName });
    return {
      where: {
        ...(this.marketName && {
          [camelCase(this.marketName)]: marketWhere,
        }),
      },
    };
  }
}
