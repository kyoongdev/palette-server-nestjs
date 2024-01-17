import { MaxLength } from 'class-validator';

import { Property } from '@/utils/swagger';

export interface FindEmailDTOProps {
  name: string;
  phoneNumber: string;
}

export class FindEmailDTO {
  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @MaxLength(11)
  @Property({ apiProperty: { description: '전화번호', type: 'string' } })
  phoneNumber: string;
}
