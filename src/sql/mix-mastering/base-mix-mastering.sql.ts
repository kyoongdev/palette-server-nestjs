import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';

export interface BaseMixMasteringSQLProps {
  paging: PagingDTO;
}

export class BaseMixMasteringSQL {
  paging: PagingDTO;

  getBaseJoin() {
    return Prisma.sql`
    LEFT JOIN Image thumbnail ON thumbnail.id = mixMastering.thumbnailId
    LEFT JOIN MixMasteringMusic mixMasteringBeforeMusic ON mixMasteringBeforeMusic.mixMasteringId = mixMastering.id AND mixMasteringBeforeMusic.isBefore = 1
    LEFT JOIN Music musicBefore ON musicBefore.id = mixMasteringBeforeMusic.musicId
    LEFT JOIN MixMasteringMusic mixMasteringAfterMusic ON mixMasteringAfterMusic.mixMasteringId = mixMastering.id AND mixMasteringAfterMusic.isAfter = 1
    LEFT JOIN Music musicAfter ON musicAfter.id = mixMasteringAfterMusic.musicId
    LEFT JOIN MixMasteringGenre mixMasteringGenre ON mixMasteringGenre.mixMasteringId = mixMastering.id
    LEFT JOIN Genre genre ON genre.id = mixMasteringGenre.genreId
    LEFT JOIN MixMasteringLicense mixMasteringLicense ON mixMasteringLicense.mixMasteringId = mixMastering.id
    LEFT JOIN License license ON license.id = mixMasteringLicense.licenseId
    LEFT JOIN MusicianService musicianService ON musicianService.id = mixMastering.musicianServiceId
    LEFT JOIN ServiceReview serviceReview ON serviceReview.serviceId = musicianService.id
    LEFT JOIN Musician musician ON musician.id = musicianService.musicianId
    JOIN User user ON user.id = musician.userId
    LEFT JOIN Image profile ON profile.id = user.profileImageId
    `;
  }

  getBaseSelect() {
    return Prisma.sql`
    SELECT SQL_CALC_FOUND_ROWS
    mixMastering.id as id, mixMastering.name as name, 
    thumbnail.url as thumbnailUrl, 
    musicBefore.id as musicBeforeId,  
    musicBefore.originalName as musicBeforeOriginalName,
    musicBefore.extension as musicBeforeExtension,
    musicBefore.url as musicBeforeUrl, musicBefore.duration as musicBeforeDuration,
    musicAfter.id as musicAfterId,
    musicAfter.originalName as musicAfterOriginalName,
    musicAfter.extension as musicAfterExtension,
    musicAfter.url as musicAfterUrl, musicAfter.duration as musicAfterDuration,
    GROUP_CONCAT(DISTINCT genre.name) as genreNames,
    MIN(mixMasteringLicense.cost) as cost,
    AVG(serviceReview.score) as score,
    mixMastering.isAuthorized as isAuthorized,
    mixMastering.isSaleStopped as isSaleStopped,
    mixMastering.isPending as isPending,
    musicianService.id as serviceId,
    musician.id as musicianId, musician.stageName as stageName,
    musician.name as musicianName, musician.groupType as musicianGroupType,
    musician.isPending as musicianIsPending, musician.isAuthorized as musicianIsAuthorized,
    musician.introduction as musicianIntroduction, profile.url as musicianProfileUrl,
    mixMastering.createdAt as createdAt
    `;
  }
}
