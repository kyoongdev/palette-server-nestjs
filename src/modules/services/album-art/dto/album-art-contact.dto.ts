import { FindAlbumArtContact } from '@/interface/album-art.interface';
import { Property } from '@/utils/swagger';

export interface AlbumArtContactDTOProps {
  method: string;
  contactName: string;
  contactId: string;
}

export class AlbumArtContactDTO {
  @Property({ apiProperty: { description: '연락 수단', type: 'string', example: '전화번호, 이메일 등등' } })
  method: string;

  @Property({ apiProperty: { description: '연락처 이름', type: 'string' } })
  contactName: string;

  @Property({ apiProperty: { description: '연락처 id', type: 'string' } })
  contactId: string;

  constructor(props: AlbumArtContactDTOProps) {
    this.method = props.method;
    this.contactName = props.contactName;
    this.contactId = props.contactId;
  }

  static fromFindAlbumArtContact(data: FindAlbumArtContact): AlbumArtContactDTOProps {
    return {
      method: data.method,
      contactName: data.contact.name,
      contactId: data.contact.id,
    };
  }
}
