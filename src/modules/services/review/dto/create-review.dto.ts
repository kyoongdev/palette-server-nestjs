import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

export interface CreateReviewDTOProps {
  content: string;
  score: number;
  serviceId: string;
}

export class CreateReviewDTO {
  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  @Property({ apiProperty: { description: '점수', type: 'number', minimum: 0, maximum: 5 } })
  score: number;

  @Property({ apiProperty: { description: '서비스 id', type: 'string' } })
  serviceId: string;

  constructor(props?: CreateReviewDTOProps) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
      this.serviceId = props.serviceId;
    }
  }

  public toCreateArgs(userId: string): Prisma.ServiceReviewCreateInput {
    return {
      content: this.content,
      score: this.score,
      service: {
        connect: {
          id: this.serviceId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    };
  }
}
