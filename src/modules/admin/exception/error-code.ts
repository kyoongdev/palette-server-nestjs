import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const ADMIN_ERROR = {
  ADMIN_NOT_FOUND: '관리자가 존재하지 않습니다.',
  ADMIN_ALREADY_EXIST: '관리자가 이미 존재합니다.',
  PASSWORD_NOT_EXIST: '비밀번호가 존재하지 않습니다.',
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_FORMAT_ERROR: '비밀번호 형식이 올바르지 않습니다.',
};

export const ADMIN_ERROR_CODE: ErrorCode<typeof ADMIN_ERROR> = {
  ADMIN_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ADMIN_ERROR.ADMIN_NOT_FOUND,
  },
  ADMIN_ALREADY_EXIST: {
    code: HttpStatus.CONFLICT,
    message: ADMIN_ERROR.ADMIN_ALREADY_EXIST,
  },
  PASSWORD_NOT_EXIST: {
    code: HttpStatus.NOT_FOUND,
    message: ADMIN_ERROR.PASSWORD_NOT_EXIST,
  },
  PASSWORD_NOT_MATCH: {
    code: HttpStatus.BAD_REQUEST,
    message: ADMIN_ERROR.PASSWORD_NOT_MATCH,
  },
  PASSWORD_FORMAT_ERROR: {
    code: HttpStatus.BAD_REQUEST,
    message: ADMIN_ERROR.PASSWORD_FORMAT_ERROR,
  },
};
