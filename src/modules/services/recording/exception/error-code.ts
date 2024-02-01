import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const RECORDING_ERROR = {
  RECORDING_NOT_FOUND: '레코딩을 찾을 수 없습니다.',
  NO_THUMBNAIL: '썸네일을 등록해주세요.',
  IMAGE_ID_DUPLICATED: '이미지 아이디가 중복되었습니다.',
  LICENSE_ID_DUPLICATED: '라이센스 아이디가 중복되었습니다.',
  ONLY_OWNER_CAN_UPDATE: '소유자만 수정할 수 있습니다.',
  ONLY_ONE_THUMBNAIL: '썸네일은 하나만 등록할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '소유자만 삭제할 수 있습니다.',
  REGION_SMALL_GROUP_NOT_MATCH: '지역 대그룹에 소그룹이 없습니다.',
};

export const RECORDING_ERROR_CODE: ErrorCode<typeof RECORDING_ERROR> = {
  RECORDING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: RECORDING_ERROR.RECORDING_NOT_FOUND,
  },
  IMAGE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: RECORDING_ERROR.IMAGE_ID_DUPLICATED,
  },
  NO_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: RECORDING_ERROR.NO_THUMBNAIL,
  },
  LICENSE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: RECORDING_ERROR.LICENSE_ID_DUPLICATED,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: RECORDING_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_ONE_THUMBNAIL: {
    code: HttpStatus.BAD_REQUEST,
    message: RECORDING_ERROR.ONLY_ONE_THUMBNAIL,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: RECORDING_ERROR.ONLY_OWNER_CAN_DELETE,
  },
  REGION_SMALL_GROUP_NOT_MATCH: {
    code: HttpStatus.NOT_FOUND,
    message: RECORDING_ERROR.REGION_SMALL_GROUP_NOT_MATCH,
  },
};
