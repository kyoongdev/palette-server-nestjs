import { Property } from '@/utils/swagger';

export interface LoginDTOProps {
  email: string;
  password: string;
}

export class LoginDTO {
  @Property({ apiProperty: { description: '이메일', type: 'string' } })
  email: string;

  @Property({ apiProperty: { description: '비밀번호', type: 'string' } })
  password: string;

  constructor(props?: LoginDTOProps) {
    if (props) {
      this.email = props.email;
      this.password = props.password;
    }
  }
}
