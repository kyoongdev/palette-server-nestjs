import { Prisma } from '@prisma/client';

import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

type FindArtistSort = 'POPULARITY';

export class FindArtistListQuery extends PagingDTO {
  @Property({
    apiProperty: { type: 'string', description: '판매 유형 id (전체는 undefined)', nullable: true },
  })
  saleTypeId?: string;

  @Property({
    apiProperty: { type: 'string', description: '순서', nullable: true, enum: ['POPULARITY'] },
  })
  sort?: FindArtistSort;

  public toFindManyArgs(): Prisma.ArtistFindManyArgs {
    return {
      where: {
        ...(this.saleTypeId && {
          saleTypes: {
            some: {
              saleTypeId: this.saleTypeId,
            },
          },
        }),
      },
      orderBy: this.sort && {
        musicianService: {
          reviews: {
            _count: 'asc',
          },
        },
      },
    };
  }
}
