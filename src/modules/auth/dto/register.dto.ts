import { IsEmail, MaxLength } from 'class-validator';

import { CreateUserDTOProps } from '@/modules/user/dto';
import { Property } from '@/utils/swagger';

export interface RegisterDTOProps extends Required<CreateUserDTOProps> {}

export class RegisterDTO {
  @IsEmail()
  @Property({ apiProperty: { description: '이메일', type: 'string' } })
  email: string;

  @Property({ apiProperty: { description: '비밀번호', type: 'string' } })
  password: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @MaxLength(11)
  @Property({ apiProperty: { description: '휴대폰번호', type: 'string', maxLength: 11 } })
  phoneNumber: string;

  @Property({ apiProperty: { description: '알람 승인 여부', type: 'boolean' } })
  isAlarmAccepted: boolean;

  constructor(props?: CreateUserDTOProps) {
    if (props) {
      this.email = props.email;
      this.password = props.password;
      this.name = props.name;
      this.phoneNumber = props.phoneNumber;
      this.isAlarmAccepted = props.isAlarmAccepted;
    }
  }
}
