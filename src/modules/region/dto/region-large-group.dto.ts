import { Property } from '@/utils/swagger';

import { RegionSmallGroupDTO, RegionSmallGroupDTOProps } from './region-small-group.dto';

export interface RegionLargeGroupDTOProps {
  id: string;
  name: string;
  regions: RegionSmallGroupDTOProps[];
}

export class RegionLargeGroupDTO {
  @Property({ apiProperty: { type: 'string', description: '지역 대그룹 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '지역 대그룹 이름' } })
  name: string;

  @Property({ apiProperty: { type: RegionSmallGroupDTO, isArray: true, description: '지역 소그룹 리스트' } })
  regions: RegionSmallGroupDTO[];

  constructor(props: RegionLargeGroupDTOProps) {
    this.id = props.id;
    this.name = props.name;
    this.regions = props.regions.map((region) => new RegionSmallGroupDTO(region));
  }
}
