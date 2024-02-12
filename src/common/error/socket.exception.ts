import { WsException } from '@nestjs/websockets';

import type { BaseSocketErrorCode } from '@/interface/exception.interface';

export class SocketException extends WsException {
  path: string;

  constructor(props: BaseSocketErrorCode) {
    super(props);
    this.path = props.path;
  }
}
