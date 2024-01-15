import { ApiProperty } from '@nestjs/swagger';

import { GroupTypeResDecorator } from '@/common/validator/group-type.validator';

export interface CommonMusicianDTOProps {
  id: string;
  stageName: string;
  name: string;
  groupType: number;
  introduction?: string;
}
export class CommonMusicianDTO {
  @ApiProperty({ description: 'id', type: 'string' })
  id: string;

  @ApiProperty({ description: '활동명', type: 'string' })
  stageName: string;

  @ApiProperty({ description: '본명', type: 'string' })
  name: string;

  @GroupTypeResDecorator()
  groupType: number;

  @ApiProperty({ description: '세부 설명', type: 'string', nullable: true })
  introduction?: string;

  constructor(props: CommonMusicianDTOProps) {
    this.id = props.id;
    this.stageName = props.stageName;
    this.name = props.name;
    this.groupType = props.groupType;
  }
}
