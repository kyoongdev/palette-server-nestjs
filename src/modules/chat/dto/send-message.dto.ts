import { Property } from '@/utils/swagger';

export class SendMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '메세지 내용', isCompodoc: true } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '채팅방 id', isCompodoc: true } })
  roomId: string;

  @Property({ apiProperty: { type: 'string', description: '상대방 id', isCompodoc: true } })
  opponentId: string;
}
