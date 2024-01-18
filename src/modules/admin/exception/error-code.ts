import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const ADMIN_ERROR = {
  ADMIN_NOT_FOUND: '관리자가 존재하지 않습니다.',
};

export const ADMIN_ERROR_CODE: ErrorCode<typeof ADMIN_ERROR> = {
  ADMIN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ADMIN_ERROR.ADMIN_NOT_FOUND,
  },
};
