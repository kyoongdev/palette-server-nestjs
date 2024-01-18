import { Property } from '@/utils/swagger';

import { CommonAdminDTO, CommonAdminDTOProps } from './common-admin.dto';

export interface AdminDTOProps extends CommonAdminDTOProps {
  password: string;
}

export class AdminDTO extends CommonAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 비밀번호' } })
  password: string;

  constructor(props: AdminDTOProps) {
    super(props);
    this.password = props.password;
  }
}
