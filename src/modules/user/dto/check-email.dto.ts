import { Property } from '@/utils/swagger';

export interface CheckEmailDTOProps {
  email: string;
}

export class CheckEmailDTO {
  @Property({ apiProperty: { description: '이메일' } })
  email: string;

  constructor(props?: CheckEmailDTOProps) {
    if (props) {
      this.email = props.email;
    }
  }
}
