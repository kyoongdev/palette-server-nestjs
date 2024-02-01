import { FindRecordingRegion } from '@/interface/recording.interface';
import { Property } from '@/utils/swagger';

export interface RecordingRegionDTOProps {
  id: string;
  regionLargeGroupId: string;
  regionLargeGroupName: string;
  regionSmallGroupId: string;
  regionSmallGroupName: string;
}

export class RecordingRegionDTO {
  @Property({ apiProperty: { description: '레코딩 지역 ID', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '레코딩 대분류 지역 ID', type: 'string' } })
  regionLargeGroupId: string;

  @Property({ apiProperty: { description: '레코딩 대분류 지역 이름', type: 'string' } })
  regionLargeGroupName: string;

  @Property({ apiProperty: { description: '레코딩 소분류 지역 ID', type: 'string' } })
  regionSmallGroupId: string;

  @Property({ apiProperty: { description: '레코딩 소분류 지역 이름', type: 'string' } })
  regionSmallGroupName: string;

  constructor(props: RecordingRegionDTOProps) {
    this.id = props.id;
    this.regionLargeGroupId = props.regionLargeGroupId;
    this.regionLargeGroupName = props.regionLargeGroupName;
    this.regionSmallGroupId = props.regionSmallGroupId;
    this.regionSmallGroupName = props.regionSmallGroupName;
  }

  static fromFindRecordingRegion(data: FindRecordingRegion) {
    return new RecordingRegionDTO({
      id: data.id,
      regionLargeGroupId: data.regionLargeGroup.id,
      regionLargeGroupName: data.regionLargeGroup.name,
      regionSmallGroupId: data.regionSmallGroup.id,
      regionSmallGroupName: data.regionSmallGroup.name,
    });
  }
}
