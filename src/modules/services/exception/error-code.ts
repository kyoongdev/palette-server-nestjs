import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const SERVICE_ERROR = {
  SERVICE_NOT_FOUND: '서비스를 찾을 수 없습니다.',
  ONLY_OWNER_CAN_UPDATE: '서비스를 수정할 수 있는 권한이 없습니다.',
  ONLY_OWNER_CAN_DELETE: '서비스를 삭제할 수 있는 권한이 없습니다.',
  ONLY_AUTHORIZE_CAN_UPDATE: '승인된 서비스만 수정할 수 있습니다.',
};

export const SERVICE_ERROR_CODE: ErrorCode<typeof SERVICE_ERROR> = {
  SERVICE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: SERVICE_ERROR.SERVICE_NOT_FOUND,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: SERVICE_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: SERVICE_ERROR.ONLY_OWNER_CAN_DELETE,
  },
  ONLY_AUTHORIZE_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: SERVICE_ERROR.ONLY_AUTHORIZE_CAN_UPDATE,
  },
};
