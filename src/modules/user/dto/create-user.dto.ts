import { IsEmail, MaxLength } from 'class-validator';

import { Property } from '@/utils/swagger';

export interface CreateUserDTOProps {
  email?: string;
  password?: string;
  name?: string;
  nickname?: string;
  profileImageId?: string;
  phoneNumber?: string;
  isAlarmAccepted: boolean;
}

export class CreateUserDTO {
  @IsEmail()
  @Property({ apiProperty: { description: '이메일', type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { description: '비밀번호', type: 'string', nullable: true } })
  password?: string;

  @Property({ apiProperty: { description: '이름', type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { description: '닉네임', type: 'string', nullable: true } })
  nickname?: string;

  @Property({ apiProperty: { description: '프로필 이미지 id', type: 'string', nullable: true } })
  profileImageId?: string;

  @MaxLength(11)
  @Property({ apiProperty: { description: '휴대폰번호', type: 'string', nullable: true, maxLength: 11 } })
  phoneNumber?: string;

  @Property({ apiProperty: { description: '알람 승인 여부', type: 'boolean' } })
  isAlarmAccepted: boolean;

  constructor(props?: CreateUserDTOProps) {
    if (props) {
      this.email = props.email;
      this.password = props.password;
      this.name = props.name;
      this.nickname = props.nickname;
      this.profileImageId = props.profileImageId;
      this.phoneNumber = props.phoneNumber;
      this.isAlarmAccepted = props.isAlarmAccepted;
    }
  }
}
