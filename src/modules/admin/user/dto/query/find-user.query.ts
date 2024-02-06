import { Prisma } from '@prisma/client';

import { Role, RoleType } from '@/interface/token.interface';
import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

export class AdminFindUserQuery extends PagingDTO {
  @Property({
    apiProperty: {
      type: 'string',
      description: '유저 종류',
      enum: Object.values(Role).filter((role) => role !== 'ADMIN'),
    },
  })
  role?: Exclude<RoleType, 'ADMIN'>;

  public toFindManyArgs(): Prisma.UserFindManyArgs {
    return {
      where: {
        ...(this.role && {
          musician: {
            ...(this.role === 'MUSICIAN'
              ? {
                  isNot: null,
                }
              : {
                  is: null,
                }),
          },
        }),
      },
      ...this.getSkipTake(),
    };
  }
}
