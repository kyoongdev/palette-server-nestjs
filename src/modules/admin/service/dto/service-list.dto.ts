import { AdminFindServiceList } from '@/interface/service.interface';
import { Property } from '@/utils/swagger';

import { SERVICE_TYPE_VALUE, ServiceType } from '../validation';
import {} from 'lodash';

export interface ServiceListDTOProps {
  serviceId: string;
  serviceName: string;
  marketName: ServiceType;
  createdAt: Date;
}

export class ServiceListDTO {
  @Property({ apiProperty: { description: '서비스 아이디', type: 'string' } })
  serviceId: string;

  @Property({ apiProperty: { description: '서비스명', type: 'string' } })
  serviceName: string;

  @Property({ apiProperty: { description: '시장명', type: 'string', enum: SERVICE_TYPE_VALUE } })
  marketName: ServiceType;

  @Property({ apiProperty: { description: '생성일', type: 'date-time' } })
  createdAt: Date;

  constructor(props: ServiceListDTOProps) {
    this.serviceId = props.serviceId;
    this.serviceName = props.serviceName;
    this.marketName = props.marketName;
    this.createdAt = props.createdAt;
  }

  static fromAdminFindServiceList(data: AdminFindServiceList): ServiceListDTO {
    const { id, musicianId, ...rest } = data;

    const result = Object.entries(rest)
      .filter(([_, value]) => Boolean(value))
      .reduce<Omit<ServiceListDTOProps, 'serviceId'>>(
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
          createdAt: new Date(),
        }
      );

    return new ServiceListDTO({
      serviceId: data.id,
      ...result,
    });
  }
}
