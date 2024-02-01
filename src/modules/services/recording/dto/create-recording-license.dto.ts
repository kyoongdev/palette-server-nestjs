import { Property } from '@/utils/swagger';

export interface CreateRecordingLicenseDTOProps {
  licenseId: string;
  useTime: number;
  cost: number;
}

export class CreateRecordingLicenseDTO {
  @Property({ apiProperty: { description: '라이센스 ID', type: 'string' } })
  licenseId: string;

  @Property({ apiProperty: { description: '이용시간', type: 'number' } })
  useTime: number;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  constructor(props?: CreateRecordingLicenseDTOProps) {
    if (props) {
      this.licenseId = props.licenseId;
      this.useTime = props.useTime;
      this.cost = props.cost;
    }
  }
}
