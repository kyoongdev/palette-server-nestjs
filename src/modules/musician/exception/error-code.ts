import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MUSICIAN_ERROR = {
  MUSICIAN_NOT_FOUND: '뮤지션을 찾을 수 없습니다.',
  ALREADY_APPROVED: '이미 승인된 뮤지션입니다.',
};

export const MUSICIAN_ERROR_CODE: ErrorCode<typeof MUSICIAN_ERROR> = {
  MUSICIAN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MUSICIAN_ERROR.MUSICIAN_NOT_FOUND,
  },
  ALREADY_APPROVED: {
    code: HttpStatus.CONFLICT,
    message: MUSICIAN_ERROR.ALREADY_APPROVED,
  },
};
