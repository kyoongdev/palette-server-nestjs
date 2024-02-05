import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

type FindReviewSort = 'SCORE_HIG' | 'SCORE_LOW';

export class FindReviewQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '서비스 id', nullable: true } })
  serviceId?: string;

  @Property({
    apiProperty: {
      type: 'string',
      description: '정렬',
      enum: ['SCORE_HIG', 'SCORE_LOW'],
      nullable: true,
      required: false,
    },
  })
  sort?: FindReviewSort;

  public toFindManyArgs(): Prisma.ServiceReviewFindManyArgs {
    return {
      where: {
        ...(this.serviceId && { serviceId: this.serviceId }),
      },
      orderBy: {
        ...(this.sort === 'SCORE_HIG' && { score: 'desc' }),
        ...(this.sort === 'SCORE_LOW' && { score: 'asc' }),
      },
    };
  }
}
