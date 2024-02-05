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
}
