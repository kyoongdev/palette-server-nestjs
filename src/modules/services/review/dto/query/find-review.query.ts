import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

export class FindReviewQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '서비스 id', nullable: true } })
  serviceId?: string;

  public toWhereArgs(): Prisma.ServiceReviewWhereInput {
    return {
      ...(this.serviceId && { serviceId: this.serviceId }),
    };
  }
}
