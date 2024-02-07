import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';

export interface BaseArtistSQLProps {
  paging: PagingDTO;
}
export class BaseArtistSQL {
  paging: PagingDTO;

  constructor(protected readonly props: BaseArtistSQLProps) {
    this.paging = props.paging;
  }

  getBaseJoin() {
    return Prisma.sql`
    LEFT JOIN ArtistImage image ON image.artistId = artist.id AND image.isThumbnail = true
    LEFT JOIN Image thumbnail ON thumbnail.id = image.imageId 
    LEFT JOIN ArtistLicense artistLicense ON artistLicense.artistId = artist.id
    LEFT JOIN ArtistSaleTypeBridge artistSaleTypeBridge ON artistSaleTypeBridge.artistId = artist.id
    LEFT JOIN ArtistSaleType artistSaleType ON  artistSaleTypeBridge.saleTypeId = artistSaleType.id
    LEFT JOIN MusicianService musicianService ON musicianService.id = artist.musicianServiceId
    LEFT JOIN ServiceReview serviceReview ON serviceReview.serviceId = musicianService.id
    LEFT JOIN Musician musician ON musician.id = musicianService.musicianId
    JOIN User user ON user.id = musician.userId
    LEFT JOIN Image profile ON profile.id = user.profileImageId
    `;
  }

  getBaseSelect() {
    return Prisma.sql`
    SELECT SQL_CALC_FOUND_ROWS
    artist.id as id, artist.name as name, 
    thumbnail.url as thumbnailUrl,
    musician.id as musicianId, musician.stageName as stageName,
    musician.name as musicianName, musician.groupType as musicianGroupType,
    AVG(serviceReview.score) as score,
    musicianService.id as serviceId,
    artist.isPending as isPending, artist.isAuthorized as isAuthorized,
    artist.isSaleStopped as isSaleStopped,
    musician.isPending as musicianIsPending, musician.isAuthorized as musicianIsAuthorized,
    musician.introduction as musicianIntroduction, profile.url as musicianProfileUrl,
    GROUP_CONCAT(DISTINCT artistSaleType.name) as saleTypes, MIN(artistLicense.cost) as cost,
    artist.createdAt as createdAt
    `;
  }
}
