import type { MrBeat, MrBeatLicense, MusicianService } from '@prisma/client';

import type { FindContact } from './contact.interface';
import type { FindMusic } from './file.interface';
import type { FindGenre } from './genre.interface';
import type { FindImage } from './image.interface';
import type { FindLicense } from './license.interface';
import type { FindMood } from './mood.interface';
import type { FindCommonMusician } from './musician.interface';

export interface FindMrBeatContact {
  method: string;
  contact: FindContact;
}

export interface FindMrBeatLicense extends MrBeatLicense {
  license: FindLicense;
}

export interface FindMrBeatGenre {
  genre: FindGenre;
}

export interface FindMrBeatMood {
  mood: FindMood;
}

export interface FindMrBeatList extends MrBeat {
  thumbnail: FindImage;
  music: FindMusic;
  genres: FindMrBeatGenre[];
  moods: FindMrBeatMood[];
  musicianService: MusicianService & {
    musician: FindCommonMusician;
  };
}

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
  musicianName: string;
  musicianGroupType: number;
  musicianIsPending: boolean;
  musicianIsAuthorized: boolean;
  musicianIntroduction: string;
  musicianProfileUrl: string;
}

export interface FindMrBeat extends FindMrBeatList {
  contacts: FindMrBeatContact[];
  licenses: FindMrBeatLicense[];
}
