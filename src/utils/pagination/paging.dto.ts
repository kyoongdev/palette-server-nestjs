import { ApiProperty } from '@nestjs/swagger';

export interface SkipTake {
  skip: number;
  take: number;
}

export class PagingDTO {
  @ApiProperty({ type: 'number', minimum: 1, default: 1 })
  page: number;

  @ApiProperty({ type: 'number', minimum: 1, default: 20 })
  limit: number;

  constructor(page: number, limit: number) {
    this.page = page;
    this.limit = limit;
  }

  public getSkipTake(): SkipTake {
    const take = Number(this.limit) || 20;
    const skip = (Number(this.page) - 1) * take;

    return { skip, take };
  }

  public getSqlPaging(): PagingDTO {
    return {
      ...this,
      page: (this.page ? this.page - 1 : 1) * (this.limit || 1),
    };
  }
}
