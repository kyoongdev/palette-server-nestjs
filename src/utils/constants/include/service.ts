import { Prisma } from '@prisma/client';

import { albumArtListInclude } from './album-art';
import { artistListInclude } from './artist';
import { mixMasteringListInclude } from './mix-mastering';
import { mrBeatListInclude } from './mr-beat';
import { commonMusicianInclude } from './musician';
import { recordingListInclude } from './recording';

export const musicianServiceInclude = {
  musician: {
    include: commonMusicianInclude,
  },
  reviews: true,
} satisfies Prisma.MusicianServiceInclude;

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
