import { HttpStatus } from '@nestjs/common';

import { ErrorCode, SocketErrorCode } from '@/interface/exception.interface';

export const CHAT_ERROR = {
  ONLY_MY_CHAT_ROOM_MESSAGE_CAN_BE_READ: '나의 채팅방 메시지만 읽을 수 있습니다.',
  CHAT_ROOM_NOT_FOUND: '채팅방을 찾을 수 없습니다.',
};

export const CHAT_ERROR_CODE: ErrorCode<typeof CHAT_ERROR> = {
  ONLY_MY_CHAT_ROOM_MESSAGE_CAN_BE_READ: {
    code: HttpStatus.FORBIDDEN,
    message: CHAT_ERROR.ONLY_MY_CHAT_ROOM_MESSAGE_CAN_BE_READ,
  },
  CHAT_ROOM_NOT_FOUND: {
    code: HttpStatus.NOT_FOUND,
    message: CHAT_ERROR.CHAT_ROOM_NOT_FOUND,
  },
};

export const SOCKET_ERROR = {
  JOIN_ROOM_BODY: '채팅방 입장 요청이 잘못되었습니다.',
  NOT_MY_ROOM: '내 채팅방이 아닙니다.',
};

export const SOCKET_ERROR_CODE: SocketErrorCode<typeof SOCKET_ERROR> = {
  JOIN_ROOM_BODY: {
    code: HttpStatus.BAD_REQUEST,
    message: SOCKET_ERROR.JOIN_ROOM_BODY,
    path: 'join',
  },
  NOT_MY_ROOM: {
    code: HttpStatus.FORBIDDEN,
    message: SOCKET_ERROR.NOT_MY_ROOM,
    path: 'join',
  },
};
