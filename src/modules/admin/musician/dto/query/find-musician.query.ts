import { Prisma } from '@prisma/client';
import { camelCase } from 'lodash';

import { ServiceType } from '@/interface/service.interface';
import { SERVICE_TYPE_VALUE } from '@/modules/admin/service/validation';
import { PagingDTO } from '@/utils/pagination';
import { Property, ToBoolean } from '@/utils/swagger';

export class AdminFindMusicianQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', description: '판매자 등록 승인 여부', nullable: true, required: false } })
  isAuthorized?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '판매자 유형', enum: SERVICE_TYPE_VALUE } })
  serviceType?: ServiceType;

  public toFindManyArgs(): Prisma.MusicianFindManyArgs {
    return {
      where: {
        ...(this.serviceType && {
          services: {
            some: {
              [camelCase(this.serviceType)]: {
                isNot: null,
              },
            },
          },
        }),
        ...(this.isAuthorized === false && {
          isAuthorized: false,
          isPending: true,
        }),
        ...(this.isAuthorized === true && {
          isAuthorized: true,
          isPending: false,
        }),
      },
    };
  }
}
