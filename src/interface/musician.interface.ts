import { File, Image, Musician, User } from '@prisma/client';

export type MusicianApproveStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export interface AdminMusician extends Musician {
  _count: {
    services: number;
  };
}

export interface MusicianUser extends User {
  profileImage?: Image;
}

export interface FindCommonMusician extends Musician {
  evidenceFile: File;
  user: MusicianUser;
}
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
