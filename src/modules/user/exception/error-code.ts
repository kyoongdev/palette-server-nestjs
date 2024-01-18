import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from '@/interface/exception.interface';

const USER_ERROR = {
  USER_NOT_FOUND: '유저를 찾을 수 없습니다.',
  SOCIAL_USER_NOT_FOUND: '해당 소셜 ID에 해당하는 유저가 없습니다.',
  USER_ALREADY_EXIST: '이미 존재하는 유저입니다.',
  HARD_DELETE_FAILED: '유저를 삭제하는데 실패했습니다.(아직 탈퇴하지 않은 회원입니다.)',
  USER_ALREADY_BLOCKED: '이미 차단된 유저입니다.',
  USER_BLOCKED: '차단된 유저입니다.',
  PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
  PASSWORD_FORMAT_ERROR: '비밀번호는 8~16자의 영문, 숫자, 특수문자 조합이어야 합니다.',
  PASSWORD_NOT_EXIST: '비밀번호가 존재하지 않습니다.',
};

export const USER_ERROR_CODE: ErrorCode<typeof USER_ERROR> = {
  USER_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: USER_ERROR.USER_NOT_FOUND,
  },
  SOCIAL_USER_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: USER_ERROR.SOCIAL_USER_NOT_FOUND,
  },
  USER_ALREADY_EXIST: {
    code: HttpStatus.CONFLICT,
    message: USER_ERROR.USER_ALREADY_EXIST,
  },
  HARD_DELETE_FAILED: {
    code: HttpStatus.BAD_REQUEST,
    message: USER_ERROR.HARD_DELETE_FAILED,
  },
  USER_ALREADY_BLOCKED: {
    code: HttpStatus.CONFLICT,
    message: USER_ERROR.USER_ALREADY_BLOCKED,
  },
  USER_BLOCKED: {
    code: HttpStatus.FORBIDDEN,
    message: USER_ERROR.USER_BLOCKED,
  },
  PASSWORD_NOT_MATCH: {
    code: HttpStatus.BAD_REQUEST,
    message: USER_ERROR.PASSWORD_NOT_MATCH,
  },
  PASSWORD_FORMAT_ERROR: {
    code: HttpStatus.BAD_REQUEST,
    message: USER_ERROR.PASSWORD_FORMAT_ERROR,
  },
  PASSWORD_NOT_EXIST: {
    code: HttpStatus.BAD_REQUEST,
    message: USER_ERROR.PASSWORD_NOT_EXIST,
  },
};
