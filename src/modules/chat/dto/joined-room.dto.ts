import { Property } from '@/utils/swagger';

export class JoinedRoomDTO {
  @Property({
    apiProperty: { type: 'string', nullable: true, isCompodoc: true, description: '채팅방 id' },
  })
  roomId: string;
}
