import { ApiProperty } from '@nestjs/swagger';

import { MaxLength } from 'class-validator';

import { CreateUserDTOProps } from '@/modules/user/dto';

export interface RegisterDTOProps extends Required<CreateUserDTOProps> {}

export class RegisterDTO {
  @ApiProperty({ description: '이메일', type: 'string' })
  email: string;

  @ApiProperty({ description: '비밀번호', type: 'string' })
  password: string;

  @ApiProperty({ description: '이름', type: 'string' })
  name: string;

  @ApiProperty({ description: '프로필 이미지', type: 'string' })
  profileImage: string;

  @MaxLength(11)
  @ApiProperty({ description: '휴대폰번호', type: 'string', maxLength: 11 })
  phoneNumber: string;

  @ApiProperty({ description: '알람 승인 여부', type: 'boolean' })
  isAlarmAccepted: boolean;

  constructor(props?: CreateUserDTOProps) {
    if (props) {
      this.email = props.email;
      this.password = props.password;
      this.name = props.name;
      this.profileImage = props.profileImage;
      this.phoneNumber = props.phoneNumber;
      this.isAlarmAccepted = props.isAlarmAccepted;
    }
  }
}
