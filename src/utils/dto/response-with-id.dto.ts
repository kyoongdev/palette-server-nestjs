import { ApiProperty } from '@nestjs/swagger';

export class ResponseWithIdDTO {
  @ApiProperty({ type: 'string' })
  id: string;

  constructor(id?: string) {
    this.id = id;
  }
}
