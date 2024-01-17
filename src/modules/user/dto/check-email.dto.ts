import { ApiProperty } from '@nestjs/swagger';

export interface CheckEmailDTOProps {
  email: string;
}

export class CheckEmailDTO {
  @ApiProperty({ description: '이메일' })
  email: string;

  constructor(props?: CheckEmailDTOProps) {
    if (props) {
      this.email = props.email;
    }
  }
}
