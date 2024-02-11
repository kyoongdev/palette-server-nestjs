import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaDatabase } from '@/database/prisma.repository';
import { chatMessageInclude, chatRoomInclude } from '@/utils/constants/include/chat';

@Injectable()
export class ChatRepository {
  constructor(private readonly database: PrismaDatabase) {}

  async findChatRooms(args = {} as Prisma.ChatRoomFindManyArgs) {
    const { include, where, select, ...rest } = args;
    return this.database.getRepository().chatRoom.findMany({
      where,
      include: chatRoomInclude,
      ...rest,
    });
  }

  async findChatMessages(args = {} as Prisma.ChatMessageFindManyArgs) {
    const { include, where, select, ...rest } = args;
    return this.database.getRepository().chatMessage.findMany({
      where,
      include: chatMessageInclude,
      ...rest,
    });
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
