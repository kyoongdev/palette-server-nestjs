import { Property } from '@/utils/swagger';

export interface CreateContactDTOProps {
  name: string;
  order?: number;
}

export class CreateContactDTO {
  @Property({ apiProperty: { type: 'string', description: '연락처 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '연락처 순서', nullable: true } })
  order?: number;

  constructor(props?: CreateContactDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
