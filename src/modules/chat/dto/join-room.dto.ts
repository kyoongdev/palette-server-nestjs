import { Property } from '@/utils/swagger';

export class JoinRoomDTO {
  @Property({ apiProperty: { type: 'string' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string' } })
  roomId: string;
}
