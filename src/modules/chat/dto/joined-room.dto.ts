import { Property } from '@/utils/swagger';

interface JoinedRoomDTOProps {
  roomId: string;
}

export class JoinedRoomDTO {
  @Property({
    apiProperty: { type: 'string', nullable: true, isCompodoc: true, description: '채팅방 id' },
  })
  roomId: string;

  constructor(props: JoinedRoomDTOProps) {
    this.roomId = props.roomId;
  }
}
