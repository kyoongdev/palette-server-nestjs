import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

const ALBUM_ART_ERROR = {
  ALBUM_ART_NOT_FOUND: '앨범 아트 정보를 찾을 수 없습니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '본인만 삭제할 수 있습니다.',
  ONLY_AUTHORIZE_CAN_UPDATE: '승인된 앨범 아트만 수정할 수 있습니다.',
};

export const ALBUM_ART_ERROR_CODE: ErrorCode<typeof ALBUM_ART_ERROR> = {
  ALBUM_ART_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ALBUM_ART_ERROR.ALBUM_ART_NOT_FOUND,
  },

  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: ALBUM_ART_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: ALBUM_ART_ERROR.ONLY_OWNER_CAN_DELETE,
  },
  ONLY_AUTHORIZE_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: ALBUM_ART_ERROR.ONLY_AUTHORIZE_CAN_UPDATE,
  },
};
