import { Property } from '@/utils/swagger';

export interface UpdateInquiryDTOProps {
  content: string;
}

export class UpdateInquiryDTO {
  @Property({ apiProperty: { type: 'string', description: '문의 내용' } })
  content: string;

  constructor(props?: UpdateInquiryDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
