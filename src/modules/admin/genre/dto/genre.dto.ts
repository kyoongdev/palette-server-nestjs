import { GenreDTO, GenreDTOProps } from '@/modules/genre/dto';
import { Property } from '@/utils/swagger';

export interface AdminGenreDTOProps extends GenreDTOProps {
  order: number;
}

export class AdminGenreDTO extends GenreDTO {
  @Property({ apiProperty: { type: 'number', description: '장르 순서' } })
  order: number;

  constructor(props: AdminGenreDTOProps) {
    super(props);
    this.order = props.order;
  }
}
