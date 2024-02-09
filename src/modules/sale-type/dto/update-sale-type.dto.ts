import { Property } from '@/utils/swagger';

export interface UpdateSaleTypeDTOProps {
  name?: string;
  order?: number;
}

export class UpdateSaleTypeDTO {
  @Property({ apiProperty: { description: '판매 타입 이름', type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { description: '판매 타입 순서', type: 'number', nullable: true } })
  order?: number;

  constructor(props?: UpdateSaleTypeDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
