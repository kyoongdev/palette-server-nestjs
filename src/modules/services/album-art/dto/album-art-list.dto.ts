import { FindAlbumArtList, FindSQLAlbumArt } from '@/interface/album-art.interface';
import { SERVICE_STATUS, ServiceStatus } from '@/interface/service.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { getServiceStatus, getSQLServiceStatus } from '@/utils/service';
import { Property } from '@/utils/swagger';

export interface AlbumArtListDTOProps {
  id: string;
  name: string;
  score: number | null;
  thumbnailUrl: string;
  cost: number;
  status: ServiceStatus;
  createdAt: Date;
  saleType: string;
  musician: CommonMusicianDTOProps;
}

export class AlbumArtListDTO {
  @Property({ apiProperty: { description: 'id', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '점수', type: 'number', nullable: true } })
  score: number | null;

  @Property({ apiProperty: { description: '썸네일 url', type: 'string' } })
  thumbnailUrl: string;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '상태', type: 'string', enum: Object.values(SERVICE_STATUS) } })
  status: ServiceStatus;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '판매 타입', type: 'string' } })
  saleType: string;

  @Property({ apiProperty: { type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: AlbumArtListDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.score = props.score;
    this.thumbnailUrl = props.thumbnailUrl;
    this.cost = props.cost;
    this.createdAt = props.createdAt;
    this.saleType = props.saleType;
    this.status = props.status;
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindSQLAlbumArt(data: FindSQLAlbumArt) {
    return new AlbumArtListDTO({
      id: data.id,
      name: data.name,
      score: data.score,
      thumbnailUrl: data.thumbnailUrl,
      cost: data.cost,
      createdAt: data.createdAt,
      saleType: data.saleTypeNames,
      status: getSQLServiceStatus({
        isAuthorized: data.isAuthorized,
        isPending: data.isPending,
        isSaleStopped: data.isSaleStopped,
      }),
      musician: CommonMusicianDTO.fromFindSQLCommonMusician(data),
    });
  }

  static fromFindAlbumArtList(data: FindAlbumArtList) {
    return new AlbumArtListDTO({
      id: data.id,
      name: data.name,
      score:
        data.musicianService.reviews.reduce((acc, cur) => acc + cur.score, 0) / data.musicianService.reviews.length,
      thumbnailUrl: data.images.find((image) => image.isThumbnail).image.url,
      cost: Math.min(...data.licenses.map((license) => license.cost)),
      createdAt: data.createdAt,
      status: getServiceStatus(data),
      saleType: data.saleTypes.map((saleType) => saleType.saleType.name).join(', '),
      musician: data.musicianService.musician,
    });
  }
}
