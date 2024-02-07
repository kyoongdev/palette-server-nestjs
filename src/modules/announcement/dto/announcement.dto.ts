import { Property } from '@/utils/swagger';

export interface AnnouncementDTOProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export class AnnouncementDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '생성일', format: 'date-time' } })
  createdAt: Date;

  constructor(props: AnnouncementDTOProps) {
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }
}
