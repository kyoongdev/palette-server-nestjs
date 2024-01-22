import { File, Musician } from '@prisma/client';

export type MusicianApproveStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export interface AdminMusician extends Musician {
  _count: {
    services: number;
  };
}

export interface FindMusician extends Musician {
  evidenceFile: File;
}
