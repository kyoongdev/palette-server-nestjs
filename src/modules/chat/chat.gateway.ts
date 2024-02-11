import {
  MessageBody,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
  type OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server as SocketIo } from 'socket.io';

@WebSocketGateway(80, { namespace: 'chat', cors: '*' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: SocketIo;

  afterInit(server: SocketIo) {
    console.log('SOCKET ON!!');
  }

  handleConnection(client: SocketIo, ...args: any[]) {
    console.log('client connected');
  }

  handleDisconnect(client: SocketIo) {
    console.log('client disconnected');
  }

  @SubscribeMessage('chatToServer')
  handleMessage(client: SocketIo, @MessageBody() payload: any): void {
    console.log('TEST', { payload });
    this.server.emit('chatToClient', payload);
  }
}
