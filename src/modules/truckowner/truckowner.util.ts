import {
  VerifiedStatus,
  TruckService,
  TruckStatus,
} from '@/modules/truckowner/truckowner.constants';

export const getVerifiedStatus = (t: any, key: any) => {
  return t(VerifiedStatus.find((item) => item.key === key)?.label);
};

export const getTruckServiceType = (t: any, key: any) => {
  return t(TruckService.find((item) => item.key === key)?.label);
};

export const getTruckStatus = (t: any, key: any) => {
  return t(TruckStatus.find((item) => item.key === key)?.label);
};
