import type { Prisma } from '@prisma/client';

import {
  mrBeatContactInclude,
  mrBeatDetailInclude,
  mrBeatLicenseInclude,
  mrBeatListInclude,
} from '@/utils/constants/include/mr-beat';

import type { FindSQLCommonMusician } from './musician.interface';

export interface FindSQLMrBeatList extends FindSQLCommonMusician {
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
  cost: number;
}

export type FindMrBeat = Prisma.MrBeatGetPayload<{ include: typeof mrBeatDetailInclude }>;
export type FindMrBeatList = Prisma.MrBeatGetPayload<{ include: typeof mrBeatListInclude }>;
export type FindMrBeatLicense = Prisma.MrBeatLicenseGetPayload<{ include: typeof mrBeatLicenseInclude }>;
export type FindMrBeatContact = Prisma.MrBeatContactGetPayload<{ include: typeof mrBeatContactInclude }>;
