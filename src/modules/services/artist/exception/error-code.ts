import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

const ARTIST_ERROR = {
  ARTIST_NOT_FOUND: '아티스트 정보를 찾을 수 없습니다.',
  ONLY_ONE_THUMBNAIL: '썸네일은 하나만 등록할 수 있습니다.',
  NO_THUMBNAIL: '썸네일을 등록해주세요.',
  IMAGE_ID_DUPLICATED: '이미지 아이디가 중복되었습니다.',
  LICENSE_ID_DUPLICATED: '라이센스 아이디가 중복되었습니다.',
  CONTACT_ID_DUPLICATED: '연락처 아이디가 중복되었습니다.',
  SALE_ID_DUPLICATED: '판매 아이디가 중복되었습니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '본인만 삭제할 수 있습니다.',
};

export const ARTIST_ERROR_CODE: ErrorCode<typeof ARTIST_ERROR> = {
  ARTIST_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: ARTIST_ERROR.ARTIST_NOT_FOUND,
  },
  ONLY_ONE_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: ARTIST_ERROR.ONLY_ONE_THUMBNAIL,
  },
  NO_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: ARTIST_ERROR.NO_THUMBNAIL,
  },
  IMAGE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: ARTIST_ERROR.IMAGE_ID_DUPLICATED,
  },
  CONTACT_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: ARTIST_ERROR.CONTACT_ID_DUPLICATED,
  },
  LICENSE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: ARTIST_ERROR.LICENSE_ID_DUPLICATED,
  },
  SALE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: ARTIST_ERROR.SALE_ID_DUPLICATED,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: ARTIST_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: ARTIST_ERROR.ONLY_OWNER_CAN_DELETE,
  },
};
