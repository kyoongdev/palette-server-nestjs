import { Property } from '@/utils/swagger';

export interface CreateAnnouncementDTOProps {
  title: string;
  content: string;
}

export class CreateAnnouncementDTO {
  @Property({ apiProperty: { type: 'string', description: '제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  constructor(props?: CreateAnnouncementDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
    }
  }
}
