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
    LEFT JOIN SaleType saleType ON saleType.id = albumArtSaleTypeBridge.saleTypeId
    LEFT JOIN AlbumArtContact albumArtContact ON albumArtContact.albumArtId = albumArt.id
    LEFT JOIN Contact contact ON contact.id = albumArtContact.contactId
    LEFT JOIN AlbumArtLicense albumArtLicense ON albumArtLicense.albumArtId = albumArt.id
    LEFT JOIN License license ON license.id = albumArtLicense.licenseId
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
    MIN(license.cost) as cost,
    AVG(serviceReview.score) as score,
    musician.id as musicianId, musician.stageName as stageName,
    musician.name as musicianName, musician.groupType as musicianGroupType,
    musician.isPending as musicianIsPending, musician.isAuthorized as musicianIsAuthorized,
    musician.introduction as musicianIntroduction, profile.url as musicianProfileUrl,
    albumArt.createdAt as createdAt
    `;
  }
}
