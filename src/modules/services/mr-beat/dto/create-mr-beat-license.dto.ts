import { Property } from '@/utils/swagger';

export interface CreateMrBeatLicenseDTOProps {
  usePeriod?: string;
  cost: number;
  isNewSongWithVoiceAllowed: boolean;
  isProfitActivityAllowed: boolean;
  isPerformanceActivityAllowed: boolean;
  isBackgroundMusicAllowed: boolean;
  isMVProduceAllowed: boolean;
  isShareAllowed: boolean;
  isArrangeAllowed: boolean;
  licenseId: string;
}

export class CreateMrBeatLicenseDTO {
  @Property({ apiProperty: { description: '사용 기간', type: 'string', example: '1년, 2년, 3년 등등' } })
  usePeriod?: string;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '신곡+보컬 사용 가능 여부', type: 'boolean' } })
  isNewSongWithVoiceAllowed: boolean;

  @Property({ apiProperty: { description: '영리 활동 가능 여부', type: 'boolean' } })
  isProfitActivityAllowed: boolean;

  @Property({ apiProperty: { description: '공연 활동 가능 여부', type: 'boolean' } })
  isPerformanceActivityAllowed: boolean;

  @Property({ apiProperty: { description: '배경음악 사용 가능 여부', type: 'boolean' } })
  isBackgroundMusicAllowed: boolean;

  @Property({ apiProperty: { description: '뮤비 제작 가능 여부', type: 'boolean' } })
  isMVProduceAllowed: boolean;

  @Property({ apiProperty: { description: '공유 가능 여부', type: 'boolean' } })
  isShareAllowed: boolean;

  @Property({ apiProperty: { description: '편곡 가능 여부', type: 'boolean' } })
  isArrangeAllowed: boolean;

  @Property({ apiProperty: { description: '라이센스 아이디', type: 'string' } })
  licenseId: string;

  constructor(props?: CreateMrBeatLicenseDTOProps) {
    if (props) {
      this.usePeriod = props.usePeriod;
      this.cost = props.cost;
      this.isNewSongWithVoiceAllowed = props.isNewSongWithVoiceAllowed;
      this.isProfitActivityAllowed = props.isProfitActivityAllowed;
      this.isPerformanceActivityAllowed = props.isPerformanceActivityAllowed;
      this.isBackgroundMusicAllowed = props.isBackgroundMusicAllowed;
      this.isMVProduceAllowed = props.isMVProduceAllowed;
      this.isShareAllowed = props.isShareAllowed;
      this.isArrangeAllowed = props.isArrangeAllowed;
      this.licenseId = props.licenseId;
    }
  }
}
