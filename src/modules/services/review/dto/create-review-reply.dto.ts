import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

export interface CreateReviewReplyDTOProps {
  content: string;
}

export class CreateReviewReplyDTO {
  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  constructor(props?: CreateReviewReplyDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }

  public toCrateArgs(musicianId: string, reviewId: string): Prisma.ServiceReviewReplyCreateInput {
    return {
      content: this.content,
      musician: {
        connect: {
          id: musicianId,
        },
      },
      serviceReview: {
        connect: {
          id: reviewId,
        },
      },
    };
  }
}
