import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { Property } from '@/utils/swagger';

export interface ReviewReplyDTOProps {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  musician: CommonMusicianDTOProps;
}

export class ReviewReplyDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '내용', type: 'string' } })
  content: string;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '수정일', type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: ReviewReplyDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.musician = new CommonMusicianDTO(props.musician);
  }
}
