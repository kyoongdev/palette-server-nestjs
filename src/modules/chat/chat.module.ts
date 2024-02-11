import { Module } from '@nestjs/common';

import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
  providers: [ChatRepository, ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
