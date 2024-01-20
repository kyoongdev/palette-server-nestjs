import { Property } from '@/utils/swagger';

export interface CheckNicknameDTOProps {
  nickname: string;
}

export class CheckNicknameDTO {
  @Property({ apiProperty: { description: '닉네임', type: 'string' } })
  nickname: string;

  constructor(props?: CheckNicknameDTOProps) {
    if (props) {
      this.nickname = props.nickname;
    }
  }
}
