import { ApiProperty } from '@nestjs/swagger';

export interface DateDTOProps {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class DateDTO {
  @ApiProperty({ type: 'string', format: 'date-time' })
  createdAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  updatedAt: Date;

  @ApiProperty({ type: 'string', format: 'date-time' })
  deletedAt: Date;

  constructor(props?: DateDTOProps) {
    if (props) {
      this.createdAt = props.createdAt;
      this.updatedAt = props.updatedAt;
      this.deletedAt = props.deletedAt;
    }
  }
}
