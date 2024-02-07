import { Prisma } from '@prisma/client';
import { camelCase } from 'lodash';

import { ServiceType } from '@/interface/service.interface';

export class Top5SQL {
  table: ServiceType;

  constructor(props: ServiceType) {
    this.table = props;
  }

  getTop5SQL() {
    return Prisma.sql`
      SELECT target.id, target.name, musician.id AS musicianId,  profile.url as musicianProfileUrl, COUNT(clicked.id) AS clickCount
      ${this.getFrom()}
      LEFT JOIN MusicianService musicianService ON musicianService.id = target.musicianServiceId
      LEFT JOIN MusicianServiceClicked clicked ON clicked.musicianServiceId = musicianService.id 
      LEFT JOIN Musician musician ON musician.id = musicianService.musicianId
      JOIN User user ON user.id = musician.userId
      LEFT JOIN Image profile ON profile.id = user.profileImageId    
      WHERE (MONTH(clicked.createdAt) = MONTH(CURRENT_DATE()) AND YEAR(clicked.createdAt) = YEAR(CURRENT_DATE())) OR clicked.createdAt IS NULL
      GROUP BY target.id, clicked.id
      ORDER BY clickCount DESC
      LIMIT 5
    `;
  }

  getFrom() {
    if (this.table === 'ALBUM_ART') {
      return Prisma.sql`FROM AlbumArt target`;
    } else if (this.table === 'ARTIST') {
      return Prisma.sql`FROM Artist target`;
    } else if (this.table === 'MIX_MASTERING') {
      return Prisma.sql`FROM MixMastering target`;
    } else if (this.table === 'MR_BEAT') {
      return Prisma.sql`FROM MrBeat target`;
    } else {
      return Prisma.sql`FROM Recording target`;
    }
  }
}
