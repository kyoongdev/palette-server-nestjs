import { SaleTypeDTO, SaleTypeDTOProps } from '@/modules/sale-type/dto';
import { Property } from '@/utils/swagger';

export interface AdminSaleTypeDTOProps extends SaleTypeDTOProps {
  order: number;
}

export class AdminSaleTypeDTO extends SaleTypeDTO {
  @Property({ apiProperty: { description: '판매 타입 순서', type: 'number' } })
  order: number;

  constructor(props: AdminSaleTypeDTOProps) {
    super(props);
    this.order = props.order;
  }
}
