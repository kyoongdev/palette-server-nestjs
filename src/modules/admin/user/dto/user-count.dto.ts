import { Property } from '@/utils/swagger';

export interface AdminUserCountDTOProps {
  totalCount: number;
  userCount: number;
  musicianCount: number;
}

export class AdminUserCountDTO {
  @Property({ apiProperty: { type: 'number', description: '전체 유저 수' } })
  totalCount: number;

  @Property({ apiProperty: { type: 'number', description: '일반 유저 수' } })
  userCount: number;

  @Property({ apiProperty: { type: 'number', description: '뮤지션 수' } })
  musicianCount: number;

  constructor(props: AdminUserCountDTOProps) {
    this.totalCount = props.totalCount;
    this.userCount = props.userCount;
    this.musicianCount = props.musicianCount;
  }
}
