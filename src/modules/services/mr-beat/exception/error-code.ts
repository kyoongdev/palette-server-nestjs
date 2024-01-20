import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MR_BEAT_ERROR = {
  MR_BEAT_NOT_FOUND: 'MrBeat를 찾을 수 없습니다.',
};

export const MR_BEAT_ERROR_CODE: ErrorCode<typeof MR_BEAT_ERROR> = {
  MR_BEAT_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MR_BEAT_ERROR.MR_BEAT_NOT_FOUND,
  },
};
