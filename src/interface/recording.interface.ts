import { Prisma } from '@prisma/client';

import {
  recordingInclude,
  recordingLicenseInclude,
  recordingListInclude,
  recordingRegionInclude,
} from '@/utils/constants/include/recording';

import { FindSQLCommonMusician } from './musician.interface';

export interface FindSQLRecordingList extends FindSQLCommonMusician {
  id: string;
  name: string;
  studioName: string;
  thumbnailUrl: string;
  recordingRegionId: string;
  regionLargeGroupName: string;
  regionSmallGroupName: string;
  score: number;
  isEngineerSupported: boolean;
  isAuthorized: boolean;
  cost: number;
  createdAt: Date;
}

export type FindRecordingList = Prisma.RecordingGetPayload<{ include: typeof recordingListInclude }>;
export type FindRecording = Prisma.RecordingGetPayload<{ include: typeof recordingInclude }>;
export type FindRecordingLicense = Prisma.RecordingLicenseGetPayload<{ include: typeof recordingLicenseInclude }>;
export type FindRecordingRegion = Prisma.RecordingRegionGetPayload<{ include: typeof recordingRegionInclude }>;
