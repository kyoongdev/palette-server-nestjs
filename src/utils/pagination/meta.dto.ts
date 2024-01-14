import { ApiProperty } from '@nestjs/swagger';

import { isNaN } from 'lodash';

import { PagingDTO } from './paging.dto';

export interface PagingMetaDTOInterface {
  paging: PagingDTO;
  count: number;
}

export class PagingMetaDTO {
  @ApiProperty({ type: 'number' })
  total: number;

  @ApiProperty({ type: 'number' })
  page: number;

  @ApiProperty({ type: 'number' })
  limit: number;

  @ApiProperty({ type: 'number' })
  skip: number;

  @ApiProperty({ type: 'boolean' })
  hasPrev: boolean;

  @ApiProperty({ type: 'boolean' })
  hasNext: boolean;

  constructor({ paging, count }: PagingMetaDTOInterface) {
    this.total = count;
    this.page = isNaN(Number(paging.page)) ? 1 : Number(paging.page);
    this.limit = isNaN(Number(paging.limit)) ? 10 : Number(paging.limit);
    this.skip = paging.getSkipTake().skip;
    this.hasPrev = this.page > 1;
    this.hasNext = this.page * this.limit < count;
  }
}
