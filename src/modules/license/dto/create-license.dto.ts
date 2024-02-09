import { Property } from '@/utils/swagger';

export interface CreateLicenseDTOProps {
  name: string;
  order?: number;
}

export class CreateLicenseDTO {
  @Property({ apiProperty: { type: 'string', description: '라이센스 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '라이센스 순서', nullable: true } })
  order?: number;

  constructor(props?: CreateLicenseDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
