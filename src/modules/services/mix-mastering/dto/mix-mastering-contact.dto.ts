import { FindMixMasteringContact } from '@/interface/mix-mastering';
import { Property } from '@/utils/swagger';

export interface MixMasteringContactDTOProps {
  contactId: string;
  contactName: string;
  method: string;
}

export class MixMasteringContactDTO {
  @Property({ apiProperty: { description: '연락 수단', type: 'string', example: '전화번호, 이메일 등등' } })
  method: string;

  @Property({ apiProperty: { description: '연락처 이름', type: 'string' } })
  contactName: string;

  @Property({ apiProperty: { description: '연락처 id', type: 'string' } })
  contactId: string;

  constructor(props: MixMasteringContactDTOProps) {
    this.method = props.method;
    this.contactName = props.contactName;
    this.contactId = props.contactId;
  }

  static fromFindMixMasteringContact(data: FindMixMasteringContact) {
    return new MixMasteringContactDTO({
      contactId: data.contactId,
      contactName: data.contact.name,
      method: data.method,
    });
  }
}
