import { Property } from '@/utils/swagger';

export class JoinRoomDTO {
  @Property({
    apiProperty: { type: 'string', nullable: true, isCompodoc: true, description: '채팅방이 없을 경우 상대방 user id' },
  })
  opponentId?: string;

  @Property({
    apiProperty: { type: 'string', nullable: true, isCompodoc: true, description: '채팅방이 있을 경우 채팅방 id' },
  })
  roomId?: string;
}
