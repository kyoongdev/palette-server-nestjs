import { Property } from '@/utils/swagger';

export interface RegionSmallGroupDTOProps {
  id: string;
  name: string;
}

export class RegionSmallGroupDTO {
  @Property({ apiProperty: { description: '지역 소그룹 ID', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '지역 소그룹 이름', type: 'string' } })
  name: string;

  constructor(props: RegionSmallGroupDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
