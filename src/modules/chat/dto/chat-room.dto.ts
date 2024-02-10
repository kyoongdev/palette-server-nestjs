import { FindChatRoom } from '@/interface/chat.interface';
import { CommonUserDTO, CommonUserDTOProps } from '@/modules/user/dto';
import { Property } from '@/utils/swagger';

import { ChatMessageDTO } from './chat-message.dto';

export interface ChatRoomDTOProps {
  id: string;
  opponent: CommonUserDTO;
  recentMessage: ChatMessageDTO;
  createdAt: Date;
}

export class ChatRoomDTO {
  @Property({ apiProperty: { type: 'string', description: '채팅방 ID' } })
  id: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '상대방 정보' } })
  opponent: CommonUserDTO;

  @Property({ apiProperty: { type: ChatMessageDTO, description: '최근 메시지' } })
  recentMessage: ChatMessageDTO;

  @Property({ apiProperty: { type: 'string', description: '채팅방 생성일' } })
  createdAt: Date;

  constructor(props: ChatRoomDTOProps) {
    this.id = props.id;
    this.opponent = props.opponent;
    this.recentMessage = props.recentMessage;
    this.createdAt = props.createdAt;
  }

  static fromFindChatRoom(userId: string, data: FindChatRoom) {
    return new ChatRoomDTO({
      id: data.id,
      opponent: CommonUserDTO.fromFindCommonUser(
        data.userChatRooms.find((userChatRoom) => userChatRoom.userId !== userId)?.user
      ),
      recentMessage: ChatMessageDTO.fromFindChatMessage(data.messages[0]),
      createdAt: data.createdAt,
    });
  }
}
