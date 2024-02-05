import { Property } from '@/utils/swagger';

export interface MusicianEvidenceFileDTOProps {
  id: string;
  originalName: string;
  extension: string;
  url: string;
}

export class MusicianEvidenceFileDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '원본 파일명', type: 'string' } })
  originalName: string;

  @Property({ apiProperty: { description: '확장자', type: 'string' } })
  extension: string;

  @Property({ apiProperty: { description: '파일 url', type: 'string' } })
  url: string;

  constructor(props: MusicianEvidenceFileDTOProps) {
    this.id = props.id;
    this.originalName = props.originalName;
    this.extension = props.extension;
    this.url = props.url;
  }
}
