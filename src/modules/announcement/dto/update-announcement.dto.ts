import { Property } from '@/utils/swagger';

export interface UpdateAnnouncementDTOProps {
  title?: string;
  content?: string;
}

export class UpdateAnnouncementDTO {
  @Property({ apiProperty: { type: 'string', description: '제목', nullable: true } })
  title?: string;

  @Property({ apiProperty: { type: 'string', description: '내용', nullable: true } })
  content?: string;

  constructor(props?: UpdateAnnouncementDTOProps) {
    if (props) {
      this.title = props.title;
      this.content = props.content;
    }
  }
}
