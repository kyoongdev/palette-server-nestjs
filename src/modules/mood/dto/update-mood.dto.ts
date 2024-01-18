import { Property } from '@/utils/swagger';

export interface UpdateMoodDTOProps {
  name?: string;
  order?: number;
}

export class UpdateMoodDTO {
  @Property({ apiProperty: { type: 'string', description: '분위기 이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'number', description: '분위기 순서', nullable: true } })
  order?: number;

  constructor(props?: UpdateMoodDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
