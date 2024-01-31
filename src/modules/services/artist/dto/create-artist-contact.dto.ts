import { Property } from '@/utils/swagger';

export interface CreateArtistContactDTOProps {
  method: string;
  contactId: string;
}

export class CreateArtistContactDTO {
  @Property({ apiProperty: { description: '연락 수단', type: 'string', example: '전화번호, 이메일 등등' } })
  method: string;

  @Property({ apiProperty: { description: '연락처 아이디', type: 'string' } })
  contactId: string;

  constructor(props?: CreateArtistContactDTOProps) {
    if (props) {
      this.method = props?.method;
      this.contactId = props?.contactId;
    }
  }
}
