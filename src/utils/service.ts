import { AllService, ServiceStatus } from '@/interface/service.interface';

export const getServiceStatus = (service: AllService): ServiceStatus => {
  if (service.isSaleStopped) {
    return 'STOPPED';
  } else if (!service.isPending && !service.isAuthorized) {
    return 'REJECTED';
  } else if (service.isPending) {
    return 'PENDING';
  } else return 'ON_SALE';
};

export const getSQLServiceStatus = (data: {
  isPending: boolean;
  isAuthorized: boolean;
  isSaleStopped: boolean;
}): ServiceStatus => {
  if (data.isSaleStopped) {
    return 'STOPPED';
  } else if (!data.isPending && !data.isAuthorized) {
    return 'REJECTED';
  } else if (data.isPending) {
    return 'PENDING';
  } else return 'ON_SALE';
};
