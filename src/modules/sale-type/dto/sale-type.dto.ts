import { Property } from '@/utils/swagger';

export interface SaleTypeDTOProps {
  id: string;
  name: string;
}

export class SaleTypeDTO {
  @Property({ apiProperty: { description: '판매 타입 아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '판매 타입 이름', type: 'string' } })
  name: string;

  constructor(props: SaleTypeDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }
}
