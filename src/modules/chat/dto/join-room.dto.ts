import { CompodocProperty } from '@/utils/compodoc/decorators';
import { Property } from '@/utils/swagger';

export class JoinRoomDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, isCompodoc: true } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, isCompodoc: true } })
  roomId: string;
}
