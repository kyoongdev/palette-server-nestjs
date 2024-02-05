import { FindReview } from '@/interface/review.interface';
import { CommonUserDTO, CommonUserDTOProps } from '@/modules/user/dto';
import { Property } from '@/utils/swagger';

import { ReviewReplyDTO, ReviewReplyDTOProps } from './review-reply.dto';

export interface ReviewDTOProps {
  id: string;
  content: string;
  score: number;
  user: CommonUserDTOProps;
  replies: ReviewReplyDTOProps[];
}

export class ReviewDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  @Property({ apiProperty: { description: '점수', type: 'number' } })
  score: number;

  @Property({ apiProperty: { type: CommonUserDTO } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: ReviewReplyDTO, isArray: true } })
  replies: ReviewReplyDTO[];

  constructor(props: ReviewDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.score = props.score;
    this.user = new CommonUserDTO(props.user);
    this.replies = props.replies.map((reply) => new ReviewReplyDTO(reply));
  }

  static fromFindReview(data: FindReview) {
    return new ReviewDTO({
      id: data.id,
      content: data.content,
      score: data.score,
      user: data.user,
      replies: data.replies.map((reply) => ({
        id: reply.id,
        content: reply.content,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
        musician: reply.musician,
      })),
    });
  }
}
