import { FindMixMasteringList, FindSQLMixMastering } from '@/interface/mix-mastering';
import { MusicDTO, MusicDTOProps } from '@/modules/file/dto';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { Property } from '@/utils/swagger';

export interface MixMasteringListDTOProps {
  id: string;
  name: string;
  cost: number;
  score: number;
  thumbnailUrl: string;
  beforeMusic: MusicDTOProps;
  afterMusic: MusicDTOProps;
  genreName: string;
  musician: CommonMusicianDTOProps;
  createdAt: Date;
}

export class MixMasteringListDTO {
  @Property({ apiProperty: { description: '아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '평점', type: 'number' } })
  score: number;

  @Property({ apiProperty: { description: '썸네일', type: 'string' } })
  thumbnailUrl: string;

  @Property({ apiProperty: { description: '작업전 음악', type: MusicDTO } })
  beforeMusic: MusicDTO;

  @Property({ apiProperty: { description: '작업후 음악', type: MusicDTO } })
  afterMusic: MusicDTO;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '장르 이름', type: 'string' } })
  genreName: string;

  @Property({ apiProperty: { description: '뮤지션', type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: MixMasteringListDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.cost = props.cost;
    this.score = props.score;
    this.thumbnailUrl = props.thumbnailUrl;
    this.beforeMusic = new MusicDTO(props.beforeMusic);
    this.afterMusic = new MusicDTO(props.afterMusic);
    this.genreName = props.genreName;
    this.musician = new CommonMusicianDTO(props.musician);
    this.createdAt = props.createdAt;
  }

  static fromFindSQLMixMastering(data: FindSQLMixMastering) {
    return new MixMasteringListDTO({
      id: data.id,
      name: data.name,
      cost: data.cost,
      score: data.score,
      thumbnailUrl: data.thumbnailUrl,
      beforeMusic: {
        id: data.musicBeforeId,
        originalName: data.musicBeforeOriginalName,
        url: data.musicBeforeUrl,
        duration: data.musicBeforeDuration,
        extension: data.musicBeforeExtension,
      },
      afterMusic: {
        id: data.musicAfterId,
        originalName: data.musicAfterOriginalName,
        url: data.musicAfterUrl,
        duration: data.musicAfterDuration,
        extension: data.musicAfterExtension,
      },
      genreName: data.genreNames.split(',').at(-1),
      musician: CommonMusicianDTO.fromFindSQLCommonMusician(data),
      createdAt: data.createdAt,
    });
  }

  static fromFindMixMastering(data: FindMixMasteringList) {
    return new MixMasteringListDTO({
      id: data.id,
      name: data.name,
      cost: Math.min(...data.licenses.map((license) => license.cost)),
      score:
        data.musicianService.reviews.reduce((acc, cur) => acc + cur.score, 0) / data.musicianService.reviews.length,
      thumbnailUrl: data.thumbnail.url,
      beforeMusic: data.musics.find((music) => music.isBefore).music,
      afterMusic: data.musics.find((music) => music.isAfter).music,
      genreName: data.genres.at(-1).genre.name,
      musician: data.musicianService.musician,
      createdAt: data.createdAt,
    });
  }
}
