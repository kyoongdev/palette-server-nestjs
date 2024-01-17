import { Property } from '@/utils/swagger';

export interface TokenDTOProps {
  accessToken: string;
  refreshToken: string;
}

export class TokenDTO {
  @Property({ apiProperty: { description: '엑세스 토큰' } })
  accessToken: string;

  @Property({ apiProperty: { description: '리프레시 토큰' } })
  refreshToken: string;

  constructor(props?: TokenDTOProps) {
    if (props) {
      this.accessToken = props.accessToken;
      this.refreshToken = props.refreshToken;
    }
  }
}
