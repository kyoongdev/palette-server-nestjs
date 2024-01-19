import { Property } from '@/utils/swagger';

import { GroupTypeReqDecorator } from '../validators';

export interface UpdateMusicianDTOProps {
  stageName?: string;
  name?: string;
  groupType?: number;
  introduction?: string;
  bankCode?: string;
  bankAccount?: string;
  bankAccountOwnerName?: string;
  evidenceFileUrl?: string;
}

export class UpdateMusicianDTO {
  @Property({ apiProperty: { type: 'string', description: '활동명', nullable: true } })
  stageName?: string;

  @Property({ apiProperty: { type: 'string', description: '이름', nullable: true } })
  name?: string;

  @GroupTypeReqDecorator(true)
  groupType?: number;

  @Property({ apiProperty: { type: 'string', description: '소개글', nullable: true } })
  introduction?: string;

  @Property({ apiProperty: { type: 'string', description: '은행 코드', nullable: true } })
  bankCode?: string;

  @Property({ apiProperty: { type: 'string', description: '계좌번호', nullable: true } })
  bankAccount?: string;

  @Property({ apiProperty: { type: 'string', description: '계좌주', nullable: true } })
  bankAccountOwnerName?: string;

  @Property({ apiProperty: { type: 'string', description: '증빙자료', nullable: true } })
  evidenceFileUrl?: string;

  constructor(props?: UpdateMusicianDTOProps) {
    if (props) {
      this.stageName = props.stageName;
      this.name = props.name;
      this.groupType = props.groupType;
      this.introduction = props.introduction;
      this.bankCode = props.bankCode;
      this.bankAccount = props.bankAccount;
      this.bankAccountOwnerName = props.bankAccountOwnerName;
      this.evidenceFileUrl = props.evidenceFileUrl;
    }
  }
}
