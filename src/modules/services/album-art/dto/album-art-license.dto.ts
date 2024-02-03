import { FindAlbumArtLicense } from '@/interface/album-art.interface';
import { Property } from '@/utils/swagger';

export interface AlbumArtLicenseDTOProps {
  id: string;
  licenseId: string;
  licenseName: string;
  cost: number;
  updateCount: number;
  workPeriod: number;
  draftCount: number;
  isCopyRightTransferAllowed: boolean;
  isCommercialUseAllowed: boolean;
  isOriginFileProvided: boolean;
  isApplicationAvailable: boolean;
}

export class AlbumArtLicenseDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '라이센스 id', type: 'string' } })
  licenseId: string;

  @Property({ apiProperty: { description: '라이센스 이름', type: 'string' } })
  licenseName: string;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '수정 횟수', type: 'number' } })
  updateCount: number;

  @Property({ apiProperty: { description: '작업 기간', type: 'number' } })
  workPeriod: number;

  @Property({ apiProperty: { description: '초안 횟수', type: 'number' } })
  draftCount: number;

  @Property({ apiProperty: { description: '저작권 이전 가능 여부', type: 'boolean' } })
  isCopyRightTransferAllowed: boolean;

  @Property({ apiProperty: { description: '상업적 사용 가능 여부', type: 'boolean' } })
  isCommercialUseAllowed: boolean;

  @Property({ apiProperty: { description: '원본 파일 제공 여부', type: 'boolean' } })
  isOriginFileProvided: boolean;

  @Property({ apiProperty: { description: '신청 가능 여부', type: 'boolean' } })
  isApplicationAvailable: boolean;

  constructor(props: AlbumArtLicenseDTOProps) {
    this.id = props.id;
    this.licenseId = props.licenseId;
    this.licenseName = props.licenseName;
    this.cost = props.cost;
    this.updateCount = props.updateCount;
    this.workPeriod = props.workPeriod;
    this.draftCount = props.draftCount;
    this.isCopyRightTransferAllowed = props.isCopyRightTransferAllowed;
    this.isCommercialUseAllowed = props.isCommercialUseAllowed;
    this.isOriginFileProvided = props.isOriginFileProvided;
    this.isApplicationAvailable = props.isApplicationAvailable;
  }

  static fromFindAlbumArtLicense(data: FindAlbumArtLicense) {
    const { license, ...rest } = data;
    return new AlbumArtLicenseDTO({
      ...rest,
      licenseId: license.id,
      licenseName: license.name,
    });
  }
}
