import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MUSICIAN_ERROR = {
  MUSICIAN_NOT_FOUND: '뮤지션을 찾을 수 없습니다.',
};

export const MUSICIAN_ERROR_CODE: ErrorCode<typeof MUSICIAN_ERROR> = {
  MUSICIAN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MUSICIAN_ERROR.MUSICIAN_NOT_FOUND,
  },
};
