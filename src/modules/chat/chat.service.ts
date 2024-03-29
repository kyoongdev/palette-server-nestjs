import { Injectable } from '@nestjs/common';

import { CustomException } from '@/common/error/custom.exception';
import { SocketException } from '@/common/error/socket.exception';
import { Transactional } from '@/utils/aop/transaction/transaction';
import { PaginationDTO, PagingDTO } from '@/utils/pagination';

import { UserRepository } from '../user/user.repository';

import { ChatRepository } from './chat.repository';
import { ChatRoomDTO, JoinRoomDTO, SendMessageDTO } from './dto';
import { JoinedRoomDTO } from './dto/joined-room.dto';
import { CHAT_ERROR_CODE, SOCKET_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly userRepository: UserRepository
  ) {}

  async findUser(id: string) {
    try {
      const user = await this.userRepository.findUser(id);

      return user;
    } catch (err) {
      throw new SocketException(err);
    }
  }

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

  @Transactional()
  async joinRoom(userId: string, data: JoinRoomDTO) {
    if (data.opponentId) {
      await this.findUser(data.opponentId);

      const isExist = await this.chatRepository.checkChatRoomByUserAndOpponentId(userId, data.opponentId);

      if (isExist) {
        return new JoinedRoomDTO({ roomId: isExist.id });
      }

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
      return new JoinedRoomDTO({ roomId: room.id });
    } else if (data.roomId) {
      const room = await this.chatRepository.findChatRoom(data.roomId);

      const isMyRoom = room.userChatRooms.find((userChatRoom) => userChatRoom.userId === userId);
      if (!isMyRoom) {
        throw new CustomException(SOCKET_ERROR_CODE.NOT_MY_ROOM);
      }
      return new JoinedRoomDTO({ roomId: room.id });
    } else {
      throw new SocketException(SOCKET_ERROR_CODE.JOIN_ROOM_BODY);
    }
  }

  @Transactional()
  async deleteRoom(userId: string, roomId: string) {
    const room = await this.chatRepository.findChatRoom(roomId);

    const isMyRoom = room.userChatRooms.find((userChatRoom) => userChatRoom.userId === userId);
    if (!isMyRoom) {
      throw new CustomException(SOCKET_ERROR_CODE.NOT_MY_ROOM);
    }

    await this.chatRepository.deleteChatRoom(roomId);
  }

  @Transactional()
  async createMessage(userId: string, data: SendMessageDTO) {
    await this.findUser(data.opponentId);
    const room = await this.chatRepository.findChatRoom(data.roomId);

    const isMyRoom = room.userChatRooms.find((userChatRoom) => userChatRoom.userId === userId);
    if (!isMyRoom) {
      throw new CustomException(SOCKET_ERROR_CODE.NOT_MY_ROOM);
    }
    await this.chatRepository.createChatMessage({
      content: data.content,
      chatRoom: {
        connect: {
          id: data.roomId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }
}
