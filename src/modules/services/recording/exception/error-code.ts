import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const RECORDING_ERROR = {
  RECORDING_NOT_FOUND: '레코딩을 찾을 수 없습니다.',
  ONLY_AUTHORIZE_CAN_UPDATE: '승인된 녹음만 수정할 수 있습니다.',
  ONLY_ONE_THUMBNAIL: '썸네일은 하나만 등록할 수 있습니다.',
  ONLY_OWNER_CAN_UPDATE: '소유자만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '소유자만 삭제할 수 있습니다.',
};

export const RECORDING_ERROR_CODE: ErrorCode<typeof RECORDING_ERROR> = {
  RECORDING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: RECORDING_ERROR.RECORDING_NOT_FOUND,
  },
  ONLY_AUTHORIZE_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: RECORDING_ERROR.ONLY_AUTHORIZE_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: RECORDING_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_ONE_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: RECORDING_ERROR.ONLY_ONE_THUMBNAIL,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: RECORDING_ERROR.ONLY_OWNER_CAN_DELETE,
  },
};
