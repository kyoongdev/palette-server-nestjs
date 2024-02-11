import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatRepository, ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
