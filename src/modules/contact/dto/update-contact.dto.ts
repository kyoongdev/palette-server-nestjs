import { Property } from '@/utils/swagger';

export interface UpdateContactDTOProps {
  name?: string;
  order?: number;
}

export class UpdateContactDTO {
  @Property({ apiProperty: { type: 'string', description: '연락처 이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'number', description: '연락처 순서', nullable: true } })
  order?: number;

  constructor(props?: UpdateContactDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
