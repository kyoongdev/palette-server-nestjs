import { Prisma } from '@prisma/client';

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
        name: 'asc',
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
    include: {
      musician: {
        include: {
          user: {
            include: {
              profileImage: true,
            },
          },
        },
      },
      reviews: true,
    },
  },
} satisfies Prisma.RecordingInclude;

export const recordingInclude = {
  licenses: {
    include: {
      license: true,
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
    include: {
      musician: {
        include: {
          user: {
            include: {
              profileImage: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.RecordingInclude;
