import { RegionLargeGroupDTO, RegionLargeGroupDTOProps } from '@/modules/region/dto';
import { Property } from '@/utils/swagger';

export interface AdminRegionLargeGroupDTOProps extends RegionLargeGroupDTOProps {
  order: number;
}

export class AdminRegionLargeGroupDTO extends RegionLargeGroupDTO {
  @Property({ apiProperty: { description: '지역 대그룹 순서', type: 'number' } })
  order: number;

  constructor(props: AdminRegionLargeGroupDTOProps) {
    super(props);
    this.order = props.order;
  }
}
