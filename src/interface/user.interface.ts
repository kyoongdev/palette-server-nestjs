import { File, Image, Musician, User } from '@prisma/client';

import { FindCommonMusician } from './musician.interface';

export const SOCIAL_TYPE = {
  naver: 'naver',
  kakao: 'kakao',
  google: 'google',
};

export type SocialType = keyof typeof SOCIAL_TYPE;

export interface UserMusician extends Musician {
  evidenceFile: File;
}

export interface FindCommonUser extends User {
  musician?: UserMusician;
  profileImage?: Image;
}
