import { Property } from '@/utils/swagger';

export interface GenreDTOProps {
  id: string;
  name: string;
}

export class GenreDTO {
  @Property({ apiProperty: { type: 'string', description: '장르 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '장르 이름' } })
  name: string;

  constructor(props: GenreDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
