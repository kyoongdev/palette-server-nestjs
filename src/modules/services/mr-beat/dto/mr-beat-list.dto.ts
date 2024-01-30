import { FindMrBeatList, FindSQLMrBeatList } from '@/interface/mr-beat.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { GroupTypeResDecorator } from '@/modules/musician/validators';
import { Property } from '@/utils/swagger';

export interface MrBeatListDTOProps {
  id: string;
  name: string;
  groupType: number;
  thumbnailUrl: string;
  musicUrl: string;
  musicDuration: number;
  genreName: string;
  moodName: string;
  cost: number;
  score: number;
  createdAt: Date;
  musician: CommonMusicianDTOProps;
}

export class MrBeatListDTO {
  @Property({ apiProperty: { description: '아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '뮤지션 이름', type: 'string' } })
  name: string;

  @GroupTypeResDecorator()
  groupType: number;

  @Property({ apiProperty: { description: '썸네일 url', type: 'string' } })
  thumbnailUrl: string;

  @Property({ apiProperty: { description: '음원 url', type: 'string' } })
  musicUrl: string;

  @Property({ apiProperty: { description: '음원 길이', type: 'number' } })
  musicDuration: number;

  @Property({ apiProperty: { description: '장르 이름', type: 'string' } })
  genreName: string;

  @Property({ apiProperty: { description: '분위기 이름', type: 'string' } })
  moodName: string;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '가격', type: 'number' } })
  cost: number;

  @Property({ apiProperty: { description: '점수', type: 'number' } })
  score: number;

  @Property({ apiProperty: { type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: MrBeatListDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.groupType = props.groupType;
    this.thumbnailUrl = props.thumbnailUrl;
    this.musicUrl = props.musicUrl;
    this.musicDuration = props.musicDuration;
    this.genreName = props.genreName;
    this.moodName = props.moodName;
    this.createdAt = props.createdAt;
    this.cost = props.cost;
    this.score = props.score;
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindMrBeatList(data: FindMrBeatList): MrBeatListDTO {
    return new MrBeatListDTO({
      id: data.id,
      name: data.name,
      groupType: data.groupType,
      thumbnailUrl: data.thumbnail.url,
      musicUrl: data.music.url,
      musicDuration: data.music.duration,
      genreName: data.genres.at(-1).genre.name,
      moodName: data.moods.at(-1).mood.name,
      createdAt: data.createdAt,
      score:
        data.musicianService.reviews.reduce((acc, cur) => acc + cur.score, 0) / data.musicianService.reviews.length,
      cost: Math.min(...data.licenses.map((license) => license.cost)),
      musician: CommonMusicianDTO.fromFindCommonMusician(data.musicianService.musician),
    });
  }

  static fromFindSQLMrBeatList(data: FindSQLMrBeatList): MrBeatListDTO {
    return new MrBeatListDTO({
      id: data.id,
      name: data.name,
      groupType: data.groupType,
      thumbnailUrl: data.thumbnailUrl,
      musicUrl: data.musicUrl,
      musicDuration: data.musicDuration,
      genreName: data.genreName,
      moodName: data.moodName,
      createdAt: data.createdAt,
      cost: data.cost,
      score: data.score,
      musician: {
        id: data.musicianId,
        stageName: data.stageName,
        name: data.musicianName,
        groupType: data.musicianGroupType,
        isPending: data.musicianIsPending,
        isAuthorized: data.musicianIsAuthorized,
        introduction: data.musicianIntroduction,
        profileImageUrl: data.musicianProfileUrl,
      },
    });
  }
}
