import { Property } from '@/utils/swagger';

export interface CreateMixMasteringMusicDTOProps {
  isBefore: boolean;
  isAfter: boolean;
  musicId: string;
}

export class CreateMixMasteringMusicDTO {
  @Property({ apiProperty: { description: '작업전 여부', type: 'boolean' } })
  isBefore: boolean;

  @Property({ apiProperty: { description: '작업후 여부', type: 'boolean' } })
  isAfter: boolean;

  @Property({ apiProperty: { description: '음악 아이디', type: 'string' } })
  musicId: string;

  constructor(props?: CreateMixMasteringMusicDTOProps) {
    if (props) {
      this.isBefore = props.isBefore;
      this.isAfter = props.isAfter;
      this.musicId = props.musicId;
    }
  }
}
