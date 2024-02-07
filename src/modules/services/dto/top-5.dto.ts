import { Property } from '@/utils/swagger';

import { Top5ServiceDTO, Top5ServiceDTOProps } from './top-5-service.dto';

export interface Top5DTOProps {
  albumArts: Top5ServiceDTOProps[];
  artists: Top5ServiceDTOProps[];
  mixMasterings: Top5ServiceDTOProps[];
  mrBeats: Top5ServiceDTOProps[];
  recordings: Top5ServiceDTOProps[];
}

export class Top5DTO {
  @Property({ apiProperty: { description: '앨범아트', type: Top5ServiceDTO, isArray: true } })
  albumArts: Top5ServiceDTO[];

  @Property({ apiProperty: { description: '아티스트', type: Top5ServiceDTO, isArray: true } })
  artists: Top5ServiceDTO[];

  @Property({ apiProperty: { description: '믹스마스터링', type: Top5ServiceDTO, isArray: true } })
  mixMasterings: Top5ServiceDTO[];

  @Property({ apiProperty: { description: 'Mr Beat', type: Top5ServiceDTO, isArray: true } })
  mrBeats: Top5ServiceDTO[];

  @Property({ apiProperty: { description: '녹음', type: Top5ServiceDTO, isArray: true } })
  recordings: Top5ServiceDTO[];

  constructor(props: Top5DTOProps) {
    this.albumArts = props.albumArts.map((albumArt) => new Top5ServiceDTO(albumArt));
    this.artists = props.artists.map((artist) => new Top5ServiceDTO(artist));
    this.mixMasterings = props.mixMasterings.map((mixMastering) => new Top5ServiceDTO(mixMastering));
    this.mrBeats = props.mrBeats.map((mrBeat) => new Top5ServiceDTO(mrBeat));
    this.recordings = props.recordings.map((recording) => new Top5ServiceDTO(recording));
  }
}
