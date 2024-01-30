import { FindArtistLicense } from '@/interface/artist.interface';
import { Property } from '@/utils/swagger';

export interface ArtistLicenseDTOProps {
  id: string;
  cost: number;
  updateCount: number;
  workPeriod: number;
  draftCount: number;
  isCopyRightTransferAllowed: boolean;
  isCommercialUseAllowed: boolean;
  isOriginFileProvided: boolean;
  isApplicationAvailable: boolean;
  licenseId: string;
  licenseName: string;
}

export class ArtistLicenseDTO {
  @Property({ apiProperty: { description: '아티스트 라이센스 아이디', type: 'string' } })
  id: string;

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

  @Property({ apiProperty: { description: '라이센스 이름', type: 'string' } })
  licenseName: string;

  @Property({ apiProperty: { description: '라이센스 아이디', type: 'string' } })
  licenseId: string;

  constructor(props: ArtistLicenseDTOProps) {
    this.id = props.id;
    this.cost = props.cost;
    this.updateCount = props.updateCount;
    this.workPeriod = props.workPeriod;
    this.draftCount = props.draftCount;
    this.isCopyRightTransferAllowed = props.isCopyRightTransferAllowed;
    this.isCommercialUseAllowed = props.isCommercialUseAllowed;
    this.isOriginFileProvided = props.isOriginFileProvided;
    this.isApplicationAvailable = props.isApplicationAvailable;
    this.licenseName = props.licenseName;
    this.licenseId = props.licenseId;
  }

  static fromFindArtistLicense(data: FindArtistLicense): ArtistLicenseDTO {
    return new ArtistLicenseDTO({
      id: data.id,
      cost: data.cost,
      updateCount: data.updateCount,
      workPeriod: data.workPeriod,
      draftCount: data.draftCount,
      isCopyRightTransferAllowed: data.isCopyRightTransferAllowed,
      isCommercialUseAllowed: data.isCommercialUseAllowed,
      isOriginFileProvided: data.isOriginFileProvided,
      isApplicationAvailable: data.isApplicationAvailable,
      licenseId: data.licenseId,
      licenseName: data.license.name,
    });
  }
}
