import { DateDTO, DateDTOProps } from '@/utils';
import { Property } from '@/utils/swagger';

import { CommonMusicianDTO, CommonMusicianDTOProps } from './common-musician.dto';

export interface MusicianDTOProps extends CommonMusicianDTOProps, DateDTOProps {
  bankCode: string;
  bankAccount: string;
  bankAccountOwnerName: string;
  evidenceFileUrl: string;
}

export class MusicianDTO extends CommonMusicianDTO {
  @Property({ apiProperty: { description: '은행 코드', type: 'string' } })
  bankCode: string;

  @Property({ apiProperty: { description: '계좌 번호', type: 'string' } })
  bankAccount: string;

  @Property({ apiProperty: { description: '계좌주', type: 'string' } })
  bankAccountOwnerName: string;

  @Property({ apiProperty: { description: '증빙자료', type: 'string' } })
  evidenceFileUrl: string;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { description: '수정일', type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { description: '삭제일', type: 'string', format: 'date-time' } })
  deletedAt?: Date;

  constructor(props: MusicianDTOProps) {
    super(props);
    this.bankAccount = props.bankAccount;
    this.bankCode = props.bankCode;
    this.bankAccountOwnerName = props.bankAccountOwnerName;
    this.evidenceFileUrl = props.evidenceFileUrl;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
