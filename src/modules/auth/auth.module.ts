import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EncryptProvider } from '@/utils/encrypt';
import { SocialLoginModule } from '@/utils/social/social.module';

import { UserRepository } from '../user/user.repository';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const config = new ConfigService();

@Module({
  imports: [
    SocialLoginModule.forRoot({
      google: {
        clientId: config.get<string>('GOOGLE_CLIENT_ID'),
        clientSecret: config.get<string>('GOOGLE_CLIENT_SECRET'),
        redirectUri: config.get<string>('GOOGLE_REDIRECT_URI'),
      },
      kakao: {
        adminKey: config.get<string>('KAKAO_ADMIN_KEY'),
        redirectUrl: config.get<string>('KAKAO_REDIRECT_URL'),
        restKey: config.get<string>('KAKAO_REST_KEY'),
        secretKey: config.get<string>('KAKAO_SECRET_KEY'),
      },
      naver: {
        clientId: config.get<string>('NAVER_CLIENT_ID'),
        clientSecret: config.get<string>('NAVER_CLIENT_SECRET'),
        redirectUrl: config.get<string>('NAVER_REDIRECT_URI'),
      },
    }),
  ],
  providers: [AuthService, UserRepository, EncryptProvider],
  controllers: [AuthController],
})
export class AuthModule {}
