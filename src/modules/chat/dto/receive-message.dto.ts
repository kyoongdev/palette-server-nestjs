import { Property } from '@/utils/swagger';

export interface ReceiveMessageDTOProps {
  senderId: string;
  content: string;
  createdAt: Date;
}

export class ReceiveMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '보낸 사람의 ID', isCompodoc: true } })
  senderId: string;

  @Property({ apiProperty: { type: 'string', description: '메시지 내용', isCompodoc: true } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '메시지 생성 시간', isCompodoc: true } })
  createdAt: Date;

  constructor(props: ReceiveMessageDTOProps) {
    this.senderId = props.senderId;
    this.content = props.content;
    this.createdAt = props.createdAt;
  }
}
