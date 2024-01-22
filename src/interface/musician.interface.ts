import { File, Musician, User } from '@prisma/client';

export type MusicianApproveStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export interface AdminMusician extends Musician {
  _count: {
    services: number;
  };
}

export interface FindCommonMusician extends Musician {
  evidenceFile: File;
  user: User;
}
