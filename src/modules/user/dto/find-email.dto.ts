import { ApiProperty } from '@nestjs/swagger';

import { MaxLength } from 'class-validator';

export interface FindEmailDTOProps {
  name: string;
  phoneNumber: string;
}

export class FindEmailDTO {
  @ApiProperty({ description: '이름', type: 'string' })
  name: string;

  @MaxLength(11)
  @ApiProperty({ description: '전화번호', type: 'string' })
  phoneNumber: string;
}
