import { FindMrBeat } from '@/interface/mr-beat.interface';
import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto';
import { GroupTypeResDecorator } from '@/modules/musician/validators';
import { Property } from '@/utils/swagger';

import { MrBeatContactDTO, MrBeatContactDTOProps } from './mr-beat-contact.dto';
import { MrBeatLicenseDTO, MrBeatLicenseDTOProps } from './mr-beat-license.dto';

export interface MrBeatDTOProps {
  id: string;
  name: string;
  groupType: number;
  thumbnailUrl: string;
  musicUrl: string;
  musicDuration: number;
  genreName: string;
  moodName: string;
  createdAt: Date;
  contacts: MrBeatContactDTOProps[];
  licenses: MrBeatLicenseDTOProps[];
  musician: CommonMusicianDTOProps;
}

export class MrBeatDTO {
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

  @Property({ apiProperty: { type: MrBeatContactDTO, isArray: true } })
  contacts: MrBeatContactDTO[];

  @Property({ apiProperty: { type: MrBeatLicenseDTO, isArray: true } })
  licenses: MrBeatLicenseDTO[];

  @Property({ apiProperty: { type: CommonMusicianDTO } })
  musician: CommonMusicianDTO;

  constructor(props: MrBeatDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.groupType = props.groupType;
    this.thumbnailUrl = props.thumbnailUrl;
    this.musicUrl = props.musicUrl;
    this.genreName = props.genreName;
    this.moodName = props.moodName;
    this.createdAt = props.createdAt;
    this.contacts = props.contacts.map((contact) => new MrBeatContactDTO(contact));
    this.licenses = props.licenses.map((license) => new MrBeatLicenseDTO(license));
    this.musician = new CommonMusicianDTO(props.musician);
  }

  static fromFindMrBeat(data: FindMrBeat) {
    return new MrBeatDTO({
      id: data.id,
      name: data.name,
      groupType: data.groupType,
      thumbnailUrl: data.thumbnail.url,
      musicUrl: data.music.url,
      musicDuration: data.music.duration,
      genreName: data.genres.at(-1).genre.name,
      moodName: data.moods.at(-1).mood.name,
      createdAt: data.createdAt,
      contacts: data.contacts.map(MrBeatContactDTO.fromFindMrBeatContact),
      licenses: data.licenses.map(MrBeatLicenseDTO.fromFindMrBeatLicense),
      musician: CommonMusicianDTO.fromFindCommonMusician(data.musicianService.musician),
    });
  }
}
