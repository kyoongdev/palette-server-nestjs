import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MIX_MASTERING_ERROR = {
  MIX_MASTERING_NOT_FOUND: '믹스마스터링 정보를 찾을 수 없습니다.',
};

export const MIX_MASTERING_ERROR_CODE: ErrorCode<typeof MIX_MASTERING_ERROR> = {
  MIX_MASTERING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MIX_MASTERING_ERROR.MIX_MASTERING_NOT_FOUND,
  },
};
