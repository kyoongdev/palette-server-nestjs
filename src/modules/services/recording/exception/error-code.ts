import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const RECORDING_ERROR = {
  RECORDING_NOT_FOUND: '레코딩을 찾을 수 없습니다.',
};

export const RECORDING_ERROR_CODE: ErrorCode<typeof RECORDING_ERROR> = {
  RECORDING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: RECORDING_ERROR.RECORDING_NOT_FOUND,
  },
};
