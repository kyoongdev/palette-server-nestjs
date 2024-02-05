import { File, Image, Musician, Prisma, User } from '@prisma/client';

import { commonMusicianInclude, musicianInclude } from '@/utils/constants/include/musician';

export type MusicianApproveStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export interface AdminMusician extends Musician {
  _count: {
    services: number;
  };
}

export interface MusicianUser extends User {
  profileImage?: Image;
}

export type FindCommonMusician = Prisma.MusicianGetPayload<{ include: typeof commonMusicianInclude }>;
export type FindMusician = Prisma.MusicianGetPayload<{ include: typeof musicianInclude }>;
export interface FindSQLCommonMusician {
  musicianId: string;
  stageName: string;
  musicianName: string;
  musicianGroupType: number;
  musicianIsPending: boolean;
  musicianIsAuthorized: boolean;
  musicianIntroduction: string;
  musicianProfileUrl: string;
}
