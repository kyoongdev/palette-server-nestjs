import { MixMasteringSort } from '@/interface/mix-mastering';
import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

export class FindMixMasteringQuery extends PagingDTO {
  @Property({ apiProperty: { description: '장르 id', nullable: true, type: 'string' } })
  genreId?: string;

  @Property({ apiProperty: { description: '정렬', type: 'string', nullable: true, enum: ['POPULAR'] } })
  sort?: MixMasteringSort;
}
