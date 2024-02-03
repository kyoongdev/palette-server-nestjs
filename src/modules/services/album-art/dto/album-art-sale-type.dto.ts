import { Property } from '@/utils/swagger';

export interface AlbumArtSaleTypeDTOProps {
  saleTypeId: string;
  name: string;
}

export class AlbumArtSaleTypeDTO {
  @Property({ apiProperty: { description: '판매 타입 id', type: 'string' } })
  saleTypeId: string;

  @Property({ apiProperty: { description: '판매 타입 이름', type: 'string' } })
  name: string;

  constructor(props: AlbumArtSaleTypeDTO) {
    this.saleTypeId = props.saleTypeId;
    this.name = props.name;
  }
}
