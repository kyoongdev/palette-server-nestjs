import { Property } from '@/utils/swagger';

export interface UpdatePasswordDTOProps {
  password: string;
  newPassword?: string;
}

export class UpdatePasswordDTO {
  @Property({ apiProperty: { description: '기존 비밀번호', type: 'string' } })
  password: string;

  @Property({ apiProperty: { description: '신규 비밀번호', type: 'string', nullable: true } })
  newPassword?: string;

  constructor(props?: UpdatePasswordDTOProps) {
    if (props) {
      this.password = props.password;
      this.newPassword = props.newPassword;
    }
  }
}
