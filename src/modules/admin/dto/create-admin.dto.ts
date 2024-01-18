import { Property } from '@/utils/swagger';

export interface CreateAdminDTOProps {
  adminId: string;
  password: string;
}

export class CreateAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 아이디' } })
  adminId: string;

  @Property({ apiProperty: { type: 'string', description: '관리자 비밀번호' } })
  password: string;

  constructor(props?: CreateAdminDTOProps) {
    if (props) {
      this.adminId = props.adminId;
      this.password = props.password;
    }
  }
}
