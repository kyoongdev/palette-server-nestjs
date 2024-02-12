import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { SocketException } from '../error/socket.exception';

@Catch(SocketException)
export class SocketExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: SocketException, host: ArgumentsHost) {
    const server = host.getArgByIndex<Socket>(0);

    server.emit('error', exception);
  }
}
