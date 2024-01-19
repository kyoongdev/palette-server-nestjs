import { Property } from '@/utils/swagger';

export interface AdminMusicianCountDTOProps {
  total: number;
  artists: number;
  mrBeat: number;
  recording: number;
  mixMastering: number;
  albumArt: number;
}

export class AdminMusicianCountDTO {
  @Property({ apiProperty: { description: '총 뮤지션 수', type: 'number' } })
  total: number;

  @Property({ apiProperty: { description: '아티스트 수', type: 'number' } })
  artists: number;

  @Property({ apiProperty: { description: 'MR/Beat 수', type: 'number' } })
  mrBeat: number;

  @Property({ apiProperty: { description: '녹음 수', type: 'number' } })
  recording: number;

  @Property({ apiProperty: { description: '믹스/마스터링 수', type: 'number' } })
  mixMastering: number;

  @Property({ apiProperty: { description: '앨범 아트 수', type: 'number' } })
  albumArt: number;

  constructor(props: AdminMusicianCountDTOProps) {
    this.total = props.total;
    this.artists = props.artists;
    this.mrBeat = props.mrBeat;
    this.recording = props.recording;
    this.mixMastering = props.mixMastering;
    this.albumArt = props.albumArt;
  }
}
