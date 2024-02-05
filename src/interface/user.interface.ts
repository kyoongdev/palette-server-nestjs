import { File, Musician, Prisma } from '@prisma/client';

import { commonUserInclude } from '@/utils/constants/include/user';

export const SOCIAL_TYPE = {
  naver: 'naver',
  kakao: 'kakao',
  google: 'google',
};

export type SocialType = keyof typeof SOCIAL_TYPE;

export interface UserMusician extends Musician {
  evidenceFile: File;
}

export type FindCommonUser = Prisma.UserGetPayload<{ include: typeof commonUserInclude }>;
