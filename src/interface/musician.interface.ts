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
