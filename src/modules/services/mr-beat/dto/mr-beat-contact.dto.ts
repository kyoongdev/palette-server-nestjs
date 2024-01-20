import { FindMrBeatContact } from '@/interface/mr-beat.interface';
import { Property } from '@/utils/swagger';

export interface MrBeatContactDTOProps {
  method: string;
  contactName: string;
  contactId: string;
}

export class MrBeatContactDTO {
  @Property({ apiProperty: { description: '연락 수단', type: 'string', example: '전화번호, 이메일 등등' } })
  method: string;

  @Property({ apiProperty: { description: '연락처 이름', type: 'string' } })
  contactName: string;

  @Property({ apiProperty: { description: '연락처 id', type: 'string' } })
  contactId: string;

  constructor(props: MrBeatContactDTOProps) {
    this.method = props.method;
    this.contactName = props.contactName;
    this.contactId = props.contactId;
  }

  static fromFindMrBeatContact(data: FindMrBeatContact): MrBeatContactDTOProps {
    return {
      method: data.method,
      contactName: data.contact.name,
      contactId: data.contact.id,
    };
  }
}
