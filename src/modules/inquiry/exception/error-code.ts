import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const INQUIRY_ERROR = {
  INQUIRY_NOT_FOUND: '문의사항을 찾을 수 없습니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '본인만 삭제할 수 있습니다.',
};

export const INQUIRY_ERROR_CODE: ErrorCode<typeof INQUIRY_ERROR> = {
  INQUIRY_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: INQUIRY_ERROR.INQUIRY_NOT_FOUND,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: INQUIRY_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: INQUIRY_ERROR.ONLY_OWNER_CAN_DELETE,
  },
};
