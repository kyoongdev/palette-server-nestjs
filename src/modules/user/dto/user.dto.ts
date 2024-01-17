import { Property } from '@/utils/swagger';

import { CommonUserDTO, CommonUserDTOProps } from './common-user.dto';

export interface UserDTOProps extends CommonUserDTOProps {
  phoneNumber?: string;
  isAlarmAccepted: boolean;
}

export class UserDTO extends CommonUserDTO {
  @Property({ apiProperty: { type: 'string', description: '휴대폰 번호', nullable: true } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'boolean', description: '알람 수신 여부' } })
  isAlarmAccepted: boolean;

  constructor(props: UserDTOProps) {
    super(props);
    this.phoneNumber = props.phoneNumber;
    this.isAlarmAccepted = props.isAlarmAccepted;
  }
}
