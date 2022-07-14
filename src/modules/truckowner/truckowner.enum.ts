import { I18N } from '@/modules/lang/i18n.enum';
import {
  DEFAULT_CONTAINER_SIZE,
  DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE,
  DEFAULT_TRUCK_CONTRACT_CAR_TYPE,
  DEFAULT_TRUCK_PAYLOAD,
  DEFAUL_TTRUCK_NON_MOTORIZED_TYPE,
} from '@/modules/truck/truck.enum';
import { ORDER_STATUS } from '../order/order.enum';

export enum THANKYOU_ACTION {
  REGISTER = 'register',
  RESET_PASSWORD = 'resetpassword',
}

export enum IMAGE_TYPE {
  FRONT = 'front',
  BACK = 'back',
  LICENSE = 'license',
  DOCUMENT = 'otherDocument',
  CERTIFICATE = 'certificate',
}

export enum ACCOUNT_TYPE {
  COMPANY = I18N.CUSTOMER_TYPE_COMPANY,
  INDIVIDUAL = I18N.CUSTOMER_TYPE_INDIVIDUAL,
}

export enum ACCOUNT_ROLE {
  OWNER,
  EXECUTIVE,
  ADMIN,
}

export enum VERIFIED_STATUS {
  UNVERIFIED,
  PENDING,
  VERIFIED,
}

export enum USER_STATUS {
  ACTIVE, // active
  INACTIVE, // suspended by admin
}

export enum TRUCK_TYPE {
  ALL,
  TRAILOR_TRACTOR_TRUCK,
  NORMAL_TRUCK_VAN,
  NON_MOTORIZED_VEHICLE,
  CONCATENATED_GOODS,
  CONTRACT_CAR,
}

export enum TRUCK_STATUS {
  UNVERIFIED,
  PENDING,
  VERIFIED,
}

export enum SERVICE_TYPE {
  TRAILOR_TRACTOR_TRUCK = 'TRAILOR_TRACTOR_TRUCK',
  NORMAL_TRUCK_VAN = 'NORMAL_TRUCK_VAN',
  NON_MOTORIZED = 'NON_MOTORIZED_VEHICLE',
  CONCATENATED_GOODS = 'CONCATENATED_GOODS',
  CONTRACT_CAR = 'CONTRACT_CAR',
}

export const truckownerContainerSize = [
  {
    label: DEFAULT_CONTAINER_SIZE.SIZE_2x20,
    value: DEFAULT_CONTAINER_SIZE.SIZE_2x20,
  },
  {
    label: DEFAULT_CONTAINER_SIZE.SIZE_20,
    value: DEFAULT_CONTAINER_SIZE.SIZE_20,
  },
  {
    label: DEFAULT_CONTAINER_SIZE.SIZE_40,
    value: DEFAULT_CONTAINER_SIZE.SIZE_40,
  },
  {
    label: DEFAULT_CONTAINER_SIZE.SIZE_45,
    value: DEFAULT_CONTAINER_SIZE.SIZE_45,
  },
];

export const truckNonMotorizedType = [
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
    value: DEFAUL_TTRUCK_NON_MOTORIZED_TYPE.ANY,
  },
  {
    label: I18N.TRUCK_2B,
    value: DEFAUL_TTRUCK_NON_MOTORIZED_TYPE['2B'],
  },
  {
    label: I18N.TRUCK_3B,
    value: DEFAUL_TTRUCK_NON_MOTORIZED_TYPE['3B'],
  },
];

export const truckConcatenatedGoodsType = [
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
    value: DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE.ANY,
  },
  {
    label: I18N.TRUCK_CARGO_BOX,
    value: DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE.CARGO_BOX,
  },
  {
    label: I18N.TRUCK_PACKAGE,
    value: DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE.PACKAGE,
  },
  {
    label: I18N.TRUCK_CARGO_COMPARTMENT,
    value: DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE.CARGO_COMPARTMENT,
  },
  {
    label: I18N.TRUCK_CARGO_FLOOR,
    value: DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE.CARGO_FLOOR,
  },
];

export const truckContractCarType = [
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
    value: DEFAULT_TRUCK_CONTRACT_CAR_TYPE.ANY,
  },
  {
    label: I18N.TRUCK_4_SEATER_CAR,
    value: DEFAULT_TRUCK_CONTRACT_CAR_TYPE['4_SEATER_CAR'],
  },
  {
    label: I18N.TRUCK_7_SEATER_CAR,
    value: DEFAULT_TRUCK_CONTRACT_CAR_TYPE['7_SEATER_CAR'],
  },
  {
    label: I18N.TRUCK_16_SEATER_CAR,
    value: DEFAULT_TRUCK_CONTRACT_CAR_TYPE['16_SEATER_CAR'],
  },
];

export const truckownerPayload = [
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
    value: DEFAULT_TRUCK_PAYLOAD.ANY,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_LESS_THAN_ONE,
    value: DEFAULT_TRUCK_PAYLOAD.LESS_THAN_ONE,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ONE_TO_TWO,
    value: DEFAULT_TRUCK_PAYLOAD.ONE_TO_TWO,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWO_TO_THREE,
    value: DEFAULT_TRUCK_PAYLOAD.TWO_TO_THREE,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_THREE_TO_FOUR,
    value: DEFAULT_TRUCK_PAYLOAD.THREE_TO_FOUR,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FIVE_TO_SIX,
    value: DEFAULT_TRUCK_PAYLOAD.FIVE_TO_SIX,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_SIX_TO_EIGHT,
    value: DEFAULT_TRUCK_PAYLOAD.SIX_TO_EIGHT,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_EIGHT_TO_TEN,
    value: DEFAULT_TRUCK_PAYLOAD.EIGHT_TO_TEN,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TEN_TO_FIFTEEN,
    value: DEFAULT_TRUCK_PAYLOAD.TEN_TO_FIFTEEN,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FIFTEEN_TO_TWENTY,
    value: DEFAULT_TRUCK_PAYLOAD.FIFTEEN_TO_TWENTY,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWENTY_TO_TWENTY_FIVE,
    value: DEFAULT_TRUCK_PAYLOAD.TWENTY_TO_TWENTY_FIVE,
  },
  {
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWENTY_FIVE_TO_THIRTY,
    value: DEFAULT_TRUCK_PAYLOAD.TWENTY_FIVE_TO_THIRTY,
  },
];

export const getTruckownerContainerSize = (t: any, key: any) => {
  return t(truckownerContainerSize.find((item) => item.value === key)?.label);
};

export const getTruckownerPayload = (t: any, key: any) => {
  return t(truckownerPayload.find((item) => item.value === key)?.label);
};

export const getTruckownerNonMotoried = (t: any, key: any) => {
  return t(truckNonMotorizedType.find((item) => item.value === key)?.label);
};

export const getTruckownerConcatenatedGoods = (t: any, key: any) => {
  return t(
    truckConcatenatedGoodsType.find((item) => item.value === key)?.label
  );
};

export const getTruckownerContractCar = (t: any, key: any) => {
  return t(truckContractCarType.find((item) => item.value === key)?.label);
};

export const TRUCKOWNER_UPDATE_STATUS_ORDER = [
  { label: I18N.ORDER_STATUS_PICKING, value: ORDER_STATUS.PICKING },
  { label: I18N.ORDER_STATUS_PICK_ARRIVED, value: ORDER_STATUS.PICK_ARRIVED },
  { label: I18N.ORDER_STATUS_DELIVERING, value: ORDER_STATUS.DELIVERING },
  { label: I18N.ORDER_STATUS_DELIVERED, value: ORDER_STATUS.DELIVERED },
];
