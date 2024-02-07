import { Property } from '@/utils/swagger';

export interface Top5ServiceDTOProps {
  id: string;
  name: string;
  musicianId: string;
  musicianProfileUrl: string;
}

export class Top5ServiceDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '뮤지션 id', type: 'string' } })
  musicianId: string;

  @Property({ apiProperty: { description: '뮤지션 프로필 url', type: 'string' } })
  musicianProfileUrl: string;

  constructor(props: Top5ServiceDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.musicianId = props.musicianId;
    this.musicianProfileUrl = props.musicianProfileUrl;
  }
}
