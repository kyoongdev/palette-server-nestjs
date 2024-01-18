import { Property } from '@/utils/swagger';

export interface CreateGenreDTOProps {
  name: string;
  order?: number;
}

export class CreateGenreDTO {
  @Property({ apiProperty: { type: 'string', description: '장르 이름' } })
  name: string;

  @Property({ apiProperty: { type: 'number', description: '장르 순서', nullable: true } })
  order?: number;

  constructor(props?: CreateGenreDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
