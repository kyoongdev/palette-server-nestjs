import { Property } from '@/utils/swagger';

export interface MoodDTOProps {
  id: string;
  name: string;
}

export class MoodDTO {
  @Property({ apiProperty: { type: 'string', description: '분위기 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '분위기 이름' } })
  name: string;

  constructor(props: MoodDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
