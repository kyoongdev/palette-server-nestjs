import { ConfigService } from '@nestjs/config';
import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
import type { TokenPayloadProps } from '@/interface/token.interface';
import { TokenDTO } from '@/modules/auth/dto';
export declare class JwtProvider {
    private readonly configService;
    private readonly accessTokenExpiresIn;
    private readonly refreshTokenExpiresIn;
    constructor(configService: ConfigService);
    signJwt<T extends object>(value: T, options?: SignOptions): string | any;
    verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any;
    createTokens<T extends TokenPayloadProps>(value: T, options?: SignOptions): Promise<TokenDTO>;
}
