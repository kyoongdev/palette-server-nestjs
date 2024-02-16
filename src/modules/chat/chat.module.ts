import { Module } from '@nestjs/common';

import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRedisService } from './chat.redis';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatRepository, ChatService, ChatGateway, ChatRedisService, UserRepository],
  controllers: [ChatController],
})
export class ChatModule {}
