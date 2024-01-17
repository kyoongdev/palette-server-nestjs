import { ApiProperty } from '@nestjs/swagger';

export interface CheckEmailResultDTOProps {
  isExists: boolean;
  email: string;
}

export class CheckEmailResultDTO {
  @ApiProperty({ description: '이메일 중복 여부' })
  isExists: boolean;

  @ApiProperty({ description: '이메일' })
  email: string;

  constructor(props: CheckEmailResultDTOProps) {
    this.isExists = props.isExists;
    this.email = props.email;
  }
}
