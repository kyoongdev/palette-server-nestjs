import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CustomException } from '@/common/error/custom.exception';
import { PrismaDatabase } from '@/database/prisma.repository';
import { chatMessageInclude, chatRoomInclude } from '@/utils/constants/include/chat';

import { CHAT_ERROR_CODE } from './exception/error-code';

@Injectable()
export class ChatRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findChatRoom(id: string) {
    const chatRoom = this.database.getRepository().chatRoom.findUnique({
      where: {
        id,
      },
      include: chatRoomInclude,
    });

    if (!chatRoom) {
      throw new CustomException(CHAT_ERROR_CODE.CHAT_ROOM_NOT_FOUND);
    }

    return chatRoom;
  }

  async findChatRooms(args = {} as Prisma.UserChatRoomFindManyArgs) {
    const { include, where, select, ...rest } = args;
    const chatRooms = this.database.getRepository().userChatRoom.findMany({
      where,
      include: {
        chatRoom: {
          include: chatRoomInclude,
        },
      },
      ...rest,
    });

    return chatRooms;
  }

  async countChatRooms(args = {} as Prisma.UserChatRoomCountArgs) {
    return this.database.getRepository().userChatRoom.count(args);
  }

  async findChatMessages(args = {} as Prisma.ChatMessageFindManyArgs) {
    const { include, where, select, ...rest } = args;
    return this.database.getRepository().chatMessage.findMany({
      where,
      include: chatMessageInclude,
      ...rest,
    });
  }

  async countChatMessages(args = {} as Prisma.ChatMessageCountArgs) {
    return this.database.getRepository().chatMessage.count(args);
  }

  async createChatRoom(data = {} as Prisma.ChatRoomCreateInput) {
    return this.database.getRepository().chatRoom.create({ data });
  }

  async createChatMessage(data = {} as Prisma.ChatMessageCreateInput) {
    return this.database.getRepository().chatMessage.create({ data });
  }

  async updateChatRoom(id: string, data: Prisma.ChatRoomUpdateInput) {
    return this.database.getRepository().chatRoom.update({
      where: {
        id,
      },
      data,
    });
  }

  async updateChatMessage(id: string, data: Prisma.ChatMessageUpdateInput) {
    return this.database.getRepository().chatMessage.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteChatRoom(id: string) {
    return this.database.getRepository().chatRoom.delete({
      where: {
        id,
      },
    });
  }

  async deleteChatMessage(id: string) {
    return this.database.getRepository().chatMessage.delete({
      where: {
        id,
      },
    });
  }
}
