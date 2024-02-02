import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from '@/interface/exception.interface';

export const MIX_MASTERING_ERROR = {
  MIX_MASTERING_NOT_FOUND: '믹스마스터링 정보를 찾을 수 없습니다.',
  MUSIC_BEFORE_AFTER_COUNT: '음악의 before, after 파일은 1개씩 등록해야합니다.',
  MUSIC_COUNT: '음악은 2개 등록 가능합니다.',
  MUSIC_ID_DUPLICATE: '음악은 중복으로 등록할 수 없습니다.',
  CONTACT_ID_DUPLICATED: '연락수단은 중복으로 등록할 수 없습니다.',
  LICENSE_ID_DUPLICATED: '라이센스는 중복으로 등록할 수 없습니다.',
  ONLY_OWNER_CAN_UPDATE: '본인만 수정할 수 있습니다.',
  ONLY_OWNER_CAN_DELETE: '본인만 삭제할 수 있습니다.',
};

export const MIX_MASTERING_ERROR_CODE: ErrorCode<typeof MIX_MASTERING_ERROR> = {
  MIX_MASTERING_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: MIX_MASTERING_ERROR.MIX_MASTERING_NOT_FOUND,
  },
  MUSIC_BEFORE_AFTER_COUNT: {
    code: HttpStatus.BAD_REQUEST,
    message: MIX_MASTERING_ERROR.MUSIC_BEFORE_AFTER_COUNT,
  },
  MUSIC_COUNT: {
    code: HttpStatus.BAD_REQUEST,
    message: MIX_MASTERING_ERROR.MUSIC_COUNT,
  },
  MUSIC_ID_DUPLICATE: {
    code: HttpStatus.BAD_REQUEST,
    message: MIX_MASTERING_ERROR.MUSIC_ID_DUPLICATE,
  },
  CONTACT_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: MIX_MASTERING_ERROR.CONTACT_ID_DUPLICATED,
  },
  LICENSE_ID_DUPLICATED: {
    code: HttpStatus.BAD_REQUEST,
    message: MIX_MASTERING_ERROR.LICENSE_ID_DUPLICATED,
  },
  ONLY_OWNER_CAN_UPDATE: {
    code: HttpStatus.FORBIDDEN,
    message: MIX_MASTERING_ERROR.ONLY_OWNER_CAN_UPDATE,
  },
  ONLY_OWNER_CAN_DELETE: {
    code: HttpStatus.FORBIDDEN,
    message: MIX_MASTERING_ERROR.ONLY_OWNER_CAN_DELETE,
  },
};
