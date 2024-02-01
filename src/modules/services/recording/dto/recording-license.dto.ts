import { FindRecordingLicense } from '@/interface/recording.interface';
import { Property } from '@/utils/swagger';

export interface RecordingLicenseDTOProps {
  id: string;
  useTime: number;
  cost: number;
  licenseId: string;
  licenseName: string;
}

export class RecordingLicenseDTO {
  @Property({ apiProperty: { description: '레코딩 라이센스 ID', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이용시간', type: 'number' } })
  useTime: number;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '라이센스 ID', type: 'string' } })
  licenseId: string;

  @Property({ apiProperty: { description: '라이센스 이름', type: 'string' } })
  licenseName: string;

  constructor(props: RecordingLicenseDTOProps) {
    this.id = props.id;
    this.useTime = props.useTime;
    this.cost = props.cost;
    this.licenseId = props.licenseId;
    this.licenseName = props.licenseName;
  }

  static fromFindRecordingLicense(props: FindRecordingLicense) {
    return new RecordingLicenseDTO({
      id: props.id,
      useTime: props.useTime,
      cost: props.cost,
      licenseId: props.license.id,
      licenseName: props.license.name,
    });
  }
}
