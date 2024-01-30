import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

const ARTIST_ERROR = {
  ARTIST_NOT_FOUND: '아티스트 정보를 찾을 수 없습니다.',
};

export const ARTIST_ERROR_CODE: ErrorCode<typeof ARTIST_ERROR> = {
  ARTIST_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ARTIST_ERROR.ARTIST_NOT_FOUND,
  },
};
