import { UseFilters, UsePipes } from '@nestjs/common';
import {
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  type OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server as SocketIo } from 'socket.io';

import { WSValidationPipe } from '@/common/error/socket.pipe';
import { SocketExceptionFilter } from '@/common/filter/socket-error.filter';
import { ApplyCommonDoc, CommonDocBody, CommonDocResponse } from '@/utils/compodoc/decorators';

import { ChatRedisService } from './chat.redis';
import { JoinRoomDTO } from './dto';

@UseFilters(SocketExceptionFilter)
@UsePipes(WSValidationPipe)
@ApplyCommonDoc('Chatting Socket API')
@WebSocketGateway(80, { namespace: 'chat', cors: '*' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: SocketIo;

  constructor(private readonly redisService: ChatRedisService) {}

  afterInit(server: SocketIo) {
    console.log('SOCKET ON!!');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    await this.redisService.createClient(client.id);
  }

  async handleDisconnect(client: Socket) {
    await this.redisService.deleteClient(client.id);
  }

  @SubscribeMessage('join')
  @CommonDocBody({ type: JoinRoomDTO })
  @CommonDocResponse({ type: JoinRoomDTO })
  async joinRoom(@MessageBody() body: JoinRoomDTO) {
    console.log(body);
  }

  @SubscribeMessage('leave')
  async leaveRoom() {}

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() payload: any) {
    console.log('TEST', { payload });
    // this.server.sockets..to(this.clients[0]).emit('chatToClient', payload);
  }
}
