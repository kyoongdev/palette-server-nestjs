import { Property } from '@/utils/swagger';

export interface CreateRecordingRegionDTOProps {
  regionLargeGroupId: string;
  regionSmallGroupId?: string;
}

export class CreateRecordingRegionDTO {
  @Property({ apiProperty: { description: '레코딩 대분류 지역 ID', type: 'string' } })
  regionLargeGroupId: string;

  @Property({ apiProperty: { description: '레코딩 소분류 지역 ID', type: 'string', nullable: true } })
  regionSmallGroupId?: string;

  constructor(props?: CreateRecordingRegionDTOProps) {
    if (props) {
      this.regionLargeGroupId = props.regionLargeGroupId;
      this.regionSmallGroupId = props.regionSmallGroupId;
    }
  }
}
