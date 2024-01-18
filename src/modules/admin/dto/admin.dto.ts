import { Property } from '@/utils/swagger';

export interface AdminDTOProps {
  id: string;
  adminId: string;
}

export class AdminDTO {
  @Property({ apiProperty: { type: 'string', description: '관리자 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '관리자 아이디' } })
  adminId: string;

  constructor(props: AdminDTOProps) {
    this.id = props.id;
    this.adminId = props.adminId;
  }
}
