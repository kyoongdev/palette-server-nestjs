import { FindChatMessage } from '@/interface/chat.interface';
import { CommonUserDTO } from '@/modules/user/dto';
import { Property } from '@/utils/swagger';

export interface ChatMessageDTOProps {
  id: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
  chatRoomId: string;
  sender: CommonUserDTO;
}

export class ChatMessageDTO {
  @Property({ apiProperty: { type: 'string', description: '메시지 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '메시지 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '메시지 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'boolean', description: '읽음 여부' } })
  isRead: boolean;

  @Property({ apiProperty: { type: 'string', description: '채팅방 ID' } })
  chatRoomId: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '보낸 사람 정보' } })
  sender: CommonUserDTO;

  constructor(props: ChatMessageDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.isRead = props.isRead;
    this.chatRoomId = props.chatRoomId;
    this.sender = props.sender;
  }

  static fromFindChatMessage(data: FindChatMessage) {
    return new ChatMessageDTO({
      id: data.id,
      content: data.content,
      createdAt: data.createdAt,
      isRead: data.isRead,
      chatRoomId: data.chatRoomId,
      sender: CommonUserDTO.fromFindCommonUser(data.user),
    });
  }
}
