import { FindMixMasteringLicense } from '@/interface/mix-mastering';
import { Property } from '@/utils/swagger';

export interface MixMasteringLicenseDTOProps {
  id: string;
  cost: number;
  updateCount: number;
  workPeriod: number;
  draftCount: number;
  isOriginFileProvided: boolean;
  isCopyRightTransferAllowed: boolean;
  isCommercialUseAllowed: boolean;
  isApplicationAvailable: boolean;
  licenseId: string;
  licenseName: string;
}

export class MixMasteringLicenseDTO {
  @Property({ apiProperty: { description: '믹스 마스터링 라이센스 아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '업데이트 횟수', type: 'number' } })
  updateCount: number;

  @Property({ apiProperty: { description: '작업 기간', type: 'number' } })
  workPeriod: number;

  @Property({ apiProperty: { description: '작업 횟수', type: 'number' } })
  draftCount: number;

  @Property({ apiProperty: { description: '원본 파일 제공 여부', type: 'boolean' } })
  isOriginFileProvided: boolean;

  @Property({ apiProperty: { description: '저작권 이전 가능 여부', type: 'boolean' } })
  isCopyRightTransferAllowed: boolean;

  @Property({ apiProperty: { description: '상업적 사용 가능 여부', type: 'boolean' } })
  isCommercialUseAllowed: boolean;

  @Property({ apiProperty: { description: '신청 가능 여부', type: 'boolean' } })
  isApplicationAvailable: boolean;

  @Property({ apiProperty: { description: '라이센스 아이디', type: 'string' } })
  licenseId: string;

  @Property({ apiProperty: { description: '라이센스 이름', type: 'string' } })
  licenseName: string;

  constructor(private props: MixMasteringLicenseDTOProps) {
    this.id = props.id;
    this.cost = props.cost;
    this.updateCount = props.updateCount;
    this.workPeriod = props.workPeriod;
    this.draftCount = props.draftCount;
    this.isOriginFileProvided = props.isOriginFileProvided;
    this.isCopyRightTransferAllowed = props.isCopyRightTransferAllowed;
    this.isCommercialUseAllowed = props.isCommercialUseAllowed;
    this.isApplicationAvailable = props.isApplicationAvailable;
    this.licenseId = props.licenseId;
    this.licenseName = props.licenseName;
  }

  static fromFindMixMasteringLicense(data: FindMixMasteringLicense) {
    return new MixMasteringLicenseDTO({
      id: data.id,
      cost: data.cost,
      updateCount: data.updateCount,
      workPeriod: data.workPeriod,
      draftCount: data.draftCount,
      isOriginFileProvided: data.isOriginFileProvided,
      isCopyRightTransferAllowed: data.isCopyRightTransferAllowed,
      isCommercialUseAllowed: data.isCommercialUseAllowed,
      isApplicationAvailable: data.isApplicationAvailable,
      licenseId: data.license.id,
      licenseName: data.license.name,
    });
  }
}
