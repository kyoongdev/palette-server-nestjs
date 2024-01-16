import { HttpException } from '@nestjs/common';

import type { BaseErrorCode } from '@/interface/exception.interface';

export class UserException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
