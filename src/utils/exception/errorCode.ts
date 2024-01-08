import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const COMMON_ERROR = {
  INTERNAL_SERVER_ERROR: '서버 실행중 오류가 발생했습니다.',
  ENCRYPT_ERROR: '암호화 중 오류가 발생했습니다.',
} as const;

export const COMMON_ERROR_CODE: ErrorCode<typeof COMMON_ERROR> = {
  INTERNAL_SERVER_ERROR: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: COMMON_ERROR.INTERNAL_SERVER_ERROR,
  },
  ENCRYPT_ERROR: {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: COMMON_ERROR.ENCRYPT_ERROR,
  },
};
