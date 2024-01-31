import { FindArtistSaleTypeBridge } from '@/interface/artist.interface';
import { Property } from '@/utils/swagger';

export interface ArtistSaleTypeDTOProps {
  id: string;
  name: string;
}

export class ArtistSaleTypeDTO {
  @Property({ apiProperty: { description: '아티스트 판매 타입 아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '아티스트 판매 타입 이름', type: 'string' } })
  name: string;

  constructor(props: ArtistSaleTypeDTOProps) {
    this.id = props.id;
    this.name = props.name;
  }

  static fromFindArtistSaleType(data: FindArtistSaleTypeBridge): ArtistSaleTypeDTO {
    return new ArtistSaleTypeDTO({
      id: data.saleType.id,
      name: data.saleType.name,
    });
  }
}
