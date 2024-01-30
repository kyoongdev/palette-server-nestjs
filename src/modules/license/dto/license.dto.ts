import { Property } from '@/utils/swagger';

interface LicenseDTOProps {
  id: string;
  name: string;
}

export class LicenseDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  constructor(props: LicenseDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
