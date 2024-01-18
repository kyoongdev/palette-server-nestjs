import { Property } from '@/utils/swagger';

export interface AdminLoginDTOProps {
  adminId: string;
  password: string;
}

export class AdminLoginDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 아이디' } })
  adminId: string;

  @Property({ apiProperty: { type: 'string', description: '관리자 비밀번호' } })
  password: string;

  constructor(props?: AdminLoginDTOProps) {
    if (props) {
      this.adminId = props.adminId;
      this.password = props.password;
    }
  }
}
