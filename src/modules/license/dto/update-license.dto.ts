import { Property } from '@/utils/swagger';

export interface UpdateLicenseDTOProps {
  name?: string;
  order?: number;
}

export class UpdateLicenseDTO {
  @Property({ apiProperty: { type: 'string', description: '라이센스 이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'number', description: '라이센스 순서', nullable: true } })
  order?: number;

  constructor(props?: UpdateLicenseDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
