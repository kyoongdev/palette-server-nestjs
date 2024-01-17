import { IsEmail, MaxLength } from 'class-validator';

import { Property } from '@/utils/swagger';

export interface UpdateUserDTOProps {
  email?: string;
  name?: string;
  profileImage?: string;
  phoneNumber?: string;
  isAlarmAccepted: boolean;
}

export class UpdateUserDTO {
  @IsEmail()
  @Property({ apiProperty: { description: '이메일', type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { description: '이름', type: 'string', nullable: true } })
  name?: string;

  @Property({ apiProperty: { description: '프로필 이미지', type: 'string', nullable: true } })
  profileImage?: string;

  @MaxLength(11)
  @Property({ apiProperty: { description: '휴대폰번호', type: 'string', nullable: true, maxLength: 11 } })
  phoneNumber?: string;

  @Property({ apiProperty: { description: '알람 승인 여부', type: 'boolean', nullable: true } })
  isAlarmAccepted?: boolean;

  constructor(props?: UpdateUserDTOProps) {
    if (props) {
      this.email = props.email;
      this.name = props.name;
      this.profileImage = props.profileImage;
      this.phoneNumber = props.phoneNumber;
      this.isAlarmAccepted = props.isAlarmAccepted;
    }
  }
}
