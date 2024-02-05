import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

export interface UpdateReviewDTOProps {
  content?: string;
  score?: number;
}

export class UpdateReviewDTO {
  @Property({ apiProperty: { description: '내용', type: 'string', nullable: true } })
  content?: string;

  @Property({ apiProperty: { description: '점수', type: 'number', nullable: true, minimum: 0, maximum: 5 } })
  score?: number;

  constructor(props?: UpdateReviewDTOProps) {
    if (props) {
      this.content = props.content;
      this.score = props.score;
    }
  }

  public toUpdateArgs(): Prisma.ServiceReviewUpdateInput {
    return {
      content: this.content,
      score: this.score,
    };
  }
}
