import { Property } from '@/utils/swagger';

export interface UpdateReviewDTOProps {
  content: string;
}

export class UpdateReviewDTO {
  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  constructor(props?: UpdateReviewDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
