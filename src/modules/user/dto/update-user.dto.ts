import { ApiProperty } from '@nestjs/swagger';

import { MaxLength } from 'class-validator';

export interface UpdateUserDTOProps {
  email?: string;
  password?: string;
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
  isAlarmAccepted: boolean;
}

export class UpdateUserDTO {
  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  email?: string;

  @ApiProperty({ description: '비밀번호', type: 'string', nullable: true })
  password?: string;

  @ApiProperty({ description: '이름', type: 'string', nullable: true })
  name?: string;

  @ApiProperty({ description: '프로필 이미지', type: 'string', nullable: true })
  profileImage?: string;

  @MaxLength(11)
  @ApiProperty({ description: '휴대폰번호', type: 'string', nullable: true, maxLength: 11 })
  phoneNumber?: string;

  @ApiProperty({ description: '알람 승인 여부', type: 'boolean', nullable: true })
  isAlarmAccepted?: boolean;

  constructor(props?: UpdateUserDTOProps) {
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
