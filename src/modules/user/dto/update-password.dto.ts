import { ApiProperty } from '@nestjs/swagger';

export interface UpdatePasswordDTOProps {
  password: string;
  newPassword?: string;
}

export class UpdatePasswordDTO {
  @ApiProperty({ description: '기존 비밀번호', type: 'string' })
  password: string;

  @ApiProperty({ description: '신규 비밀번호', type: 'string', nullable: true })
  newPassword?: string;

  constructor(props?: UpdatePasswordDTOProps) {
    if (props) {
      this.password = props.password;
      this.newPassword = props.newPassword;
    }
  }
}
