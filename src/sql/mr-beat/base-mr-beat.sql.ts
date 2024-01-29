import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';

export interface BaseMrBeatSQLProps {
  paging: PagingDTO;
}

export class BaseMrBeatSQL {
  paging: PagingDTO;
  constructor(protected readonly props: BaseMrBeatSQLProps) {
    this.paging = props.paging;
  }

  getBaseJoin() {
    return Prisma.sql`
    LEFT JOIN Image thumbnail ON thumbnail.id = mrBeat.thumbnailId
    LEFT JOIN Music music ON music.id = mrBeat.musicId
    LEFT JOIN MrBeatGenre mrBeatGenre ON mrBeatGenre.mrBeatId = mrBeat.id
    LEFT JOIN Genre genre ON genre.id = mrBeatGenre.genreId
    LEFT JOIN MrBeatMood mrBeatMood ON mrBeatMood.mrBeatId = mrBeat.id
    LEFT JOIN Mood  mood ON mood.id = mrBeatMood.moodId
    LEFT JOIN MusicianService musicianService ON musicianService.id = mrBeat.musicianServiceId
    LEFT JOIN ServiceReview serviceReview ON serviceReview.serviceId = musicianService.id
    LEFT JOIN Musician musician ON musician.id = musicianService.musicianId
    JOIN User user ON user.id = musician.userId
    LEFT JOIN Image profile ON profile.id = user.profileImageId
    `;
  }

  getBaseSelect() {
    return Prisma.sql`
    SELECT SQL_CALC_FOUND_ROWS
    mrBeat.id as id, mrBeat.name as name, mrBeat.groupType as groupType, 
    thumbnail.url as thumbnailUrl, music.url as musicUrl, music.duration as musicDuration, 
    genre.name as genreName, mood.name as moodName, 
    mrBeat.createdAt as createdAt, AVG(serviceReview.score) as score,
    musician.id as musicianId, musician.stageName as stageName,
    musician.name as musicianName, musician.groupType as musicianGroupType,
    musician.isPending as musicianIsPending, musician.isAuthorized as musicianIsAuthorized,
    musician.introduction as musicianIntroduction, profile.url as musicianProfileUrl
    `;
  }
}
