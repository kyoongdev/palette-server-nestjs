"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_ERROR_CODE = exports.COMMON_ERROR = void 0;
const common_1 = require("@nestjs/common");
exports.COMMON_ERROR = {
    INTERNAL_SERVER_ERROR: '서버 실행중 오류가 발생했습니다.',
    ENCRYPT_ERROR: '암호화 중 오류가 발생했습니다.',
};
exports.COMMON_ERROR_CODE = {
    INTERNAL_SERVER_ERROR: {
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message: exports.COMMON_ERROR.INTERNAL_SERVER_ERROR,
    },
    ENCRYPT_ERROR: {
        code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        message: exports.COMMON_ERROR.ENCRYPT_ERROR,
    },
};
//# sourceMappingURL=errorCode.js.map