import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
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

import { SocketException } from '@/common/error/socket.exception';
import { WSValidationPipe } from '@/common/error/socket.pipe';
import { SocketExceptionFilter } from '@/common/filter/socket-error.filter';

import { ChatRedisService } from './chat.redis';
import { JoinRoomDTO } from './dto';
import { SOCKET_ERROR_CODE } from './exception/error-code';

@UseFilters(SocketExceptionFilter)
@UsePipes(WSValidationPipe)
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
