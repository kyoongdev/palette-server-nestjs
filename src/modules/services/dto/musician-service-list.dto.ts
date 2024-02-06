import { FindServiceWithDetailList, ServiceType } from '@/interface/service.interface';
import { SERVICE_TYPE_VALUE } from '@/modules/admin/service/validation';
import { Property } from '@/utils/swagger';

import { AlbumArtListDTO } from '../album-art/dto';
import { ArtistListDTO } from '../artist/dto';
import { MixMasteringListDTO } from '../mix-mastering/dto';
import { MrBeatListDTO } from '../mr-beat/dto/mr-beat-list.dto';
import { RecordingListDTO } from '../recording/dto';

export interface MusicianServiceListDTOProps {
  id: string;
  type: ServiceType;
  albumArt?: AlbumArtListDTO;
  artist?: ArtistListDTO;
  mixMastering?: MixMasteringListDTO;
  mrBeat?: MrBeatListDTO;
  recording?: RecordingListDTO;
}

export class MusicianServiceListDTO {
  @Property({ apiProperty: { description: '서비스 아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '서비스 타입', type: 'string', enum: SERVICE_TYPE_VALUE } })
  type: ServiceType;

  @Property({ apiProperty: { description: '앨범아트', type: AlbumArtListDTO, nullable: true } })
  albumArt?: AlbumArtListDTO;

  @Property({ apiProperty: { description: '아티스트', type: ArtistListDTO, nullable: true } })
  artist?: ArtistListDTO;

  @Property({ apiProperty: { description: '믹스마스터링', type: MixMasteringListDTO, nullable: true } })
  mixMastering?: MixMasteringListDTO;

  @Property({ apiProperty: { description: 'Mr Beat', type: MrBeatListDTO, nullable: true } })
  mrBeat?: MrBeatListDTO;

  @Property({ apiProperty: { description: '녹음', type: RecordingListDTO, nullable: true } })
  recording?: RecordingListDTO;

  constructor(props: MusicianServiceListDTOProps) {
    this.id = props.id;
    this.type = props.type;
    this.albumArt = props.albumArt ?? undefined;
    this.artist = props.artist ?? undefined;
    this.mixMastering = props.mixMastering ?? undefined;
    this.mrBeat = props.mrBeat ?? undefined;
    this.recording = props.recording ?? undefined;
  }

  static fromFindServiceWithDetailList(data: FindServiceWithDetailList): MusicianServiceListDTO {
    const { id, albumArt, artist, mixMastering, mrBeat, recording } = data;
    let type: ServiceType = 'ALBUM_ART';
    if (albumArt) {
      type = 'ALBUM_ART';
    } else if (artist) {
      type = 'ARTIST';
    } else if (mixMastering) {
      type = 'MIX_MASTERING';
    } else if (mrBeat) {
      type = 'MR_BEAT';
    } else if (recording) {
      type = 'RECORDING';
    }

    return new MusicianServiceListDTO({
      id,
      type,
      albumArt: albumArt && AlbumArtListDTO.fromFindAlbumArtList(albumArt),
      artist: artist && ArtistListDTO.fromFindArtistList(artist),
      mixMastering: mixMastering && MixMasteringListDTO.fromFindMixMasteringList(mixMastering),
      mrBeat: mrBeat && MrBeatListDTO.fromFindMrBeatList(mrBeat),
      recording: recording && RecordingListDTO.fromFindRecordingList(recording),
    });
  }
}
