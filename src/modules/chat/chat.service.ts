import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { SocketException } from '@/common/error/socket.exception';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { UserRepository } from '../user/user.repository';

import { ChatRepository } from './chat.repository';
import { ChatRoomDTO, JoinRoomDTO } from './dto';
import { CHAT_ERROR_CODE, SOCKET_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository
  ) {}

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

  async joinRoom(userId: string, data: JoinRoomDTO) {
    if (data.opponentId) {
      await this.userRepository.findUser(data.opponentId);

      const room = await this.chatRepository.createChatRoom({
        userChatRooms: {
          create: [
            {
              user: {
                connect: {
                  id: userId,
                },
              },
            },
            {
              user: {
                connect: {
                  id: data.opponentId,
                },
              },
            },
          ],
        },
      });
      return room;
    } else if (data.roomId) {
      const room = await this.chatRepository.findChatRoom(data.roomId);

      const isMyRoom = room.userChatRooms.find((userChatRoom) => userChatRoom.userId === userId);
      if (!isMyRoom) {
        throw new CustomException(SOCKET_ERROR_CODE.NOT_MY_ROOM);
      }
      return room;
    } else {
      throw new SocketException(SOCKET_ERROR_CODE.JOIN_ROOM_BODY);
    }
  }
}
