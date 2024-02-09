import { MoodDTO, MoodDTOProps } from '@/modules/mood/dto';
import { Property } from '@/utils/swagger';

export interface AdminMoodDTOProps extends MoodDTOProps {
  order: number;
}

export class AdminMoodDTO extends MoodDTO {
  @Property({ apiProperty: { type: 'number', description: '순서' } })
  order: number;

  constructor(props: AdminMoodDTOProps) {
    super(props);
    this.order = props.order;
  }
}
