import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
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

import { WsReqUser } from '@/common/decorator/ws-user.decorator';
import { WSValidationPipe } from '@/common/error/socket.pipe';
import { SocketExceptionFilter } from '@/common/filter/socket-error.filter';
import { WsRoleGuard } from '@/common/guards/ws-role.guard';
import { WsAuthGuard } from '@/common/guards/ws.guard';
import { ApplyCompodoc, CompodocBody, CompodocOperation, CompodocResponse } from '@/utils/compodoc/decorators';

import { UserService } from '../user/user.service';

import { ChatRedisService } from './chat.redis';
import { ChatService } from './chat.service';
import { JoinRoomDTO } from './dto';

@UseFilters(SocketExceptionFilter)
@UsePipes(WSValidationPipe)
@ApplyCompodoc('Chatting Socket API')
@WebSocketGateway(80, { namespace: 'chat', cors: '*' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: SocketIo;

  constructor(
    private readonly redisService: ChatRedisService,
    private readonly chatService: ChatService
  ) {}

  afterInit() {
    console.log('SOCKET ON!!');
  }

  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  async handleConnection(client: Socket, ...args: any[]) {
    await this.redisService.createClient(client.id);
  }

  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  async handleDisconnect(client: Socket) {
    await this.redisService.deleteClient(client.id);
  }

  @SubscribeMessage('join')
  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  @CompodocOperation({ description: '채팅방에 입장할 때 사용합니다.' })
  @CompodocBody({ type: JoinRoomDTO })
  @CompodocResponse({ type: JoinRoomDTO })
  async joinRoom(@WsReqUser() user: any, @MessageBody() body: JoinRoomDTO) {}

  @SubscribeMessage('deleteRoom')
  async deleteRoom() {}

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() payload: any) {
    console.log('TEST', { payload });
    // this.server.sockets..to(this.clients[0]).emit('chatToClient', payload);
  }
}
