import { Property } from '@/utils/swagger';

export interface CommonAdminDTOProps {
  id: string;
  adminId: string;
}

export class CommonAdminDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '관리자 아이디' } })
  adminId: string;

  constructor(props: CommonAdminDTOProps) {
    this.id = props.id;
    this.adminId = props.adminId;
  }
}
