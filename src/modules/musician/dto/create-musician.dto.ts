import { Property } from '@/utils/swagger';

import { GroupTypeReqDecorator } from '../validators';

export interface CreateMusicianDTOProps {
  stageName: string;
  name: string;
  groupType: number;
  introduction?: string;
  bankCode: string;
  bankAccount: string;
  bankAccountOwnerName: string;
  evidenceFileId: string;
}

export class CreateMusicianDTO {
  @Property({ apiProperty: { type: 'string', description: '활동명' } })
  stageName: string;

  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @GroupTypeReqDecorator()
  groupType: number;

  @Property({ apiProperty: { type: 'string', description: '소개글', nullable: true } })
  introduction?: string;

  @Property({ apiProperty: { type: 'string', description: '은행 코드' } })
  bankCode: string;

  @Property({ apiProperty: { type: 'string', description: '계좌번호' } })
  bankAccount: string;

  @Property({ apiProperty: { type: 'string', description: '계좌주' } })
  bankAccountOwnerName: string;

  @Property({ apiProperty: { type: 'string', description: '증빙자료 파일 id' } })
  evidenceFileId: string;

  constructor(props?: CreateMusicianDTOProps) {
    if (props) {
      this.stageName = props.stageName;
      this.name = props.name;
      this.groupType = props.groupType;
      this.introduction = props.introduction;
      this.bankCode = props.bankCode;
      this.bankAccount = props.bankAccount;
      this.bankAccountOwnerName = props.bankAccountOwnerName;
      this.evidenceFileId = props.evidenceFileId;
    }
  }
}
