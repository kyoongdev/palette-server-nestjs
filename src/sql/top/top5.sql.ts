import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { ServiceType } from '@/interface/service.interface';

@Injectable()
export class TopSQL {
  getClickedTopSQL(table: ServiceType, limit = 5) {
    return Prisma.sql`
      SELECT target.id, target.name, musician.id AS musicianId,  profile.url as musicianProfileUrl, COUNT(clicked.id) AS clickCount
      ${this.getFrom(table)}
      LEFT JOIN MusicianService musicianService ON musicianService.id = target.musicianServiceId
      LEFT JOIN MusicianServiceClicked clicked ON clicked.musicianServiceId = musicianService.id 
      LEFT JOIN Musician musician ON musician.id = musicianService.musicianId
      JOIN User user ON user.id = musician.userId
      LEFT JOIN Image profile ON profile.id = user.profileImageId    
      WHERE (MONTH(clicked.createdAt) = MONTH(CURRENT_DATE()) AND YEAR(clicked.createdAt) = YEAR(CURRENT_DATE())) OR clicked.createdAt IS NULL
      GROUP BY target.id, clicked.id
      ORDER BY clickCount DESC
      LIMIT ${limit}
    `;
  }

  getFrom(table: ServiceType) {
    if (table === 'ALBUM_ART') {
      return Prisma.sql`FROM AlbumArt target`;
    } else if (table === 'ARTIST') {
      return Prisma.sql`FROM Artist target`;
    } else if (table === 'MIX_MASTERING') {
      return Prisma.sql`FROM MixMastering target`;
    } else if (table === 'MR_BEAT') {
      return Prisma.sql`FROM MrBeat target`;
    } else {
      return Prisma.sql`FROM Recording target`;
    }
  }
}
