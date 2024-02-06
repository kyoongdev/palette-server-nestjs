import { camelCase } from 'lodash';

import { FindServiceList } from '@/interface/service.interface';
import { Property } from '@/utils/swagger';

import { SERVICE_TYPE_VALUE, ServiceType } from '../validation';

export interface AdminServiceListDTOProps {
  serviceId: string;
  serviceName: string;
  marketName: ServiceType;
  createdAt: Date;
}

export class AdminServiceListDTO {
  @Property({ apiProperty: { description: '서비스 아이디', type: 'string' } })
  serviceId: string;

  @Property({ apiProperty: { description: '서비스명', type: 'string' } })
  serviceName: string;

  @Property({ apiProperty: { description: '시장명', type: 'string', enum: SERVICE_TYPE_VALUE } })
  marketName: ServiceType;

  @Property({ apiProperty: { description: '생성일', type: 'date-time' } })
  createdAt: Date;

  constructor(props: AdminServiceListDTOProps) {
    this.serviceId = props.serviceId;
    this.serviceName = props.serviceName;
    this.marketName = props.marketName;
    this.createdAt = props.createdAt;
  }

  static fromFindServiceList(data: FindServiceList): AdminServiceListDTO {
    const { id, musicianId, createdAt, ...rest } = data;

    const result = Object.entries(rest)
      .filter(([_, value]) => Boolean(value))
      .reduce<Omit<AdminServiceListDTOProps, 'serviceId'>>(
        (acc, [key, value]) => {
          if (key === 'albumArt') {
            acc.marketName = 'ALBUM_ART';
          } else if (key === 'artist') {
            acc.marketName = 'ARTIST';
          } else if (key === 'mixMastering') {
            acc.marketName = 'MIX_MASTERING';
          } else if (key === 'mrBeat') {
            acc.marketName = 'MR_BEAT';
          } else if (key === 'recording') {
            acc.marketName = 'RECORDING';
          }

          acc.serviceName = value.name;
          acc.createdAt = value.createdAt;

          return acc;
        },
        {
          serviceName: '',
          marketName: 'ALBUM_ART',
          createdAt,
        }
      );

    return new AdminServiceListDTO({
      serviceId: data.id,
      ...result,
    });
  }
}
