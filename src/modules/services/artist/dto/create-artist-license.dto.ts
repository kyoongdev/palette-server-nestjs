import { Property } from '@/utils/swagger';

export interface CreateArtistLicenseDTOProps {
  cost: number;
  updateCount: number;
  workPeriod: number;
  draftCount: number;
  isCopyRightTransferAllowed: boolean;
  isCommercialUseAllowed: boolean;
  isOriginFileProvided: boolean;
  isApplicationAvailable: boolean;
  licenseId: string;
}

export class CreateArtistLicenseDTO {
  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '수정 횟수', type: 'number' } })
  updateCount: number;

  @Property({ apiProperty: { description: '작업 기간', type: 'number' } })
  workPeriod: number;

  @Property({ apiProperty: { description: '시간 개수', type: 'number' } })
  draftCount: number;

  @Property({ apiProperty: { description: '저작권 이전 가능 여부', type: 'boolean' } })
  isCopyRightTransferAllowed: boolean;

  @Property({ apiProperty: { description: '상업적 사용 가능 여부', type: 'boolean' } })
  isCommercialUseAllowed: boolean;

  @Property({ apiProperty: { description: '원본 파일 제공 여부', type: 'boolean' } })
  isOriginFileProvided: boolean;

  @Property({ apiProperty: { description: '응용 활용 여부', type: 'boolean' } })
  isApplicationAvailable: boolean;

  @Property({ apiProperty: { description: '라이센스 아이디', type: 'string' } })
  licenseId: string;

  constructor(props?: CreateArtistLicenseDTOProps) {
    if (props) {
      this.cost = props.cost;
      this.updateCount = props.updateCount;
      this.workPeriod = props.workPeriod;
      this.draftCount = props.draftCount;
      this.isCopyRightTransferAllowed = props.isCopyRightTransferAllowed;
      this.isCommercialUseAllowed = props.isCommercialUseAllowed;
      this.isOriginFileProvided = props.isOriginFileProvided;
      this.isApplicationAvailable = props.isApplicationAvailable;
      this.licenseId = props.licenseId;
    }
  }
}
