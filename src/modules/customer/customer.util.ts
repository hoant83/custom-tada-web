import { VerifiedStatus } from '@/modules/customer/customer.constants';

export const getVerifiedStatus = (t: any, key: any) => {
  return t(VerifiedStatus.find((item) => item.key === key)?.label);
};
