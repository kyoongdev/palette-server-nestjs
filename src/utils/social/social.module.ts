import { DynamicModule, Module, Provider } from '@nestjs/common';

import type { GoogleConfig, KakaoConfig, NaverConfig, SocialConfig } from '@/interface/social.interface';

import { GOOGLE_CONFIG, KAKAO_CONFIG, NAVER_CONFIG } from './constant';
import { GoogleLogin } from './google';
import { KakaoLogin } from './kakao';
import { NaverLogin } from './naver';

@Module({
  providers: [KakaoLogin, GoogleLogin, NaverLogin],
  exports: [KakaoLogin, GoogleLogin, NaverLogin],
})
export class SocialLoginModule {
  static forRoot(config: SocialConfig = {}): DynamicModule {
    const providers: Provider[] = [
      this.createGoogleConfig(config.google),
      this.createKakaoConfig(config.kakao),
      this.createNaverConfig(config.naver),
    ];

    return {
      module: SocialLoginModule,
      providers,
      exports: providers,
    };
  }

  private static createKakaoConfig(kakao?: KakaoConfig): Provider {
    return {
      provide: KAKAO_CONFIG,
      useValue: kakao || null,
    };
  }

  private static createGoogleConfig(google?: GoogleConfig): Provider {
    return {
      provide: GOOGLE_CONFIG,
      useValue: google || null,
    };
  }

  private static createNaverConfig(naver?: NaverConfig): Provider {
    return {
      provide: NAVER_CONFIG,
      useValue: naver || null,
    };
  }
}
