import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const REGION_ERROR = {
  LARGE_GROUP_NOT_FOUND: '지역 대그룹을 찾을 수 없습니다.',
  SMALL_GROUP_NOT_FOUND: '지역 소그룹을 찾을 수 없습니다.',
};

export const REGION_ERROR_CODE: ErrorCode<typeof REGION_ERROR> = {
  LARGE_GROUP_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REGION_ERROR.LARGE_GROUP_NOT_FOUND,
  },
  SMALL_GROUP_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: REGION_ERROR.SMALL_GROUP_NOT_FOUND,
  },
};
