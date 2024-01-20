import { Property } from '@/utils/swagger';

export interface CheckNicknameResultDTOProps {
  nickname: string;
  isExists: boolean;
}

export class CheckNicknameResultDTO {
  @Property({ apiProperty: { description: '닉네임', type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { description: '존재 여부', type: 'boolean' } })
  isExists: boolean;

  constructor(props: CheckNicknameResultDTOProps) {
    this.nickname = props.nickname;
    this.isExists = props.isExists;
  }
}
