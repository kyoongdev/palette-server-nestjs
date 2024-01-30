import { Prisma } from '@prisma/client';

import { GroupTypeReqDecorator } from '@/modules/musician/validators';
import { PagingDTO } from '@/utils/pagination';
import { Property } from '@/utils/swagger';

type FindMrBeatSort = 'POPULARITY';

export class FindMrBeatsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '장르 id', nullable: true } })
  genreId?: string;

  @Property({ apiProperty: { type: 'string', description: '분위기 id', nullable: true } })
  moodId?: string;

  @GroupTypeReqDecorator(true)
  groupType?: number;

  @Property({ apiProperty: { type: 'string', description: '순서', nullable: true, enum: ['POPULARITY'] } })
  sort?: FindMrBeatSort;

  public toFindManyArgs(): Prisma.MrBeatFindManyArgs {
    return {
      where: {
        ...(this.genreId && {
          genres: {
            some: {
              genreId: this.genreId,
            },
          },
        }),
        ...(this.moodId && {
          moods: {
            some: {
              moodId: this.moodId,
            },
          },
        }),
        groupType: this.groupType,
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
