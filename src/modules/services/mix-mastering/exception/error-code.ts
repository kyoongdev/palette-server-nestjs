import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MIX_MASTERING_ERROR = {
  MIX_MASTERING_NOT_FOUND: '믹스마스터링 정보를 찾을 수 없습니다.',
  ONLY_AUTHORIZE_CAN_UPDATE: '승인된 믹스 마스터링만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '본인만 삭제할 수 있습니다.',
};

export const MIX_MASTERING_ERROR_CODE: ErrorCode<typeof MIX_MASTERING_ERROR> = {
  MIX_MASTERING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MIX_MASTERING_ERROR.MIX_MASTERING_NOT_FOUND,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: MIX_MASTERING_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: MIX_MASTERING_ERROR.ONLY_OWNER_CAN_DELETE,
  },
  ONLY_AUTHORIZE_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: MIX_MASTERING_ERROR.ONLY_AUTHORIZE_CAN_UPDATE,
  },
};
