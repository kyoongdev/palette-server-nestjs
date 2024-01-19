import { MusicianApproveStatus } from '@/interface/musician.interface';
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

  constructor(props: CommonMusicianDTOProps) {
    this.id = props.id;
    this.stageName = props.stageName;
    this.name = props.name;
    this.groupType = props.groupType;
    this.approveStatus = this.getApproveStatus(props.isPending, props.isAuthorized);
  }

  private getApproveStatus(isPending: boolean, isAuthorized: boolean): MusicianApproveStatus {
    if (isPending && isAuthorized) {
      return 'APPROVED';
    } else if (isPending && !isAuthorized) {
      return 'REJECTED';
    } else return 'PENDING';
  }
}
