import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const FILE_ERROR = {
  IMAGE_NOT_FOUND: '이미지를 찾을 수 없습니다.',
  MUSIC_NOT_FOUND: '음악을 찾을 수 없습니다.',
};

export const FILE_ERROR_CODE: ErrorCode<typeof FILE_ERROR> = {
  IMAGE_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: FILE_ERROR.IMAGE_NOT_FOUND,
  },
  MUSIC_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: FILE_ERROR.MUSIC_NOT_FOUND,
  },
};
