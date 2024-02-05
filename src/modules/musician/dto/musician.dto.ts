import { FindCommonMusician, FindMusician } from '@/interface/musician.interface';
import { DateDTO, DateDTOProps } from '@/utils';
import { Property } from '@/utils/swagger';

import { CommonMusicianDTO, CommonMusicianDTOProps } from './common-musician.dto';
import { MusicianEvidenceFileDTO, MusicianEvidenceFileDTOProps } from './musician-evidence-fil.dto';

export interface MusicianDTOProps extends CommonMusicianDTOProps, DateDTOProps {
  bankCode: string;
  bankAccount: string;
  bankAccountOwnerName: string;
  evidenceFile: MusicianEvidenceFileDTOProps;
}

export class MusicianDTO extends CommonMusicianDTO {
  @Property({ apiProperty: { description: '은행 코드', type: 'string' } })
  bankCode: string;

  @Property({ apiProperty: { description: '계좌 번호', type: 'string' } })
  bankAccount: string;

  @Property({ apiProperty: { description: '계좌주', type: 'string' } })
  bankAccountOwnerName: string;

  @Property({ apiProperty: { description: '증빙자료', type: MusicianEvidenceFileDTO } })
  evidenceFile: MusicianEvidenceFileDTO;

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
    this.evidenceFile = new MusicianEvidenceFileDTO(props.evidenceFile);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static fromFindMusician(data: FindMusician): MusicianDTOProps {
    return {
      ...data,
      profileImageUrl: data.user.profileImage ? data.user.profileImage.url : null,
      evidenceFile: data.evidenceFile,
    };
  }
}
