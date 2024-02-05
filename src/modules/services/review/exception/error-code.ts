import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const REVIEW_ERROR = {
  REVIEW_NOT_FOUND: '리뷰를 찾을 수 없습니다.',
  REVIEW_ALREADY_EXISTS: '리뷰가 이미 존재합니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 리뷰를 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '본인만 리뷰를 삭제할 수 있습니다.',
};

export const REVIEW_ERROR_CODE: ErrorCode<typeof REVIEW_ERROR> = {
  REVIEW_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REVIEW_ERROR.REVIEW_NOT_FOUND,
  },
  REVIEW_ALREADY_EXISTS: {
    code: HttpStatus.CONFLICT,
    message: REVIEW_ERROR.REVIEW_ALREADY_EXISTS,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: REVIEW_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: REVIEW_ERROR.ONLY_OWNER_CAN_DELETE,
  },
};
