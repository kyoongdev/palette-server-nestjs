import {
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  type OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { type Redis } from 'ioredis';
import { Socket, Server as SocketIo } from 'socket.io';

@WebSocketGateway(80, { namespace: 'chat', cors: '*' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: SocketIo;

  clients: string[] = [];
  constructor(@InjectRedis() private readonly client: Redis) {}

  afterInit(server: SocketIo) {
    console.log('SOCKET ON!!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('client connected', client.id);
    this.clients.push(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('client disconnected');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: Socket, @MessageBody() payload: any): void {
    console.log('TEST', { payload });
    // this.server.sockets..to(this.clients[0]).emit('chatToClient', payload);
  }
}
