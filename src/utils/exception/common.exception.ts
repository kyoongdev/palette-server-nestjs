import { HttpException } from '@nestjs/common';

import { BaseErrorCode } from '@/interface/exception.interface';

export class CommonException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
