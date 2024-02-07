import { FindInquiry } from '@/interface/inquiry.interface';
import { CommonUserDTO, CommonUserDTOProps } from '@/modules/user/dto';
import { Property } from '@/utils/swagger';

export interface InquiryDTOProps {
  id: string;
  content: string;
  createdAt: Date;
  user: CommonUserDTO;
}

export class InquiryDTO {
  @Property({ apiProperty: { type: 'string', description: '문의 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '문의 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '문의 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: CommonUserDTO, description: '문의 작성자' } })
  user: CommonUserDTO;

  constructor(props: InquiryDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.user = props.user;
  }

  static fromFindInquiry(data: FindInquiry) {
    return new InquiryDTO({
      id: data.id,
      content: data.content,
      createdAt: data.createdAt,
      user: CommonUserDTO.fromFindCommonUser(data.user),
    });
  }
}
