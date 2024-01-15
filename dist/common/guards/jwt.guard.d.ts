import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/database/prisma.service';
import { JwtProvider } from '../jwt/jwt';
export declare class JwtAuthGuard implements CanActivate {
    private readonly configService;
    private readonly jwt;
    private readonly database;
    constructor(configService: ConfigService, jwt: JwtProvider, database: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
