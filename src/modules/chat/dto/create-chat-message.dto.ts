import { Property } from '@/utils/swagger';

export interface CreateChatMessageDTOProps {
  content: string;
  chatRoomId: string;
}

export class CreateChatMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '메시지 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '채팅방 ID' } })
  chatRoomId: string;

  constructor(props?: CreateChatMessageDTOProps) {
    if (props) {
      this.content = props.content;
      this.chatRoomId = props.chatRoomId;
    }
  }
}
