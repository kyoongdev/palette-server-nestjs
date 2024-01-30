import { FindArtistContact } from '@/interface/artist.interface';
import { Property } from '@/utils/swagger';

export interface ArtistContactDTOProps {
  method: string;
  contactName: string;
  contactId: string;
}

export class ArtistContactDTO {
  @Property({ apiProperty: { description: '연락 수단', type: 'string', example: '전화번호, 이메일 등등' } })
  method: string;

  @Property({ apiProperty: { description: '연락처 이름', type: 'string' } })
  contactName: string;

  @Property({ apiProperty: { description: '연락처 id', type: 'string' } })
  contactId: string;

  constructor(props: ArtistContactDTOProps) {
    this.method = props.method;
    this.contactName = props.contactName;
    this.contactId = props.contactId;
  }

  static fromFindArtistContact(data: FindArtistContact): ArtistContactDTOProps {
    return {
      method: data.method,
      contactName: data.contact.name,
      contactId: data.contact.id,
    };
  }
}
