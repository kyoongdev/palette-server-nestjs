import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

const AUTH_ERROR = {
  WRONG_ACCESS_TOKEN: '잘못된 access 토큰입니다.',
  WRONG_REFRESH_TOKEN: '잘못된 refresh 토큰입니다.',
  WRONG_KEY: '잘못된 키입니다.',
  WRONG_ID: '잘못된 아이디입니다.',
  WRONG_ROLE: '잘못된 권한입니다.',
};

export const AUTH_ERROR_CODE: ErrorCode<typeof AUTH_ERROR> = {
  WRONG_ACCESS_TOKEN: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_ACCESS_TOKEN,
  },
  WRONG_REFRESH_TOKEN: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_REFRESH_TOKEN,
  },
  WRONG_KEY: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_KEY,
  },
  WRONG_ID: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_ID,
  },
  WRONG_ROLE: {
    code: HttpStatus.UNAUTHORIZED,
    message: AUTH_ERROR.WRONG_ROLE,
  },
};
