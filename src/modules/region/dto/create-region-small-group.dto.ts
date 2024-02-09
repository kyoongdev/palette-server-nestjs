import { Property } from '@/utils/swagger';

export interface CreateRegionSmallGroupDTOProps {
  name: string;
}

export class CreateRegionSmallGroupDTO {
  @Property({ apiProperty: { description: '지역 소그룹 이름', type: 'string' } })
  name: string;

  constructor(props?: CreateRegionSmallGroupDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
