import { UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  type OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { ClsService } from 'nestjs-cls';
import { Socket, Server as SocketIo } from 'socket.io';

import { WsReqUser } from '@/common/decorator/ws-user.decorator';
import { WSValidationPipe } from '@/common/error/socket.pipe';
import { SocketExceptionFilter } from '@/common/filter/socket-error.filter';
import { WsRoleGuard } from '@/common/guards/ws-role.guard';
import { WsAuthGuard } from '@/common/guards/ws.guard';
import { PrismaService } from '@/database/prisma.service';
import { RequestUser } from '@/interface/token.interface';
import { SocketPrisma, SocketPrismaDecorator } from '@/utils/aop/socket/prisma';
import { PRISMA_CLS_KEY } from '@/utils/aop/transaction/transaction';
import { ApplyCompodoc, CompodocBody, CompodocOperation, CompodocResponse } from '@/utils/compodoc/decorators';

import { UserService } from '../user/user.service';

import { ChatRedisService } from './chat.redis';
import { ChatService } from './chat.service';
import { JoinRoomDTO, ReceiveMessageDTO, SendMessageDTO } from './dto';
import { JoinedRoomDTO } from './dto/joined-room.dto';

@UseFilters(SocketExceptionFilter)
@UsePipes(WSValidationPipe)
@ApplyCompodoc('Chatting Socket API')
@WebSocketGateway(80, { namespace: 'chat', cors: '*' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: SocketIo;

  constructor(
    private readonly redisService: ChatRedisService,
    private readonly chatService: ChatService,
    private readonly wsAuthGuard: WsAuthGuard
  ) {}

  afterInit() {
    this.redisService.init();
    console.log('SOCKET ON!!');
  }

  async handleConnection(client: Socket) {
    try {
      const { isExist } = await this.wsAuthGuard.getUser(client.handshake.headers.authorization);

      await this.redisService.createClient(client.id, isExist.id);
    } catch (err) {
      client.emit('error', err);
    }
  }

  async handleDisconnect(client: Socket) {
    await this.redisService.deleteClient(client.id);
  }

  @SubscribeMessage('join')
  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  @CompodocOperation({ description: '채팅방에 입장할 때 사용합니다.' })
  @CompodocBody({ type: JoinRoomDTO })
  @CompodocResponse({ type: JoinedRoomDTO })
  @SocketPrisma()
  async joinRoom(@ConnectedSocket() client: Socket, @WsReqUser() user: RequestUser, @MessageBody() body: JoinRoomDTO) {
    const room = await this.chatService.joinRoom(user.id, body);
    client.emit('join', room);
  }

  @SubscribeMessage('leave')
  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  @SocketPrisma()
  async leaveRoom() {}

  @SubscribeMessage('deleteRoom')
  @SocketPrisma()
  async deleteRoom() {}

  @SubscribeMessage('sendMessage')
  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  @CompodocBody({ type: SendMessageDTO })
  @SocketPrisma()
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @WsReqUser() user: RequestUser,
    @MessageBody() body: SendMessageDTO
  ) {
    const opponent = await this.redisService.findClientByUserId(body.opponentId);

    await this.chatService.createMessage(user.id, body);

    if (opponent) {
      client.to(opponent.clientId).emit(
        'receiveMessage',
        new ReceiveMessageDTO({
          senderId: user.id,
          content: body.content,
          createdAt: new Date(),
        })
      );
    }
  }

  @SubscribeMessage('purchase')
  @UseGuards(WsAuthGuard, WsRoleGuard('USER'))
  @CompodocBody({ type: SendMessageDTO })
  @SocketPrisma()
  async sendMessage2(
    @ConnectedSocket() client: Socket,
    @WsReqUser() user: RequestUser,
    @MessageBody() body: SendMessageDTO
  ) {
    const opponent = await this.redisService.findClientByUserId(body.opponentId);

    if (opponent) {
      client.to(opponent.clientId).emit(
        'receiveMessage',
        new ReceiveMessageDTO({
          senderId: user.id,
          content: body.content,
          createdAt: new Date(),
        })
      );
    }
  }
}
