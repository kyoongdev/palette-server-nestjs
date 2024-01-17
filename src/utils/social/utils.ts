import type { SocialType } from '@/interface/user.interface';

export const socialTypeToNumber = (socialType: SocialType) => {
  switch (socialType) {
    case 'kakao':
      return 1;
    case 'naver':
      return 2;
    case 'google':
      return 3;
  }
};

export const numberToSocialType = (socialType: number) => {
  switch (socialType) {
    case 1:
      return 'kakao';
    case 2:
      return 'naver';
    case 3:
      return 'google';
  }
};
