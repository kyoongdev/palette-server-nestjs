import { ErrorCode } from '@/interface/exception.interface';
export declare const COMMON_ERROR: {
    readonly INTERNAL_SERVER_ERROR: "서버 실행중 오류가 발생했습니다.";
    readonly ENCRYPT_ERROR: "암호화 중 오류가 발생했습니다.";
};
export declare const COMMON_ERROR_CODE: ErrorCode<typeof COMMON_ERROR>;
