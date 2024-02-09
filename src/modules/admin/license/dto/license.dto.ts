import { LicenseDTO } from '@/modules/license/dto';
import { Property } from '@/utils/swagger';

export interface AdminLicenseDTOProps extends LicenseDTO {
  order: number;
}

export class AdminLicenseDTO {
  @Property({ apiProperty: { type: 'number', description: '라이센스 순서' } })
  order: number;

  constructor(props: AdminLicenseDTOProps) {
    this.order = props.order;
  }
}
