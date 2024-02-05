import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

export type FindAlbumArtSort = 'POPULAR';

export class FindAlbumArtQuery extends PagingDTO {
  @Property({ apiProperty: { description: '판매 타입id', nullable: true, type: 'string' } })
  saleTypeId?: string;

  @Property({
    apiProperty: { description: '작품 이름', nullable: true, type: 'string', enum: ['POPULAR'] },
  })
  sort?: FindAlbumArtSort;
}
