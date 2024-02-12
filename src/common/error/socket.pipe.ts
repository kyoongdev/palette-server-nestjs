import { Injectable, ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

import { ValidationError } from 'class-validator';

import { SocketException } from './socket.exception';

@Injectable()
export class WSValidationPipe extends ValidationPipe {
  createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new WsException({ status: 500, message: 'SOCKET ERROR' });
      }
      const errors = this.flattenValidationErrors(validationErrors);

      return new SocketException({
        code: this.errorHttpStatusCode,
        message: errors[0],
        path: 'socket',
      });
    };
  }
}
