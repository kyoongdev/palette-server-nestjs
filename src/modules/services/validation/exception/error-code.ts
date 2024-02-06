import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

const VALIDATE_SERVICE_ERROR = {
  ONLY_ONE_THUMBNAIL: '썸네일은 하나만 등록할 수 있습니다.',
  NO_THUMBNAIL: '썸네일을 등록해주세요.',
  IMAGE_ID_DUPLICATED: '이미지 아이디가 중복되었습니다.',
  LICENSE_ID_DUPLICATED: '라이센스 아이디가 중복되었습니다.',
  CONTACT_ID_DUPLICATED: '연락처 아이디가 중복되었습니다.',
  SALE_ID_DUPLICATED: '판매 아이디가 중복되었습니다.',
  MUSIC_BEFORE_AFTER_COUNT: '음악의 before, after 파일은 1개씩 등록해야합니다.',
  MUSIC_COUNT: '음악은 2개 등록 가능합니다.',
  MUSIC_ID_DUPLICATE: '음악은 중복으로 등록할 수 없습니다.',
  REGION_SMALL_GROUP_NOT_MATCH: '지역 대그룹에 소그룹이 없습니다.',
};

export const VALIDATE_SERVICE_ERROR_CODE: ErrorCode<typeof VALIDATE_SERVICE_ERROR> = {
  ONLY_ONE_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.ONLY_ONE_THUMBNAIL,
  },
  NO_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.NO_THUMBNAIL,
  },
  IMAGE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.IMAGE_ID_DUPLICATED,
  },
  CONTACT_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.CONTACT_ID_DUPLICATED,
  },
  LICENSE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.LICENSE_ID_DUPLICATED,
  },
  SALE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.SALE_ID_DUPLICATED,
  },
  MUSIC_BEFORE_AFTER_COUNT: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.MUSIC_BEFORE_AFTER_COUNT,
  },
  MUSIC_COUNT: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.MUSIC_COUNT,
  },
  MUSIC_ID_DUPLICATE: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.MUSIC_ID_DUPLICATE,
  },
  REGION_SMALL_GROUP_NOT_MATCH: {
    code: HttpStatus.BAD_REQUEST,
    message: VALIDATE_SERVICE_ERROR.REGION_SMALL_GROUP_NOT_MATCH,
  },
};
