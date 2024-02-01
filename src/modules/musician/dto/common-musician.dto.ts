import { FindCommonMusician, FindSQLCommonMusician, MusicianApproveStatus } from '@/interface/musician.interface';
import { GroupTypeResDecorator } from '@/modules/musician/validators/group-type.validator';
import { Property } from '@/utils/swagger';

export interface CommonMusicianDTOProps {
  id: string;
  stageName: string;
  name: string;
  groupType: number;
  introduction?: string;
  isPending: boolean;
  isAuthorized: boolean;
  profileImageUrl?: string;
}
export class CommonMusicianDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '활동명', type: 'string' } })
  stageName: string;

  @Property({ apiProperty: { description: '본명', type: 'string' } })
  name: string;

  @GroupTypeResDecorator()
  groupType: number;

  @Property({ apiProperty: { description: '세부 설명', type: 'string', nullable: true } })
  introduction?: string;

  @Property({
    apiProperty: {
      description: '승인 상태',
      type: 'string',
      enum: ['APPROVED', 'PENDING', 'REJECTED'],
      example: 'APPROVED |PENDING |REJECTED',
    },
  })
  approveStatus: MusicianApproveStatus;

  @Property({ apiProperty: { description: '프로필 이미지 url', type: 'string', nullable: true } })
  profileImageUrl?: string;

  constructor(props: CommonMusicianDTOProps) {
    this.id = props.id;
    this.stageName = props.stageName;
    this.name = props.name;
    this.groupType = props.groupType;
    this.approveStatus = this.getApproveStatus(props.isPending, props.isAuthorized);
    this.introduction = props.introduction;
    this.profileImageUrl = props.profileImageUrl;
  }

  private getApproveStatus(isPending: boolean, isAuthorized: boolean): MusicianApproveStatus {
    if (!isPending && isAuthorized) {
      return 'APPROVED';
    } else if (!isPending && !isAuthorized) {
      return 'REJECTED';
    } else return 'PENDING';
  }

  static fromFindCommonMusician(data: FindCommonMusician): CommonMusicianDTOProps {
    return {
      ...data,
      profileImageUrl: data.user.profileImage ? data.user.profileImage.url : null,
    };
  }

  static fromFindSQLCommonMusician(data: FindSQLCommonMusician) {
    return {
      id: data.musicianId,
      stageName: data.stageName,
      name: data.musicianName,
      groupType: data.musicianGroupType,
      isPending: data.musicianIsPending,
      isAuthorized: data.musicianIsAuthorized,
      profileImageUrl: data.musicianProfileUrl,
    };
  }
}
