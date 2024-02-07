import { FindServiceWithDetailList } from '@/interface/service.interface';
import { Property } from '@/utils/swagger';

import { AlbumArtListDTO } from '../album-art/dto';
import { ArtistListDTO } from '../artist/dto';
import { MixMasteringListDTO } from '../mix-mastering/dto';
import { MrBeatListDTO } from '../mr-beat/dto/mr-beat-list.dto';
import { RecordingListDTO } from '../recording/dto';

export interface Top5DTOProps {
  albumArts: AlbumArtListDTO[];
  artists: ArtistListDTO[];
  mixMasterings: MixMasteringListDTO[];
  mrBeats: MrBeatListDTO[];
  recordings: RecordingListDTO[];
}

export class Top5DTO {
  @Property({ apiProperty: { description: '앨범아트', type: AlbumArtListDTO, isArray: true } })
  albumArts: AlbumArtListDTO[];

  @Property({ apiProperty: { description: '아티스트', type: ArtistListDTO, isArray: true } })
  artists: ArtistListDTO[];

  @Property({ apiProperty: { description: '믹스마스터링', type: MixMasteringListDTO, isArray: true } })
  mixMasterings: MixMasteringListDTO[];

  @Property({ apiProperty: { description: 'Mr Beat', type: MrBeatListDTO, isArray: true } })
  mrBeats: MrBeatListDTO[];

  @Property({ apiProperty: { description: '녹음', type: RecordingListDTO, isArray: true } })
  recordings: RecordingListDTO[];

  constructor(props: Top5DTOProps) {
    this.albumArts = props.albumArts;
    this.artists = props.artists;
    this.mixMasterings = props.mixMasterings;
    this.mrBeats = props.mrBeats;
    this.recordings = props.recordings;
  }
}
