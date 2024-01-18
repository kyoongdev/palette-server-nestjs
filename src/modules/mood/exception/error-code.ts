import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MOOD_ERROR = {
  MOOD_NOT_FOUND: '분위기를 찾을 수 없습니다.',
};
export const MOOD_ERROR_CODE: ErrorCode<typeof MOOD_ERROR> = {
  MOOD_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MOOD_ERROR.MOOD_NOT_FOUND,
  },
};
