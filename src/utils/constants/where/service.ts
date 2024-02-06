import { Prisma } from '@prisma/client';

export const findServicesWhere = {
  OR: [
    {
      artist: {
        isAuthorized: true,
        isPending: false,
      },
    },
    {
      mrBeat: {
        isAuthorized: true,
        isPending: false,
      },
    },
    {
      recording: {
        isAuthorized: true,
        isPending: false,
      },
    },
    {
      mixMastering: {
        isAuthorized: true,
        isPending: false,
      },
    },
    {
      albumArt: {
        isAuthorized: true,
        isPending: false,
      },
    },
  ],
} satisfies Prisma.MusicianServiceWhereInput;

export const findPendingServicesWhere = {
  OR: [
    {
      artist: {
        OR: [
          {
            isAuthorized: false,
            isPending: true,
          },
          {
            isSaleStopped: true,
          },
        ],
      },
    },
    {
      mrBeat: {
        OR: [
          {
            isAuthorized: false,
            isPending: true,
          },
          {
            isSaleStopped: true,
          },
        ],
      },
    },
    {
      recording: {
        OR: [
          {
            isAuthorized: false,
            isPending: true,
          },
          {
            isSaleStopped: true,
          },
        ],
      },
    },
    {
      mixMastering: {
        OR: [
          {
            isAuthorized: false,
            isPending: true,
          },
          {
            isSaleStopped: true,
          },
        ],
      },
    },
    {
      albumArt: {
        OR: [
          {
            isAuthorized: false,
            isPending: true,
          },
          {
            isSaleStopped: true,
          },
        ],
      },
    },
  ],
} satisfies Prisma.MusicianServiceWhereInput;
