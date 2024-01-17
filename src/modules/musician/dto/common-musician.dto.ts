import { GroupTypeResDecorator } from '@/common/validators/group-type.validator';
import { Property } from '@/utils/swagger';

export interface CommonMusicianDTOProps {
  id: string;
  stageName: string;
  name: string;
  groupType: number;
  introduction?: string;
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

  constructor(props: CommonMusicianDTOProps) {
    this.id = props.id;
    this.stageName = props.stageName;
    this.name = props.name;
    this.groupType = props.groupType;
  }
}
