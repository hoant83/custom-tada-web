import { ORDER_STATUS } from '@/modules/order/order.enum';
import { OrderStatus } from './order.constants';

export const isPossibleToDelete = (orderStatus: any) => {
  return (
    orderStatus === ORDER_STATUS.CREATED ||
    orderStatus === ORDER_STATUS.CANCELED ||
    orderStatus === ORDER_STATUS.VERIFIED
  );
};

export const isPossibleToFindNewTruck = (orderStatus: any) => {
  if (orderStatus === ORDER_STATUS.ASSIGNED) {
    return true;
  }

  return false;
};

export const isPossibleToViewTruckOperator = (orderStatus: any) => {
  if (
    orderStatus !== ORDER_STATUS.CREATED &&
    orderStatus !== ORDER_STATUS.VERIFIED &&
    orderStatus !== ORDER_STATUS.ASSIGNING
  ) {
    return true;
  }
  return false;
};

export const isPossibleToEdit = (orderStatus: any) => {
  if (
    (orderStatus === ORDER_STATUS.CREATED ||
      orderStatus === ORDER_STATUS.VERIFIED ||
      orderStatus === ORDER_STATUS.ASSIGNING ||
      orderStatus === ORDER_STATUS.ASSIGNED) &&
    orderStatus !== ORDER_STATUS.CANCELED
  ) {
    return true;
  }
  return false;
};

export const isPossibleToTruckOwnerDeleteByAdmin = (orderStatus: any) => {
  if (
    (orderStatus === ORDER_STATUS.DISPATCHED ||
      orderStatus === ORDER_STATUS.ASSIGNED) &&
    orderStatus !== ORDER_STATUS.CANCELED
  ) {
    return true;
  }
  return false;
};

export const isPossibleToAssignAsTruckOwner = (orderStatus: any) => {
  if (orderStatus === ORDER_STATUS.ASSIGNING) {
    return true;
  }
  return false;
};

export const isPossibleToCancel = (orderStatus: any) => {
  if (
    (orderStatus === ORDER_STATUS.CREATED ||
      orderStatus === ORDER_STATUS.VERIFIED ||
      orderStatus === ORDER_STATUS.ASSIGNING ||
      orderStatus === ORDER_STATUS.ASSIGNED) &&
    orderStatus !== ORDER_STATUS.CANCELED
  ) {
    return true;
  }
  return false;
};

export const isPossibleToCustomerCancelByAdmin = (orderStatus: any) => {
  if (
    orderStatus !== ORDER_STATUS.CUSTCANCEL &&
    orderStatus !== ORDER_STATUS.CANCELED
  ) {
    return true;
  }
  return false;
};

export const isPossibleToDriverCancelByAdmin = (orderStatus: any) => {
  if (
    orderStatus !== ORDER_STATUS.DRIVERCANCEL &&
    orderStatus !== ORDER_STATUS.CANCELED
  ) {
    return true;
  }
  return false;
};

export const isPossibleToCancelByAdmin = (orderStatus: any) => {
  if (orderStatus !== ORDER_STATUS.CANCELED) {
    return true;
  }
  return false;
};

export const getIndexOfOrderStatus = (status: any) => {
  let idx = -1;
  OrderStatus.forEach((data, index) => {
    if (data.key === status) {
      idx = index;
    }
  });
  return idx;
};

export const isActiveOrderStatus = (status: any, currentStatus: any) => {
  return getIndexOfOrderStatus(status) <= getIndexOfOrderStatus(currentStatus);
};
