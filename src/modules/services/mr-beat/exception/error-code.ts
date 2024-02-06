import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MR_BEAT_ERROR = {
  MR_BEAT_NOT_FOUND: 'MrBeat를 찾을 수 없습니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 수정할 수 있습니다.',
  ONLY_AUTHORIZE_CAN_UPDATE: '승인된 MrBeat만 수정할 수 있습니다.',
};

export const MR_BEAT_ERROR_CODE: ErrorCode<typeof MR_BEAT_ERROR> = {
  MR_BEAT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MR_BEAT_ERROR.MR_BEAT_NOT_FOUND,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: MR_BEAT_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_AUTHORIZE_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: MR_BEAT_ERROR.ONLY_AUTHORIZE_CAN_UPDATE,
  },
};
