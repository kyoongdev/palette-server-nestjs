import { Property } from '@/utils/swagger';

export interface ContactDTOProps {
  id: string;
  name: string;
}

export class ContactDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;
  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  constructor(props: ContactDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
