import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const REVIEW_ERROR = {
  REVIEW_NOT_FOUND: '리뷰를 찾을 수 없습니다.',
};

export const REVIEW_ERROR_CODE: ErrorCode<typeof REVIEW_ERROR> = {
  REVIEW_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.REVIEW_NOT_FOUND,
  },
};
