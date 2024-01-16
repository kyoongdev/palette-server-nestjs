import { ApiProperty } from '@nestjs/swagger';

export interface CreateUserDTOProps {
  email?: string;
  password?: string;
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
  isAlarmAccepted: boolean;
}

export class CreateUserDTO {
  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  email?: string;

  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  password?: string;

  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  name?: string;

  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  profileImage?: string;

  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  phoneNumber?: string;

  @ApiProperty({ description: '이메일', type: 'string', nullable: true })
  isAlarmAccepted: boolean;

  constructor() {}
}
