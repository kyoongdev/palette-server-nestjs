import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const GENRE_ERROR = {
  GENRE_NOT_FOUND: '장르를 찾을 수 없습니다.',
};
export const GENRE_ERROR_CODE: ErrorCode<typeof GENRE_ERROR> = {
  GENRE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: GENRE_ERROR.GENRE_NOT_FOUND,
  },
};
