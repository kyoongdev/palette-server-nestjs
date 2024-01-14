import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtProvider } from '../jwt/jwt';
export declare class JwtAuthGuard implements CanActivate {
    private readonly configService;
    private readonly jwt;
    constructor(configService: ConfigService, jwt: JwtProvider);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
