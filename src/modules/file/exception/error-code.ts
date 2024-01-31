import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const IMAGE_ERROR = {
  IMAGE_NOT_FOUND: '이미지를 찾을 수 없습니다.',
};

export const IMAGE_ERROR_CODE: ErrorCode<typeof IMAGE_ERROR> = {
  IMAGE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: IMAGE_ERROR.IMAGE_NOT_FOUND,
  },
};
