import { FindRecordingList, FindSQLRecordingList } from '@/interface/recording.interface';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { getServiceStatus, getSQLServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

export interface RecordingListDTOProps {
  id: string;
  name: string;
  studioName: string;
  thumbnailUrl: string;
  isEngineerSupported: boolean;
  cost: number;
  score: number;
  createdAt: Date;
  musician: CommonMusicianDTOProps;
  status: ServiceStatus;
  serviceId: string;
}

export class RecordingListDTO {
  @Property({ apiProperty: { description: '레코딩 id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '레코딩 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '스튜디오 이름', type: 'string' } })
  studioName: string;

  @Property({ apiProperty: { description: '썸네일 url', type: 'string' } })
  thumbnailUrl: string;

  @Property({ apiProperty: { description: '엔지니어 지원 여부', type: 'boolean' } })
  isEngineerSupported: boolean;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '평점', type: 'number' } })
  score: number;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '음악가', type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  @Property({ apiProperty: { description: '서비스 아이디', type: 'string' } })
  serviceId: string;

  constructor(props: RecordingListDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.studioName = props.studioName;
    this.thumbnailUrl = props.thumbnailUrl;
    this.isEngineerSupported = props.isEngineerSupported;
    this.cost = props.cost;
    this.score = props.score;
    this.createdAt = props.createdAt;
    this.status = props.status;
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindRecordingList(data: FindRecordingList) {
    return new RecordingListDTO({
      id: data.id,
      name: data.name,
      studioName: data.studioName,
      thumbnailUrl: data.images.find((image) => image.isThumbnail).image.url,
      isEngineerSupported: data.isEngineerSupported,
      cost: Math.min(...data.licenses.map((license) => license.cost)),
      score:
        data.musicianService.reviews.reduce((acc, cur) => acc + cur.score, 0) / data.musicianService.reviews.length,
      createdAt: data.createdAt,
      musician: data.musicianService.musician,
      status: getServiceStatus(data),
      serviceId: data.musicianServiceId,
    });
  }

  static fromFindSQLRecordingList(data: FindSQLRecordingList) {
    return new RecordingListDTO({
      id: data.id,
      name: data.name,
      studioName: data.studioName,
      thumbnailUrl: data.thumbnailUrl,
      isEngineerSupported: data.isEngineerSupported,
      cost: data.cost,
      score: data.score,
      createdAt: data.createdAt,
      musician: CommonMusicianDTO.fromFindSQLCommonMusician(data),
      status: getSQLServiceStatus(data),
      serviceId: data.serviceId,
    });
  }
}
