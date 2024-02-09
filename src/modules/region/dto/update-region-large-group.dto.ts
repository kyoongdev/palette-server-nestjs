import { Prisma } from '@prisma/client';

import { Property } from '@/utils/swagger';

import { CreateRegionSmallGroupDTO, CreateRegionSmallGroupDTOProps } from './create-region-small-group.dto';

export interface UpdateRegionLargeGroupDTOProps {
  name?: string;
  order?: number;
  regions?: CreateRegionSmallGroupDTOProps[];
}

export class UpdateRegionLargeGroupDTO {
  @Property({ apiProperty: { description: '지역 대그룹 이름', type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { description: '지역 대그룹 순서', type: 'number', nullable: true } })
  order?: number;

  @Property({
    apiProperty: { description: '지역 소그룹 리스트', type: CreateRegionSmallGroupDTO, isArray: true, nullable: true },
  })
  regions?: CreateRegionSmallGroupDTO[];

  constructor(props?: UpdateRegionLargeGroupDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
      this.regions = props.regions.map((region) => new CreateRegionSmallGroupDTO(region));
    }
  }

  public toUpdateArgs(): Prisma.RegionLargeGroupUpdateInput {
    return {
      name: this.name,
      order: this.order,
      regions: this.regions && {
        deleteMany: {},
        create: this.regions.map((region) => region),
      },
    };
  }
}
