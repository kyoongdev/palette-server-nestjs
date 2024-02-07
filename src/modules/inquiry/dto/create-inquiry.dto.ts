import { Property } from '@/utils/swagger';

export interface CreateInquiryDTOProps {
  content: string;
}

export class CreateInquiryDTO {
  @Property({ apiProperty: { type: 'string', description: '문의 내용' } })
  content: string;

  constructor(props?: CreateInquiryDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
