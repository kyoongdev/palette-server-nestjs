import { ApiProperty } from '@nestjs/swagger';

import { CommonUserDTO, CommonUserDTOProps } from './common-user.dto';

export interface UserDTOProps extends CommonUserDTOProps {
  phoneNumber?: string;
  isAlarmAccepted: boolean;
}

export class UserDTO extends CommonUserDTO {
  @ApiProperty({ type: 'string', description: '휴대폰 번호', nullable: true })
  phoneNumber?: string;

  @ApiProperty({ type: 'boolean', description: '알람 수신 여부' })
  isAlarmAccepted: boolean;

  constructor(props: UserDTOProps) {
    super(props);
    this.phoneNumber = props.phoneNumber;
    this.isAlarmAccepted = props.isAlarmAccepted;
  }
}
