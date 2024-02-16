import { Module } from '@nestjs/common';

import { SocketPrismaDecorator } from '@/utils/aop/socket/prisma';

import { UserRepository } from '../user/user.repository';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRedisService } from './chat.redis';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatRepository, ChatService, ChatGateway, ChatRedisService, UserRepository, SocketPrismaDecorator],
  controllers: [ChatController],
})
export class ChatModule {}
