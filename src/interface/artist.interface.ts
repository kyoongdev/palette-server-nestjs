import type { Prisma } from '@prisma/client';

import { artistDetailInclude, artistListInclude } from '@/utils/constants/include/artist';

export interface FindSQLArtistList {
  id: string;
  name: string;
  thumbnailUrl: string;
  createdAt: Date;
  score: number;
  musicianId: string;
  cost: number;
  saleTypes: string;
  stageName: string;
  musicianName: string;
  musicianGroupType: number;
  musicianIsPending: boolean;
  musicianIsAuthorized: boolean;
  musicianIntroduction: string;
  musicianProfileUrl: string;
}

export type FindArtist = Prisma.ArtistGetPayload<{ include: typeof artistDetailInclude }>;
export type FindArtistList = Prisma.ArtistGetPayload<{ include: typeof artistListInclude }>;
