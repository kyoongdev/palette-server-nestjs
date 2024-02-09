import { Prisma } from '@prisma/client';

import { musicianServiceInclude } from './common';
import { commonMusicianInclude } from './musician';

export const recordingLicenseInclude = {
  license: true,
} satisfies Prisma.RecordingLicenseInclude;

export const recordingRegionInclude = {
  regionLargeGroup: true,
  regionSmallGroup: true,
} satisfies Prisma.RecordingRegionInclude;

export const recordingListInclude = {
  licenses: {
    orderBy: {
      license: {
        order: 'asc',
      },
    },
  },
  recordingRegion: {
    include: {
      regionLargeGroup: true,
      regionSmallGroup: true,
    },
  },
  images: {
    include: {
      image: true,
    },
  },
  musicianService: {
    include: musicianServiceInclude,
  },
} satisfies Prisma.RecordingInclude;

export const recordingInclude = {
  ...recordingListInclude,
  licenses: {
    include: {
      license: true,
    },
    orderBy: {
      license: {
        order: 'asc',
      },
    },
  },
} satisfies Prisma.RecordingInclude;
