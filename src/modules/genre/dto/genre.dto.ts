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

  constructor(genre: GenreDTOProps) {
    this.id = genre.id;
    this.name = genre.name;
  }
}
