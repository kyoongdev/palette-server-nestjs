import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';

export interface BaseRecordingSQLProps {
  paging: PagingDTO;
}

export class BaseRecordingSQL {
  paging: PagingDTO;

  constructor(protected readonly props: BaseRecordingSQLProps) {
    this.paging = props.paging;
  }

  getBaseJoin() {
    return Prisma.sql`
    LEFT JOIN RecordingImage image ON image.recordingId = recording.id AND image.isThumbnail = true
    LEFT JOIN Image thumbnail ON thumbnail.id = image.imageId
    LEFT JOIN RecordingLicense recordingLicense ON recordingLicense.recordingId = recording.id
    JOIN RecordingRegion recordingRegion ON recordingRegion.id = recording.recordingRegionId
    LEFT JOIN RegionLargeGroup regionLargeGroup ON regionLargeGroup.id = recordingRegion.regionLargeGroupId
    LEFT JOIN RegionSmallGroup regionSmallGroup ON regionSmallGroup.id = recordingRegion.regionSmallGroupId
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
    recording.id as id, recording.name as name,
    thumbnail.url as thumbnailUrl,
    recordingRegion.id as recordingRegionId,
    regionLargeGroup.name as regionLargeGroupName,
    regionSmallGroup.name as regionSmallGroupName,
    AVG(serviceReview.score) as score,
    recording.isEngineerSupported as isEngineerSupported,
    recording.isAuthorized as isAuthorized,
    recording.cost as cost,
    recording.createdAt as createdAt
    musician.isPending as musicianIsPending, musician.isAuthorized as musicianIsAuthorized,
    musician.introduction as musicianIntroduction, profile.url as musicianProfileUrl,
    MIN(recordingLicense.cost) as cost
    `;
  }
}
