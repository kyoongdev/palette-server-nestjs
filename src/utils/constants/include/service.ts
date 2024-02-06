import { Prisma } from '@prisma/client';

import { albumArtListInclude } from './album-art';
import { artistListInclude } from './artist';
import { mixMasteringListInclude } from './mix-mastering';
import { mrBeatListInclude } from './mr-beat';
import { recordingListInclude } from './recording';

export const serviceInclude = {
  albumArt: true,
  artist: true,
  mixMastering: true,
  mrBeat: true,
  recording: true,
} satisfies Prisma.MusicianServiceInclude;

export const serviceWithDetailInclude = {
  albumArt: {
    include: albumArtListInclude,
  },
  artist: {
    include: artistListInclude,
  },
  mixMastering: {
    include: mixMasteringListInclude,
  },
  mrBeat: {
    include: mrBeatListInclude,
  },
  recording: {
    include: recordingListInclude,
  },
} satisfies Prisma.MusicianServiceInclude;
