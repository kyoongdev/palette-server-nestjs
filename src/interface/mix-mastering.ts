import { Prisma } from '@prisma/client';

import {
  mixMasteringContactInclude,
  mixMasteringGenreInclude,
  mixMasteringInclude,
  mixMasteringLicenseInclude,
  mixMasteringListInclude,
  mixMasteringMusicInclude,
} from '@/utils/constants/include/mix-mastering';

import { FindSQLCommonMusician } from './musician.interface';

export type MixMasteringSort = 'POPULAR';

export interface FindSQLMixMastering extends FindSQLCommonMusician {
  id: string;
  name: string;
  thumbnailUrl: string;
  musicBeforeId: string;
  musicBeforeExtension: string;
  musicBeforeOriginalName: string;
  musicBeforeUrl: string;
  musicBeforeDuration: number;
  musicAfterId: string;
  musicAfterExtension: string;
  musicAfterOriginalName: string;
  musicAfterUrl: string;
  musicAfterDuration: number;
  genreNames: string;
  cost: number;
  score: number;
  createdAt: Date;
  isAuthorized: boolean;
  isSaleStopped: boolean;
  isPending: boolean;
  serviceId: string;
}

export type FindMixMasteringList = Prisma.MixMasteringGetPayload<{ include: typeof mixMasteringListInclude }>;
export type FindMixMastering = Prisma.MixMasteringGetPayload<{ include: typeof mixMasteringInclude }>;
export type FindMixMasteringLicense = Prisma.MixMasteringLicenseGetPayload<{
  include: typeof mixMasteringLicenseInclude;
}>;
export type FindMixMasteringGenre = Prisma.MixMasteringGenreGetPayload<{ include: typeof mixMasteringGenreInclude }>;
export type FindMixMasteringContact = Prisma.MixMasteringContactGetPayload<{
  include: typeof mixMasteringContactInclude;
}>;
export type FindMixMasteringMusic = Prisma.MixMasteringMusicGetPayload<{ include: typeof mixMasteringMusicInclude }>;
