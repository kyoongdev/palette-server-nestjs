import { Property } from '@/utils/swagger';

export interface CreateMixMasteringContactDTOProps {
  method: string;
  contactId: string;
}

export class CreateMixMasteringContactDTO {
  @Property({ apiProperty: { description: '연락 방법', type: 'string' } })
  method: string;

  @Property({ apiProperty: { description: '연락 아이디', type: 'string' } })
  contactId: string;

  constructor(props?: CreateMixMasteringContactDTOProps) {
    if (props) {
      this.method = props.method;
      this.contactId = props.contactId;
    }
  }
}
