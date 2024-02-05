import { Property } from '@/utils/swagger';

export interface ServiceCountDTOProps {
  totalCount: number;
  artistCount: number;
  mixMasteringCount: number;
  albumArtCount: number;
  recordingCount: number;
  mrBeatCount: number;
}

export class ServiceCountDTO {
  @Property({ apiProperty: { type: 'number', description: '전체 서비스 수' } })
  totalCount: number;

  @Property({ apiProperty: { type: 'number', description: '아티스트 서비스 수' } })
  artistCount: number;

  @Property({ apiProperty: { type: 'number', description: '믹스마스터링 서비스 수' } })
  mixMasteringCount: number;

  @Property({ apiProperty: { type: 'number', description: '앨범아트 서비스 수' } })
  albumArtCount: number;

  @Property({ apiProperty: { type: 'number', description: '녹음 서비스 수' } })
  recordingCount: number;

  @Property({ apiProperty: { type: 'number', description: '미스터비트 서비스 수' } })
  mrBeatCount: number;

  constructor(props: ServiceCountDTOProps) {
    this.totalCount = props.totalCount;
    this.artistCount = props.artistCount;
    this.mixMasteringCount = props.mixMasteringCount;
    this.albumArtCount = props.albumArtCount;
    this.recordingCount = props.recordingCount;
    this.mrBeatCount = props.mrBeatCount;
  }
}
