import { ApiProperty } from '@nestjs/swagger';

import { CommonMusicianDTO, CommonMusicianDTOProps } from '@/modules/musician/dto/common-musician.dto';
import { DateDTO, DateDTOProps } from '@/utils';

export interface CommonUserDTOProps extends DateDTOProps {
  id: string;
  email?: string;
  name?: string;
  profileImage?: string;
  musician?: CommonMusicianDTOProps;
}

export class CommonUserDTO extends DateDTO {
  @ApiProperty({ type: 'string', description: 'id' })
  id: string;

  @ApiProperty({ type: 'string', description: '이메일', nullable: true })
  email?: string;

  @ApiProperty({ type: 'string', description: '이름', nullable: true })
  name?: string;

  @ApiProperty({ type: 'string', description: '이름', nullable: true })
  role?: string;

  @ApiProperty({ type: 'string', description: '프로필 이미지', nullable: true })
  profileImage?: string;

  @ApiProperty({ type: 'string', description: '뮤지션 정보', nullable: true })
  musician?: CommonMusicianDTO | null;

  constructor(props: CommonUserDTOProps) {
    super(props);
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.profileImage = props.profileImage;
    this.musician = props.musician ? new CommonMusicianDTO(props.musician) : null;
  }
}
