import { Property } from '@/utils/swagger';

export interface UpdateAdminDTOProps {
  adminId?: string;
  password?: string;
}

export class UpdateAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 아이디', nullable: true } })
  adminId?: string;

  @Property({ apiProperty: { type: 'string', description: '관리자 비밀번호', nullable: true } })
  password?: string;

  constructor(props?: UpdateAdminDTOProps) {
    if (props) {
      this.adminId = props.adminId;
      this.password = props.password;
    }
  }
}
