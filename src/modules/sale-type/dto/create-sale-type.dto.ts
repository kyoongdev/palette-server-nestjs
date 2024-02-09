import { Property } from '@/utils/swagger';

export interface CreateSaleTypeDTOProps {
  name: string;
  order?: number;
}

export class CreateSaleTypeDTO {
  @Property({ apiProperty: { description: '판매 타입 이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '판매 타입 순서', type: 'number', nullable: true } })
  order?: number;

  constructor(props?: CreateSaleTypeDTOProps) {
    if (props) {
      this.name = props.name;
      this.order = props.order;
    }
  }
}
