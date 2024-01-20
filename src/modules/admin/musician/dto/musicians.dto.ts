import { AdminMusician } from '@/interface/musician.interface';
import { Property } from '@/utils/swagger';

export interface AdminMusiciansDTOProps {
  id: string;
  userId: string;
  stageName: string;
  name: string;
  serviceCount: number;
  createdAt: Date;
}

export class AdminMusiciansDTO {
  @Property({ apiProperty: { description: '아이디', type: 'string' } })
  id: string;

  @Property({ apiProperty: { description: '유저 아이디', type: 'string' } })
  userId: string;

  @Property({ apiProperty: { description: '활동명', type: 'string' } })
  stageName: string;

  @Property({ apiProperty: { description: '이름', type: 'string' } })
  name: string;

  @Property({ apiProperty: { description: '판매 등록 건수', type: 'number' } })
  serviceCount: number;

  @Property({ apiProperty: { description: '생성일', type: 'string', format: 'date-time' } })
  createdAt: Date;

  constructor(props: AdminMusiciansDTOProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.stageName = props.stageName;
    this.name = props.name;
    this.serviceCount = props.serviceCount;
    this.createdAt = props.createdAt;
  }

  static from(data: AdminMusician) {
    return new AdminMusiciansDTO({
      stageName: data.stageName,
      name: data.name,
      serviceCount: data._count.services,
      createdAt: data.createdAt,
      id: data.id,
      userId: data.userId,
    });
  }
}
