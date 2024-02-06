import { FindArtistList, FindSQLArtistList } from '@/interface/artist.interface';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { getServiceStatus, getSQLServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

export interface ArtistListDTOProps {
  id: string;
  name: string;
  thumbnailUrl: string;
  cost: number;
  score: number;
  status: ServiceStatus;
  createdAt: Date;
  saleTypes: string[];
  musician: CommonMusicianDTOProps;
}

export class ArtistListDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '썸네일 url', type: 'string' } })
  thumbnailUrl: string;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '점수', type: 'number' } })
  score: number;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '판매 타입', type: 'string', isArray: true } })
  saleTypes: string[];

  @Property({ apiProperty: { type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: ArtistListDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.thumbnailUrl = props.thumbnailUrl;
    this.cost = props.cost;
    this.createdAt = props.createdAt;
    this.saleTypes = props.saleTypes;
    this.score = props.score;
    this.status = props.status;
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindArtistList(data: FindArtistList) {
    return new ArtistListDTO({
      id: data.id,
      cost: Math.min(...data.licenses.map((license) => license.cost)),
      createdAt: data.createdAt,
      musician: data.musicianService.musician,
      name: data.name,
      status: getServiceStatus(data),
      score:
        data.musicianService.reviews.reduce((acc, cur) => acc + cur.score, 0) / data.musicianService.reviews.length,
      saleTypes: data.saleTypes.map((saleType) => saleType.saleType.name),
      thumbnailUrl: data.images.find((image) => image.isThumbnail).image.url,
    });
  }

  static fromFindSQLArtistList(data: FindSQLArtistList) {
    return new ArtistListDTO({
      id: data.id,
      cost: data.cost,
      createdAt: data.createdAt,
      name: data.name,
      saleTypes: data.saleTypes.split(','),
      thumbnailUrl: data.thumbnailUrl,
      score: data.score,
      musician: CommonMusicianDTO.fromFindSQLCommonMusician(data),
      status: getSQLServiceStatus(data),
    });
  }
}
