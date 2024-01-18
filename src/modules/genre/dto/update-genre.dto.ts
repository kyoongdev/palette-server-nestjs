import { Property } from '@/utils/swagger';

export interface UpdateGenreDTOProps {
  name?: string;
  order?: number;
}

export class UpdateGenreDTO {
  @Property({ apiProperty: { type: 'string', description: '장르 이름', nullable: true } })
  name?: string;

  @Property({ apiProperty: { type: 'number', description: '장르 순서', nullable: true } })
  order?: number;

  constructor(props?: UpdateGenreDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
