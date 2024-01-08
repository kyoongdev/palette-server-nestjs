import { ApiProperty } from '@nestjs/swagger';

export interface TokenDTOProps {
  accessToken: string;
  refreshToken: string;
}

export class TokenDTO {
  @ApiProperty({ name: '엑세스 토큰' })
  accessToken: string;

  @ApiProperty({ name: '리프레시 토큰' })
  refreshToken: string;

  constructor(props: TokenDTOProps) {
    this.accessToken = props.accessToken;
    this.refreshToken = props.refreshToken;
  }
}
