import { Module } from '@nestjs/common';

import { WsAuthGuard } from '@/common/guards/ws.guard';
import { SocketPrismaDecorator } from '@/utils/aop/socket/prisma';

import { UserRepository } from '../user/user.repository';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRedisService } from './chat.redis';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  providers: [
    ChatRepository,
    ChatService,
    ChatGateway,
    ChatRedisService,
    UserRepository,
    SocketPrismaDecorator,
    WsAuthGuard,
  ],
  controllers: [ChatController],
})
export class ChatModule {}
