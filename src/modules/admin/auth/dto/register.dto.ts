import { Property } from '@/utils/swagger';

export interface AdminRegisterDTOProps {
  adminId: string;
  password: string;
}

export class AdminRegisterDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 아이디' } })
  adminId: string;

  @Property({ apiProperty: { type: 'string', description: '관리자 비밀번호' } })
  password: string;

  constructor(props?: AdminRegisterDTOProps) {
    if (props) {
      this.adminId = props.adminId;
      this.password = props.password;
    }
  }
}
