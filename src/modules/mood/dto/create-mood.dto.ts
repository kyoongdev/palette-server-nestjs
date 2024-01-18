import { Property } from '@/utils/swagger';

export interface CreateMoodDTOProps {
  name: string;
  order?: number;
}

export class CreateMoodDTO {
  @Property({ apiProperty: { type: 'string', description: '분위기 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '분위기 순서', nullable: true } })
  order?: number;

  constructor(props?: CreateMoodDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
