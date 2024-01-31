import { HttpStatus } from '@nestjs/common';

import type { ErrorCode } from '@/interface/exception.interface';

export const LICENSE_ERROR = {
  LICENSE_NOT_FOUND: '라이센스를 찾을 수 없습니다.',
};

export const LICENSE_ERROR_CODE: ErrorCode<typeof LICENSE_ERROR> = {
  LICENSE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: LICENSE_ERROR.LICENSE_NOT_FOUND,
  },
};
