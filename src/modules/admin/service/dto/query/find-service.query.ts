import { ApiProperty } from '@nestjs/swagger';

import { Prisma } from '@prisma/client';
import { IsEnum } from 'class-validator';
import { camelCase } from 'lodash';

import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

import { SERVICE_TYPE_VALUE, ServiceType } from '../../validation';

export class FindServiceQuery extends PagingDTO {
  @Property({
    apiProperty: {
      description: '마켓명',
      nullable: true,
      type: 'string',
      enum: SERVICE_TYPE_VALUE,
      required: false,
    },
  })
  marketName?: ServiceType;

  public toFindManyArgs(): Prisma.MusicianServiceFindManyArgs {
    const marketWhere = {
      isAuthorized: true,
      isPending: false,
    };

    return {
      where: {
        ...(this.marketName && {
          [camelCase(this.marketName)]: marketWhere,
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    };
  }
}
