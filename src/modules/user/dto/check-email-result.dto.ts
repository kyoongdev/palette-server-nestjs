import { Property } from '@/utils/swagger';

export interface CheckEmailResultDTOProps {
  isExists: boolean;
  email: string;
}

export class CheckEmailResultDTO {
  @Property({ apiProperty: { description: '이메일 중복 여부' } })
  isExists: boolean;

  @Property({ apiProperty: { description: '이메일' } })
  email: string;

  constructor(props: CheckEmailResultDTOProps) {
    this.isExists = props.isExists;
    this.email = props.email;
  }
}
