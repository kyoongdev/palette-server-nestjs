import { ApiProperty } from '@nestjs/swagger';

import { PagingMetaDTO, PagingMetaDTOInterface } from './meta.dto';

export class PaginationDTO<T extends object> {
  @ApiProperty({ isArray: true })
  data: T[];

  @ApiProperty({ type: PagingMetaDTO })
  paging: PagingMetaDTO;

  constructor(data: T[], { paging, count }: PagingMetaDTOInterface) {
    this.data = data;
    this.paging = new PagingMetaDTO({ paging, count });
  }
}
