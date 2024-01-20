import type { Musician } from '@prisma/client';

import type { DateDTOProps } from '@/utils';

import type { FindContact } from './contact.interface';
import type { FindFile } from './file.interface';
import type { FindGenre } from './genre.interface';
import type { FindImage } from './image.interface';
import type { FindLicense } from './license.interface';
import type { FindMood } from './mood.interface';

export interface FindMrBeatContact {
  method: string;
  contact: FindContact;
}

export interface FindMrBeatLicense {
  id: string;
  usePeriod?: string;
  cost: number;
  isNewSongWithVoiceAllowed: boolean;
  isProfitActivityAllowed: boolean;
  isPerformanceActivityAllowed: boolean;
  isBackgroundMusicAllowed: boolean;
  isMVProduceAllowed: boolean;
  isShareAllowed: boolean;
  isArrangeAllowed: boolean;
  license: FindLicense;
}

export interface FindMrBeat extends DateDTOProps {
  id: string;
  name: string;
  groupType: number;
  thumbnail: FindImage;
  music: FindFile;
  genre: FindGenre;
  mood: FindMood;
  isPending: boolean;
  isAuthorized: boolean;
  contacts: FindMrBeatContact[];
  licenses: FindMrBeatLicense[];
  musician: Musician;
}
