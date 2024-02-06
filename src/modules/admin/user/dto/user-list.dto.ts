import { Role, RoleType } from '@/interface/token.interface';
import { FindCommonUser } from '@/interface/user.interface';
import { Property } from '@/utils/swagger';

export interface AdminUserListDTOProps {
  id: string;
  nickname: string;
  name: string;
  role: Exclude<RoleType, 'ADMIN'>;
  createdAt: Date;
}

export class AdminUserListDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '닉네임' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({
    apiProperty: {
      type: 'string',
      description: '유저 권한',
      enum: Object.values(Role).filter((role) => role !== 'ADMIN'),
    },
  })
  role: Exclude<RoleType, 'ADMIN'>;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '가입일' } })
  createdAt: Date;

  constructor(props: AdminUserListDTOProps) {
    this.id = props.id;
    this.nickname = props.nickname;
    this.name = props.name;
    this.role = props.role;
    this.createdAt = props.createdAt;
  }

  static fromFindCommonUser(user: FindCommonUser) {
    return new AdminUserListDTO({
      id: user.id,
      nickname: user.nickname,
      name: user.name,
      role: user.musician ? 'MUSICIAN' : 'USER',
      createdAt: user.createdAt,
    });
  }
}
