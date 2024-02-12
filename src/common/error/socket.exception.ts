import { WsException } from '@nestjs/websockets';

import type { BaseSocketErrorCode } from '@/interface/exception.interface';

export class SocketException extends WsException {
  path: string;
  code: number;

  constructor(props: BaseSocketErrorCode) {
    super(props);
    this.code = props.code;
    this.path = props.path;
  }
}
