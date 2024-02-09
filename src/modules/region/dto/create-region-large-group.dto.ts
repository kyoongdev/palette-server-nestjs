import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateRegionSmallGroupDTO, CreateRegionSmallGroupDTOProps } from './create-region-small-group.dto';

export interface CreateRegionLargeGroupDTOProps {
  name: string;
  order?: number;
  regions: CreateRegionSmallGroupDTOProps[];
}

export class CreateRegionLargeGroupDTO {
  @Property({ apiProperty: { description: '지역 대그룹 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '지역 대그룹 순서', type: 'number' } })
  order: number;

  @Property({ apiProperty: { description: '지역 소그룹 리스트', type: CreateRegionSmallGroupDTO, isArray: true } })
  regions: CreateRegionSmallGroupDTO[];

  constructor(props?: CreateRegionLargeGroupDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
      this.regions = props.regions.map((region) => new CreateRegionSmallGroupDTO(region));
    }
  }

  public toCreateArgs(): Prisma.RegionLargeGroupCreateInput {
    return {
      name: this.name,
      order: this.order,
      regions: {
        create: this.regions.map((region) => region),
      },
    };
  }
}
