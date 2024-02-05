import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

export interface UpdateReviewReplyDTOProps {
  content: string;
}

export class UpdateReviewReplyDTO {
  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  constructor(props?: UpdateReviewReplyDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }

  public toUpdateArgs(): Prisma.ServiceReviewReplyUpdateInput {
    return {
      content: this.content,
    };
  }
}
