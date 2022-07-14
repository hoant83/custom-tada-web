import {
  ADDITIONAL_PRICE,
  CANCELED_BY,
  CARGO_TYPE,
  CONTAINER_SIZE,
  CONTAINER_TYPE,
  ORDER_STATUS,
  ORDER_TYPE,
  PACKAGE_SIZE,
  SERVICE_TYPE,
  TRUCK_SPECIAL_TYPE,
} from '@/modules/order/order.enum';
import { DynamicDropOffDto, OrderRequestDto } from '@/modules/order/order.dto';
import { I18N } from '@/modules/lang/i18n.enum';
import { THEMES } from '@/theme.enum';
import { truckPayload, truckType } from '../truck/truck.enum';
import { paymentType } from '../customer/customer.enum';

export const CanceledBy = [
  {
    key: CANCELED_BY.CUSTOM_CANCEL,
    label: I18N.ORDER_CANCELEDBY_CUSTOM,
  },
  {
    key: CANCELED_BY.DRIVER_CANCEL,
    label: I18N.ORDER_CANCELEDBY_DRIVER,
  },
];

export const getCanceledBy = (key: CANCELED_BY) => {
  return CanceledBy.find((item) => item.key === key)?.label;
};

export const CargoType = [
  {
    key: CARGO_TYPE.NO,
    label: '',
  },
  {
    key: CARGO_TYPE.DANGEROUS,
    label: I18N.ORDER_CARGOTYPE_DANGEROUS,
  },
  {
    key: CARGO_TYPE.SPECIAL,
    label: I18N.ORDER_CARGOTYPE_SPECIAL,
  },
  {
    key: CARGO_TYPE.STANDARD,
    label: I18N.ORDER_CARGOTYPE_STANDARD,
  },
];

export const getCargoType = (t: any, key: any) => {
  return t(CargoType.find((item) => item.key === key)?.label);
};

export const getTruckPayload = (t: any, key: any) => {
  return t(truckPayload.find((item) => item.key === key)?.label);
};

export const getPaymentType = (t: any, key: any) => {
  return t(paymentType.find((item) => item.key === key)?.label);
};

export const getTruckType = (t: any, key: any) => {
  return t(truckType.find((item) => item.key === key)?.label);
};

export const ContainerSize = [
  {
    key: CONTAINER_SIZE.NO,
    label: I18N.ORDER_CONTAINERSIZE_LABEL,
  },
  {
    key: CONTAINER_SIZE.SIZE_20,
    label: `${CONTAINER_SIZE.SIZE_20}'`,
  },
  {
    key: CONTAINER_SIZE.SIZE_40,
    label: `${CONTAINER_SIZE.SIZE_40}'`,
  },
  {
    key: CONTAINER_SIZE.SIZE_45,
    label: `${CONTAINER_SIZE.SIZE_45}'`,
  },
];

export const getContainerSize = (t: any, key: any) => {
  return t(ContainerSize.find((item) => item.key === key)?.label);
};

export const ContainerType = [
  {
    key: CONTAINER_TYPE.NO,
    label: '',
  },
  {
    key: CONTAINER_TYPE.DC,
    label: I18N.ORDER_CONTAINERTYPE_DC,
  },
  {
    key: CONTAINER_TYPE.FR,
    label: I18N.ORDER_CONTAINERTYPE_FR,
  },
  {
    key: CONTAINER_TYPE.HC,
    label: I18N.ORDER_CONTAINERTYPE_HC,
  },
  {
    key: CONTAINER_TYPE.HR,
    label: I18N.ORDER_CONTAINERTYPE_HR,
  },
  {
    key: CONTAINER_TYPE.OT,
    label: I18N.ORDER_CONTAINERTYPE_OT,
  },
  {
    key: CONTAINER_TYPE.RF,
    label: I18N.ORDER_CONTAINERTYPE_RF,
  },
  {
    key: CONTAINER_TYPE.TANK,
    label: I18N.ORDER_CONTAINERTYPE_TANK,
  },
];

export const getContainerType = (t: any, key: any) => {
  return t(ContainerType.find((item) => item.key === key)?.label);
};

export const PackageSize = [
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_1000_1200,
    label: I18N.ORDER_PACKAGE_SIZE_1000_1200,
  },
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_1100_1100,
    label: I18N.ORDER_PACKAGE_SIZE_1100_1100,
  },
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_1016_1219,
    label: I18N.ORDER_PACKAGE_SIZE_1016_1219,
  },
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_1165_1165,
    label: I18N.ORDER_PACKAGE_SIZE_1165_1165,
  },
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_1067_1067,
    label: I18N.ORDER_PACKAGE_SIZE_1067_1067,
  },
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_800_1200,
    label: I18N.ORDER_PACKAGE_SIZE_800_1200,
  },
  {
    key: PACKAGE_SIZE.PACKAGE_SIZE_OTHERS,
    label: I18N.ORDER_PACKAGE_SIZE_OTHER,
  },
];

export const getPacketSize = (t: any, key: any) => {
  return t(PackageSize.find((item) => item.key === key)?.label);
};

export const isTruckOwner = process.env.REACT_APP_THEME === THEMES.TRUCKOWNER;

export const isAdmin = process.env.REACT_APP_THEME === THEMES.ADMIN;

export const isCustomer = process.env.REACT_APP_THEME === THEMES.TADATRUCK;

export const INIT_FILTER_TEXT = '';

export const OrderStatus = [
  {
    key: ORDER_STATUS.CREATED,
    label: I18N.ORDER_STATUS_CREATED,
    style: 'order-status-new',
    payment: false,
  },
  {
    key: ORDER_STATUS.VERIFIED,
    label: I18N.ORDER_STATUS_VERIFIED,
    payment: false,
  },
  {
    key: ORDER_STATUS.ASSIGNING,
    label: I18N.ORDER_STATUS_ASSIGNING,
    style: 'order-status-new',
    payment: false,
  },
  {
    key: ORDER_STATUS.ASSIGNED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_ASSIGNED
      : I18N.ORDER_STATUS_ASSIGNED,
    style: 'order-status-assigned',
    payment: true,
  },
  {
    key: ORDER_STATUS.DISPATCHED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DISPATCHED
      : I18N.ORDER_STATUS_DISPATCHED,
    style: 'order-status-dispatched',
    payment: true,
  },
  {
    key: ORDER_STATUS.PICKING,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_PICKING
      : I18N.ORDER_STATUS_PICKING,
    payment: true,
  },
  {
    key: ORDER_STATUS.PICK_ARRIVED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_PICKARRIVED
      : I18N.ORDER_STATUS_PICK_ARRIVED,
    payment: true,
  },
  {
    key: ORDER_STATUS.PICKUPCODE_INPUTED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERING
      : isAdmin
      ? I18N.ORDER_STATUS_PCODEINPUTED
      : I18N.ORDER_STATUS_DELIVERING,
    payment: true,
  },
  {
    key: ORDER_STATUS.DELIVERING,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERING
      : I18N.ORDER_STATUS_DELIVERING,
    payment: true,
  },
  {
    key: ORDER_STATUS.DELIVERYCODE_INPUTED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERING
      : isAdmin
      ? I18N.ORDER_STATUS_DCODEINPUTTED
      : I18N.ORDER_STATUS_DELIVERING,
    payment: true,
  },
  {
    key: ORDER_STATUS.DELIVERED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERED
      : I18N.ORDER_STATUS_DELIVERED,
    style: 'order-status-delivered',
    payment: true,
  },
  {
    key: ORDER_STATUS.CUSTCANCEL,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_CUSTCANCEL
      : isAdmin
      ? I18N.ORDER_ADMIN_STATUS_CUSTCANCEL
      : I18N.ORDER_STATUS_CUSTCANCEL,
    payment: true,
  },
  {
    key: ORDER_STATUS.DRIVERCANCEL,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DRIVERCANCEL
      : I18N.ORDER_STATUS_DRIVERCANCEL,
    payment: true,
  },
  {
    key: ORDER_STATUS.CANCELING,
    label: I18N.ORDER_STATUS_CANCELING,
    payment: true,
  },
  {
    key: ORDER_STATUS.CANCELED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_CANCELLED
      : I18N.ORDER_STATUS_CANCELED,
    payment: true,
  },
];

export const OrderStatusFilter = [
  {
    key: ORDER_STATUS.CREATED,
    label: I18N.ORDER_STATUS_CREATED,
    style: 'order-status-new',
    payment: false,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.VERIFIED,
    label: I18N.ORDER_STATUS_VERIFIED,
    payment: false,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.ASSIGNING,
    label: I18N.ORDER_STATUS_ASSIGNING,
    style: 'order-status-new',
    payment: false,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.ASSIGNED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_ASSIGNED
      : I18N.ORDER_STATUS_ASSIGNED,
    style: 'order-status-assigned',
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.DISPATCHED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DISPATCHED
      : I18N.ORDER_STATUS_DISPATCHED,
    style: 'order-status-dispatched',
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.PICKING,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_PICKING
      : I18N.ORDER_STATUS_PICKING,
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.PICK_ARRIVED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_PICKARRIVED
      : I18N.ORDER_STATUS_PICK_ARRIVED,
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.PICKUPCODE_INPUTED,
    label: I18N.ORDER_STATUS_PCODEINPUTED,
    payment: true,
    alias: ORDER_STATUS.DELIVERING,
  },
  {
    key: ORDER_STATUS.DELIVERING,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERING
      : I18N.ORDER_STATUS_DELIVERING,
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.DELIVERYCODE_INPUTED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERED
      : I18N.ORDER_STATUS_DCODEINPUTTED,
    payment: true,
    alias: ORDER_STATUS.DELIVERING,
  },
  {
    key: ORDER_STATUS.DELIVERED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERED
      : I18N.ORDER_STATUS_DELIVERED,
    style: 'order-status-delivered',
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.CUSTCANCEL,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_CUSTCANCEL
      : I18N.ORDER_ADMIN_STATUS_CUSTCANCEL,
    payment: true,
    alias: ORDER_STATUS.CANCELED,
  },
  {
    key: ORDER_STATUS.DRIVERCANCEL,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DRIVERCANCEL
      : I18N.ORDER_STATUS_DRIVERCANCEL,
    payment: true,
    alias: ORDER_STATUS.CANCELED,
  },
  {
    key: ORDER_STATUS.CANCELING,
    label: I18N.ORDER_STATUS_CANCELING,
    payment: true,
    isCustomer: true,
  },
  {
    key: ORDER_STATUS.CANCELED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_CANCELLED
      : I18N.ORDER_STATUS_CANCELED,
    payment: true,
    isCustomer: true,
  },
];

export const truckownerOrderStatus = [
  {
    key: ORDER_STATUS.CREATED,
    label: I18N.ORDER_STATUS_CREATED,
    style: 'order-status-new',
    payment: false,
  },
  {
    key: ORDER_STATUS.VERIFIED,
    label: I18N.ORDER_STATUS_VERIFIED,
    payment: false,
  },
  {
    key: ORDER_STATUS.ASSIGNING,
    label: I18N.ORDER_STATUS_ASSIGNING,
    style: 'order-status-new',
    payment: false,
  },
  {
    key: ORDER_STATUS.ASSIGNED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_ASSIGNED
      : I18N.ORDER_STATUS_ASSIGNED,
    style: 'order-status-assigned',
    payment: true,
  },
  {
    key: ORDER_STATUS.DISPATCHED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DISPATCHED
      : I18N.ORDER_STATUS_DISPATCHED,
    style: 'order-status-dispatched',
    payment: true,
  },
  {
    key: ORDER_STATUS.PICKING,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_PICKING
      : I18N.ORDER_STATUS_PICKING,
    payment: true,
  },
  {
    key: ORDER_STATUS.PICK_ARRIVED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_PICKARRIVED
      : I18N.ORDER_STATUS_PICK_ARRIVED,
    payment: true,
  },
  {
    key: ORDER_STATUS.DELIVERING,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERING
      : I18N.ORDER_STATUS_DELIVERING,
    payment: true,
  },
  {
    key: ORDER_STATUS.DELIVERED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DELIVERED
      : I18N.ORDER_STATUS_DELIVERED,
    style: 'order-status-delivered',
    payment: true,
  },
  {
    key: ORDER_STATUS.CUSTCANCEL,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_CUSTCANCEL
      : isAdmin
      ? I18N.ORDER_ADMIN_STATUS_CUSTCANCEL
      : I18N.ORDER_STATUS_CUSTCANCEL,
    payment: true,
  },
  {
    key: ORDER_STATUS.DRIVERCANCEL,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_DRIVERCANCEL
      : I18N.ORDER_STATUS_DRIVERCANCEL,
    payment: true,
  },
  {
    key: ORDER_STATUS.CANCELING,
    label: I18N.ORDER_STATUS_CANCELING,
    payment: true,
  },
  {
    key: ORDER_STATUS.CANCELED,
    label: isTruckOwner
      ? I18N.TRUCKOWNER_STATUS_CANCELLED
      : I18N.ORDER_STATUS_CANCELED,
    payment: true,
  },
];

export const getOrderStatus = (t: any, key: any) => {
  return t(OrderStatus.find((item) => item.key === key)?.label);
};

export const getOrderStatusStyle = (key: any) => {
  return OrderStatus.find((item) => item.key === key)?.style;
};

export const OrderType = [
  {
    key: ORDER_TYPE.QUICK,
    label: I18N.ORDER_ORDERTYPE_QUICK,
  },
  {
    key: ORDER_TYPE.STANDARD,
    label: I18N.ORDER_ORDERTYPE_STANDARD,
  },
];

export const getOrderType = (t: any, key: any) => {
  return t(OrderType.find((item) => item.key === key)?.label);
};

export const ServiceType = [
  {
    key: SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK,
    label: I18N.ORDER_SERVICETYPE_TRAILOR,
  },
  {
    key: SERVICE_TYPE.NORMAL_TRUCK_VAN,
    label: I18N.ORDER_SERVICETYPE_NORMAL,
  },
  {
    key: SERVICE_TYPE.NON_MOTORIZED,
    label: I18N.ORDER_SERVICETYPE_NON_MOTORIZED,
  },
  {
    key: SERVICE_TYPE.CONCATENATED_GOODS,
    label: I18N.ORDER_SERVICETYPE_CONCATENATED_GOODS,
  },
  {
    key: SERVICE_TYPE.CONTRACT_CAR,
    label: I18N.ORDER_SERVICETYPE_CONTRACT_CAR,
  },
];

export const getServiceType = (t: any, key: any) => {
  return t(ServiceType.find((item) => item.key === key)?.label);
};

export const TruckSpecialType = [
  {
    key: TRUCK_SPECIAL_TYPE.NO,
    label: '',
  },
  {
    key: TRUCK_SPECIAL_TYPE.NORMAL,
    label: I18N.ORDER_TRUCKTYPE_NORMAL,
  },
  {
    key: TRUCK_SPECIAL_TYPE.FREEZING,
    label: I18N.ORDER_TRUCKTYPE_FREEZING,
  },
];

export const dynamicDropOffInit: DynamicDropOffDto[] = [
  {
    dropoffAddress: [],
    dropoffAddressText: '',
    dropoffTime: '',
    dropoffContact: '',
    dropoffContactNo: '',
  },
];

export const getTruckSpecialType = (t: any, key: any) => {
  return t(TruckSpecialType.find((item) => item.key === key)?.label);
};

export const orderRequestInit: OrderRequestDto = {
  orderType: ORDER_TYPE.STANDARD,
  serviceType: SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK,
};

export const additionalPriceOptions = [
  {
    key: ADDITIONAL_PRICE.FORKLIFT_COST,
    label: I18N.ORDER_FORKLIFT_COST,
  },
  {
    key: ADDITIONAL_PRICE.LABOUR_COST,
    label: I18N.ORDER_LABOUR_COST,
  },
  {
    key: ADDITIONAL_PRICE.ROAD_FEE,
    label: I18N.ORDER_ROAD_FEE,
  },
  {
    key: ADDITIONAL_PRICE.WAITING_FEE,
    label: I18N.ORDER_WAITING_FEE,
  },
  {
    key: ADDITIONAL_PRICE.INCENTIVES,
    label: I18N.ORDER_INCENTIVES,
  },
  {
    key: ADDITIONAL_PRICE.OTHERS,
    label: I18N.ORDER_OTHERS,
  },
];

export const getAdditionalPriceOptions = (t: any, key: any) => {
  return t(additionalPriceOptions.find((item) => item.key === key)?.label);
};

export interface AdditionalPrice {
  id: number;
  type: ADDITIONAL_PRICE | null;
  price: number | null;
}

export const InitAdditionalPrice: AdditionalPrice = {
  id: -1,
  type: null,
  price: null,
};
