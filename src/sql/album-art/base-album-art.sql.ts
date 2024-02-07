import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';

export interface BaseAlbumArtSQLProps {
  paging: PagingDTO;
}

export class BaseAlbumARtSQL {
  paging: PagingDTO;

  constructor(props: BaseAlbumArtSQLProps) {
    this.paging = props.paging;
  }

  getBaseJoin() {
    return Prisma.sql`
    LEFT JOIN AlbumArtImage albumArtImage ON albumArtImage.albumArtId = albumArt.id AND albumArtImage.isThumbnail = 1
    LEFT JOIN Image image ON image.id = albumArtImage.imageId
    LEFT JOIN AlbumArtSaleTypeBridge albumArtSaleTypeBridge ON albumArtSaleTypeBridge.albumArtId = albumArt.id
    LEFT JOIN ArtistSaleType saleType ON saleType.id = albumArtSaleTypeBridge.saleTypeId
    LEFT JOIN AlbumArtLicense albumArtLicense ON albumArtLicense.albumArtId = albumArt.id
    LEFT JOIN MusicianService musicianService ON musicianService.id = albumArt.musicianServiceId
    LEFT JOIN ServiceReview serviceReview ON serviceReview.serviceId = musicianService.id
    LEFT JOIN Musician musician ON musician.id = musicianService.musicianId
    JOIN User user ON user.id = musician.userId
    LEFT JOIN Image profile ON profile.id = user.profileImageId
    `;
  }

  getBaseSelect() {
    return Prisma.sql`
    SELECT SQL_CALC_FOUND_ROWS
    albumArt.id as id, albumArt.name as name,
    image.url as thumbnailUrl,
    GROUP_CONCAT(DISTINCT saleType.name) as saleTypeNames,
    MIN(albumArtLicense.cost) as cost,
    AVG(serviceReview.score) as score,
    albumArt.isPending as isPending, albumArt.isAuthorized as isAuthorized,
    albumArt.isSaleStopped as isSaleStopped,
    musicianService.id as serviceId,
    musician.id as musicianId, musician.stageName as stageName,
    musician.name as musicianName, musician.groupType as musicianGroupType,
    musician.isPending as musicianIsPending, musician.isAuthorized as musicianIsAuthorized,
    musician.introduction as musicianIntroduction, profile.url as musicianProfileUrl,
    albumArt.createdAt as createdAt
    `;
  }
}
