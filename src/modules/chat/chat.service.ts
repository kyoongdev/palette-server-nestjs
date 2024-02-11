import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { ChatRepository } from './chat.repository';
import { ChatRoomDTO } from './dto';
import { CHAT_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async findChatRooms(userId: string, paging: PagingDTO) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.chatRepository.countChatRooms({
      where: {
        userId,
      },
    });
    const chatRooms = await this.chatRepository.findChatRooms({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO(
      chatRooms.map((chatRoom) => ChatRoomDTO.fromFindChatRoom(userId, chatRoom.chatRoom)),
      { count, paging }
    );
  }

  async findChatMessages(chatRoomId: string, userId: string, paging: PagingDTO) {
    const chatRoom = await this.chatRepository.findChatRoom(chatRoomId);

    if (!chatRoom.userChatRooms.some((userChatRoom) => userChatRoom.userId === userId)) {
      throw new CustomException(CHAT_ERROR_CODE.ONLY_MY_CHAT_ROOM_MESSAGE_CAN_BE_READ);
    }

    const { skip, take } = paging.getSkipTake();
    const count = await this.chatRepository.countChatMessages({
      where: {
        chatRoomId,
      },
    });
    const chatMessages = await this.chatRepository.findChatMessages({
      where: {
        chatRoomId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });

    return new PaginationDTO(chatMessages, { count, paging });
  }
}
