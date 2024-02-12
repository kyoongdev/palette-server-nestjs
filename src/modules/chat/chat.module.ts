import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRedisService } from './chat.redis';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatRepository, ChatService, ChatGateway, ChatRedisService],
  controllers: [ChatController],
})
export class ChatModule {}
