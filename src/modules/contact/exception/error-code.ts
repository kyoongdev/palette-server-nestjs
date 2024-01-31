import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const CONTACT_ERROR = {
  CONTACT_NOT_FOUND: '연락 수단을 찾을 수 없습니다.',
};

export const CONTACT_ERROR_CODE: ErrorCode<typeof CONTACT_ERROR> = {
  CONTACT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: CONTACT_ERROR.CONTACT_NOT_FOUND,
  },
};
