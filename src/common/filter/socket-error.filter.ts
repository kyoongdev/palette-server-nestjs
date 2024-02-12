import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { SocketException } from '../error/socket.exception';

@Catch(WsException)
export class SocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: SocketException, host: ArgumentsHost) {
    const server = host.getArgByIndex<Socket>(0);
    const { message, path, code } = exception;

    server.emit('error', { message, path, code });
  }
}
