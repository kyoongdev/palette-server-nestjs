import { Property } from '@/utils/swagger';

export interface CreateReviewDTOProps {
  content: string;
}

export class CreateReviewDTO {
  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  constructor(props?: CreateReviewDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
