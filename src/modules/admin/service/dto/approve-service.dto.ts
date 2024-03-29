import { Property } from '@/utils/swagger';

import { type ServiceType, ServiceTypeReqDecorator } from '../validation';

export interface ApproveServiceDTOProps {
  serviceType: ServiceType;
}

export class ApproveServiceDTO {
  @ServiceTypeReqDecorator(true)
  serviceType: ServiceType;
}
