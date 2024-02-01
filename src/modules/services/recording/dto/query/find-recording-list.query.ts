import { PagingDTO } from '@/utils/pagination';
import { Property, ToBoolean } from '@/utils/swagger';

export class FindRecordingListQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true } })
  isEngineerSupported?: boolean;

  @Property({ apiProperty: { type: 'string', description: '지역 대그룹 아이디', nullable: true } })
  regionLargeGroupId?: string;

  @Property({ apiProperty: { type: 'string', description: '지역 소그룹 아이디', nullable: true } })
  regionSmallGroupId?: string;
}
