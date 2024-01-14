import { HttpException } from '@nestjs/common';
import { BaseErrorCode } from '@/interface/exception.interface';
export declare class CommonException extends HttpException {
    constructor(error: BaseErrorCode);
}
