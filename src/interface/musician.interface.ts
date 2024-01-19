import { Musician } from '@prisma/client';

export type MusicianApproveStatus = 'APPROVED' | 'REJECTED' | 'PENDING';

export interface AdminMusician extends Musician {
  _count: {
    services: number;
  };
}
