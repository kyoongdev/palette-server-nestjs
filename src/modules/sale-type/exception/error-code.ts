import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const SALE_TYPE_ERROR = {
  SALE_TYPE_NOT_FOUND: '판매 유형을 찾을 수 없습니다.',
};

export const SALE_TYPE_ERROR_CODE: ErrorCode<typeof SALE_TYPE_ERROR> = {
  SALE_TYPE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SALE_TYPE_ERROR.SALE_TYPE_NOT_FOUND,
  },
};
