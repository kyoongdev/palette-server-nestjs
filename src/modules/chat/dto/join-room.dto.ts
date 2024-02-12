import { Property } from '@/utils/swagger';

export class JoinRoomDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  roomId: string;
}
