import type { Prisma } from '@prisma/client';

import {
  mrBeatContactInclude,
  mrBeatDetailInclude,
  mrBeatLicenseInclude,
  mrBeatListInclude,
} from '@/utils/constants/include/mr-beat';

export interface FindSQLMrBeatList {
  id: string;
  name: string;
  groupType: number;
  thumbnailUrl: string;
  musicUrl: string;
  musicDuration: number;
  genreName: string;
  moodName: string;
  createdAt: Date;
  score: number;
  musicianId: string;
  stageName: string;
  cost: number;
  musicianName: string;
  musicianGroupType: number;
  musicianIsPending: boolean;
  musicianIsAuthorized: boolean;
  musicianIntroduction: string;
  musicianProfileUrl: string;
}

export type FindMrBeat = Prisma.MrBeatGetPayload<{ include: typeof mrBeatDetailInclude }>;
export type FindMrBeatList = Prisma.MrBeatGetPayload<{ include: typeof mrBeatListInclude }>;
export type FindMrBeatLicense = Prisma.MrBeatLicenseGetPayload<{ include: typeof mrBeatLicenseInclude }>;
export type FindMrBeatContact = Prisma.MrBeatContactGetPayload<{ include: typeof mrBeatContactInclude }>;
