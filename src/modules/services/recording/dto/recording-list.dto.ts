import { FindSQLRecordingList } from '@/interface/recording.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
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

  constructor(props: RecordingListDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.studioName = props.studioName;
    this.thumbnailUrl = props.thumbnailUrl;
    this.isEngineerSupported = props.isEngineerSupported;
    this.cost = props.cost;
    this.score = props.score;
    this.createdAt = props.createdAt;
    this.musician = new CommonMusicianDTO(props.musician);
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
    });
  }
}
