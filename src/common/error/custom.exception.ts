import { HttpException } from '@nestjs/common';

import { BaseErrorCode } from '@/interface/exception.interface';

export class CustomException extends HttpException {
  constructor(error: BaseErrorCode) {
    super(error.message, error.code);
  }
}
