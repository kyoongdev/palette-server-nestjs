import { Property } from '@/utils/swagger';

import { type ServiceType, ServiceTypeReqDecorator } from '../validation';

export interface RejectServiceDTOProps {
  serviceType: ServiceType;
}

export class RejectServiceDTO {
  @ServiceTypeReqDecorator(true)
  serviceType: ServiceType;
}
