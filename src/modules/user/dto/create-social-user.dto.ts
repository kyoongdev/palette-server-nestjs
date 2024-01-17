import { IsEmail, MaxLength } from 'class-validator';

import { GoogleUser, KakaoGetUser, NaverUser } from '@/interface/social.interface';
import type { SocialType } from '@/interface/user.interface';
import { socialTypeToNumber } from '@/utils/social/utils';
import { Property } from '@/utils/swagger';

import { CreateUserDTO, CreateUserDTOProps } from './create-user.dto';

export interface CreateSocialUserDTOProps extends CreateUserDTOProps {
  socialId: string;
  socialType: SocialType;
}

export class CreateSocialUserDTO extends CreateUserDTO {
  @Property({ apiProperty: { type: 'string', description: '소셜 ID' } })
  socialId: string;

  @Property({ apiProperty: { type: 'number', description: '1 = 카카오, 2 = 네이버 , 3 = 애플' } })
  socialType: number;

  constructor(props?: CreateSocialUserDTOProps) {
    super(props);
    if (props) {
      this.socialId = props.socialId;
      this.socialType = socialTypeToNumber(props.socialType);
    }
  }
  setKakaoUser(socialUser: KakaoGetUser) {
    const account = socialUser.kakaoAccount;
    this.name = socialUser.kakaoAccount.name ?? '';
    this.socialId = `${socialUser.id}`;
    this.socialType = socialTypeToNumber('kakao');
    this.email = account.email;
    this.phoneNumber = account.phone_number
      ? account.phone_number.replace(/-/g, '').replace('+82 ', '0').trim()
      : undefined;

    return this;
  }

  getKakaoUser() {
    return this;
  }

  setNaverUser(socialUser: NaverUser) {
    this.name = socialUser.name ?? '';
    this.socialId = `${socialUser.id}`;
    this.socialType = socialTypeToNumber('naver');
    this.email = socialUser.email;
    this.phoneNumber = socialUser.mobile.replace(/-/g, '');

    return this;
  }

  setGoogleUser(socialUser: GoogleUser) {
    this.name = socialUser.nickname ?? '';
    this.socialId = `${socialUser.id}`;
    this.socialType = socialTypeToNumber('google');
    this.email = socialUser.email ?? '';

    return this;
  }
}
