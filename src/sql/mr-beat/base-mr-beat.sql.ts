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
    LEFT JOIN Image as thumbnail ON thumbnail.id = mrBeat.thumbnailId
    LEFT JOIN Music as music ON music.id = mrBeat.musicId
    LEFT JOIN Genre as genre ON genre.id = mrBeat.genreId
    LEFT JOIN Mood as mood ON mood.id = mrBeat.moodId
    LEFT JOIN MusicianService as musicianService ON musicianService.mrBeatId = mrBeat.id
    LEFT JOIN ServiceReview as serviceReview ON serviceReview.serviceId = musicianService.id
    `;
  }

  getBaseSelect() {
    return Prisma.sql`
    SQL_CALC_FOUND_ROWS
    mrBeat.id as id, mrBeat.name as name, mrBeat.groupType as groupType, 
    thumbnail.url as thumbnailUrl, music.url as musicUrl, music.duration as musicDuration, 
    genre.name as genreName, mood.name as moodName, 
    mrBeat.createdAt as createdAt, AVG(serviceReview.score) as score 
    `;
  }
}
