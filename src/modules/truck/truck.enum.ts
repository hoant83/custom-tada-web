import { DEFAULT_NON_MOTORIZED_PAYLOAD } from '../admin-user/admin.enum';
import { I18N } from '../lang/i18n.enum';

export enum TRUCK_TYPE {
  ALL,
  TRAILOR,
  NORMAL,
}

export enum TRUCKTYPE_LABEL {
  ALL = 'All',
  TRAILOR = 'Trailor tractor truck',
  NORMAL = 'Normal truck van',
}

export enum TRANSPORT_TYPE {
  TRAILOR = 'TRAILOR_TRACTOR_TRUCK',
  NORMAL = 'NORMAL_TRUCK_VAN',
  NON_MOTORIZED = 'NON_MOTORIZED_VEHICLE',
  CONCATENATED_GOODS = 'CONCATENATED_GOODS',
  CONTRACT_CAR = 'CONTRACT_CAR',
}

export enum TRUCK_STATUS {
  UNVERIFIED,
  PENDING,
  VERIFIED,
}

export enum DEFAULT_CONCATENATED_GOODS_TYPE {
  'CARGO_BOX' = 'CARGO_BOX',
  'PACKAGE' = 'PACKAGE',
  'CARGO_COMPARTMENT' = 'CARGO_COMPARTMENT',
  'CARGO_FLOOR' = 'CARGO_FLOOR',
}

export enum DEFAULT_TRUCK_CONCATENATED_GOODS_TYPE {
  'ANY' = 'ANY',
  'CARGO_BOX' = 'CARGO_BOX',
  'PACKAGE' = 'PACKAGE',
  'CARGO_COMPARTMENT' = 'CARGO_COMPARTMENT',
  'CARGO_FLOOR' = 'CARGO_FLOOR',
}

export enum DEFAULT_CONTRACT_CAR_TYPE {
  '4_SEATER_CAR' = '4_SEATER_CAR',
  '7_SEATER_CAR' = '7_SEATER_CAR',
  '16_SEATER_CAR' = '16_SEATER_CAR',
}

export enum DEFAULT_TRUCK_CONTRACT_CAR_TYPE {
  'ANY' = 'ANY',
  '4_SEATER_CAR' = '4_SEATER_CAR',
  '7_SEATER_CAR' = '7_SEATER_CAR',
  '16_SEATER_CAR' = '16_SEATER_CAR',
}

export enum DEFAULT_NON_MOTORIZED_TYPE {
  '2B' = '2B',
  '3B' = '3B',
}

export enum DEFAUL_TTRUCK_NON_MOTORIZED_TYPE {
  'ANY' = 'ANY',
  '2B' = '2B',
  '3B' = '3B',
}

export enum DEFAULT_TRUCK_PAYLOAD {
  ANY,
  LESS_THAN_ONE,
  ONE_TO_TWO,
  TWO_TO_THREE,
  THREE_TO_FOUR,
  FIVE_TO_SIX,
  SIX_TO_EIGHT,
  EIGHT_TO_TEN,
  TEN_TO_FIFTEEN,
  FIFTEEN_TO_TWENTY,
  TWENTY_TO_TWENTY_FIVE,
  TWENTY_FIVE_TO_THIRTY,
  MORE_THAN_THIRTY,
}

export enum HEAVY_CARGO_LOAD {
  ANY = 'any',
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  EIGHT = '8',
  TEN = '10',
  FIFTEEN = '15',
  TWENTY = '20',
  TWENTY_FIVE = '25',
  THIRTY = '30',
}

export enum DEFAULT_TRUCK_TYPE {
  ANY = 0,
  FREEZING_BODY = 1,
  MINI_VAN = 2,
  MEZZAN = 3,
  CLOSED_BODY = 4,
  TARPAULIN_COVER = 5,
  GRID_AND_TARPAULIN_COVER = 6,
  WING_BODY = 7,
  FOR_RETAILER = 8,
  WITHOUT_BODY = 9,
  WITH_LIFT = 10,
  DUMP_TRUCK = 11,
  TANK_TRUCK = 12,
  PICKUP_BAK = 'Pick up bak',
  PICKUP_BOX = 'Pick up Box',
  PICKUP_FROZEN = 'Pick up Frozen',
  ENG_BAK = 'Engkel bak',
  ENG_BOX = 'Engkel Box',
  ENG_FROZEN = 'Engkel Frozen',
}

export enum DEFAULT_CONTAINER_TYPE {
  NO = '',
  DC = 'DC',
  RF = 'RF',
  HC = 'HC',
  HR = 'HR',
  OT = 'OT',
  FR = 'FR',
  TANK = 'TANK',
}

export enum DEFAULT_CONTAINER_SIZE {
  NO = '',
  SIZE_2x20 = '2x20',
  SIZE_20 = '20',
  SIZE_40 = '40',
  SIZE_45 = '45',
}

export const transportType = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_TRANSPORT_LABEL,
  },
  {
    key: TRANSPORT_TYPE.TRAILOR,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_TRAILORTRACTOR,
  },
  {
    key: TRANSPORT_TYPE.NORMAL,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_NORMAL,
  },
  {
    key: TRANSPORT_TYPE.NON_MOTORIZED,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_NON_MOTORIZED,
  },
  {
    key: TRANSPORT_TYPE.CONCATENATED_GOODS,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_CONCATENATED_GOODS,
  },
  {
    key: TRANSPORT_TYPE.CONTRACT_CAR,
    label: I18N.TRUCKOWNER_TRUCKSERVICE_CONTRACT_CAR,
  },
];

export const defaultContainerSize = [
  {
    key: DEFAULT_CONTAINER_SIZE.NO,
    label: DEFAULT_CONTAINER_SIZE.NO,
  },
  {
    key: DEFAULT_CONTAINER_SIZE.SIZE_2x20,
    label: DEFAULT_CONTAINER_SIZE.SIZE_2x20,
  },
  {
    key: DEFAULT_CONTAINER_SIZE.SIZE_20,
    label: DEFAULT_CONTAINER_SIZE.SIZE_20,
  },
  {
    key: DEFAULT_CONTAINER_SIZE.SIZE_40,
    label: DEFAULT_CONTAINER_SIZE.SIZE_40,
  },
  {
    key: DEFAULT_CONTAINER_SIZE.SIZE_45,
    label: DEFAULT_CONTAINER_SIZE.SIZE_45,
  },
];

export const defaultContainerType = [
  {
    key: DEFAULT_CONTAINER_TYPE.NO,
    label: DEFAULT_CONTAINER_TYPE.NO,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.DC,
    label: DEFAULT_CONTAINER_TYPE.DC,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.RF,
    label: DEFAULT_CONTAINER_TYPE.RF,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.HC,
    label: DEFAULT_CONTAINER_TYPE.HC,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.HR,
    label: DEFAULT_CONTAINER_TYPE.HR,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.OT,
    label: DEFAULT_CONTAINER_TYPE.OT,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.FR,
    label: DEFAULT_CONTAINER_TYPE.FR,
  },
  {
    key: DEFAULT_CONTAINER_TYPE.TANK,
    label: DEFAULT_CONTAINER_TYPE.TANK,
  },
];

export const concatenatedGoodsType = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_CONCATENATED_GOODS_LABEL,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE['CARGO_BOX'],
    label: I18N.TRUCK_CARGO_BOX,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE['PACKAGE'],
    label: I18N.TRUCK_PACKAGE,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE['CARGO_COMPARTMENT'],
    label: I18N.TRUCK_CARGO_COMPARTMENT,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE['CARGO_FLOOR'],
    label: I18N.TRUCK_CARGO_FLOOR,
  },
];

export const concatenatedGoodsPayload = [
  {
    key: DEFAULT_TRUCK_PAYLOAD.ANY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
  },
];

export const contractCarType = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_CONTRACT_CAR_LABEL,
  },
  {
    key: DEFAULT_CONTRACT_CAR_TYPE['4_SEATER_CAR'],
    label: I18N['TRUCK_4_SEATER_CAR'],
  },
  {
    key: DEFAULT_CONTRACT_CAR_TYPE['7_SEATER_CAR'],
    label: I18N['TRUCK_7_SEATER_CAR'],
  },
  {
    key: DEFAULT_CONTRACT_CAR_TYPE['16_SEATER_CAR'],
    label: I18N['TRUCK_16_SEATER_CAR'],
  },
];

export const contractCarPayload = [
  {
    key: DEFAULT_TRUCK_PAYLOAD.ANY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
  },
];

export const nonMotorizedType = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_NO_MOTORIZED_LABEL,
  },
  {
    key: DEFAULT_NON_MOTORIZED_TYPE['2B'],
    label: I18N.TRUCK_2B,
  },
  {
    key: DEFAULT_NON_MOTORIZED_TYPE['3B'],
    label: I18N.TRUCK_3B,
  },
];

export const nonMotorizedPayload = [
  {
    key: DEFAULT_TRUCK_PAYLOAD.ANY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.LESS_THAN_THREE_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_LESS_THAN_THREE,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.THREE_TO_TEN_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_THREE_TO_TEN,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.TEN_TO_TWENTY_FIVE_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_TEN_TO_TWENTY_FIVE,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.TWENTY_FIVE_TO_FIFTY_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_TWENTY_FIVE_TO_FIFTY,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.FIFTY_TO_ONE_HUNDRED_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_FIFTY_TO_ONE_HUNDRED,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.ONE_HUNDRED_TO_FIVE_HUNDRED_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_ONE_HUNDRED_TO_FIVE_HUNDRED,
  },
  {
    key: DEFAULT_NON_MOTORIZED_PAYLOAD.MORE_THAN_FIVE_HUNDRED_KG,
    label: I18N.DEFAULT_NON_MOTORIZED_MORE_THAN_FIVE_HUNDRED,
  },
];

export const truckPayload = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_TRUCK_LOAD_LABEL,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.ANY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.LESS_THAN_ONE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_LESS_THAN_ONE,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.ONE_TO_TWO,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ONE_TO_TWO,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.TWO_TO_THREE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWO_TO_THREE,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.THREE_TO_FOUR,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_THREE_TO_FOUR,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.FIVE_TO_SIX,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FIVE_TO_SIX,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.SIX_TO_EIGHT,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_SIX_TO_EIGHT,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.EIGHT_TO_TEN,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_EIGHT_TO_TEN,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.TEN_TO_FIFTEEN,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TEN_TO_FIFTEEN,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.FIFTEEN_TO_TWENTY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FIFTEEN_TO_TWENTY,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.TWENTY_TO_TWENTY_FIVE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWENTY_TO_TWENTY_FIVE,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.TWENTY_FIVE_TO_THIRTY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWENTY_FIVE_TO_THIRTY,
  },
  {
    key: DEFAULT_TRUCK_PAYLOAD.MORE_THAN_THIRTY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_MORE_THAN_THIRTY,
  },
];

export const heavyCargoLoad = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_TRUCK_LOAD_LABEL,
  },
  {
    key: HEAVY_CARGO_LOAD.ANY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ANY,
  },
  {
    key: HEAVY_CARGO_LOAD.ONE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_ONE,
  },
  {
    key: HEAVY_CARGO_LOAD.TWO,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWO,
  },
  {
    key: HEAVY_CARGO_LOAD.THREE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_THREE,
  },
  {
    key: HEAVY_CARGO_LOAD.FOUR,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FOUR,
  },
  {
    key: HEAVY_CARGO_LOAD.FIVE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FIVE,
  },
  {
    key: HEAVY_CARGO_LOAD.SIX,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_SIX,
  },
  {
    key: HEAVY_CARGO_LOAD.EIGHT,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_EIGHT,
  },
  {
    key: HEAVY_CARGO_LOAD.TEN,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TEN,
  },
  {
    key: HEAVY_CARGO_LOAD.FIFTEEN,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_FIFTEEN,
  },
  {
    key: HEAVY_CARGO_LOAD.TWENTY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWENTY,
  },
  {
    key: HEAVY_CARGO_LOAD.TWENTY_FIVE,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_TWENTY_FIVE,
  },
  {
    key: HEAVY_CARGO_LOAD.THIRTY,
    label: I18N.DEFAULT_TRUCK_PAYLOAD_THIRTY,
  },
];

export const truckType = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_TYPE_LABEL,
  },
  {
    key: DEFAULT_TRUCK_TYPE.ANY,
    label: I18N.DEFAULT_TRUCK_TYPE_ANY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.FREEZING_BODY,
    label: I18N.DEFAULT_FREEZING_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.MINI_VAN,
    label: I18N.DEFAULT_MINI_VAN,
  },
  {
    key: DEFAULT_TRUCK_TYPE.MEZZAN,
    label: I18N.DEFAULT_MEZZAN,
  },
  {
    key: DEFAULT_TRUCK_TYPE.CLOSED_BODY,
    label: I18N.DEFAULT_CLOSED_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.TARPAULIN_COVER,
    label: I18N.DEFAULT_TARPAULIN_COVER,
  },
  {
    key: DEFAULT_TRUCK_TYPE.GRID_AND_TARPAULIN_COVER,
    label: I18N.DEFAULT_GRID_AND_TARPAULIN_COVER,
  },
  {
    key: DEFAULT_TRUCK_TYPE.WING_BODY,
    label: I18N.DEFAULT_WING_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.FOR_RETAILER,
    label: I18N.DEFAULT_FOR_RETAILER,
  },
  {
    key: DEFAULT_TRUCK_TYPE.WITHOUT_BODY,
    label: I18N.DEFAULT_WITHOUT_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.WITH_LIFT,
    label: I18N.DEFAULT_WITH_LIFT,
  },
  {
    key: DEFAULT_TRUCK_TYPE.DUMP_TRUCK,
    label: I18N.DEFAULT_DUMP_TRUCK,
  },
];

export const truckTypeAll = [
  {
    key: '',
    label: I18N.DEFAULT_CHOOSE_TYPE_LABEL,
  },
  {
    key: DEFAULT_TRUCK_TYPE.ANY,
    label: I18N.DEFAULT_TRUCK_TYPE_ANY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.FREEZING_BODY,
    label: I18N.DEFAULT_FREEZING_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.MINI_VAN,
    label: I18N.DEFAULT_MINI_VAN,
  },
  {
    key: DEFAULT_TRUCK_TYPE.MEZZAN,
    label: I18N.DEFAULT_MEZZAN,
  },
  {
    key: DEFAULT_TRUCK_TYPE.CLOSED_BODY,
    label: I18N.DEFAULT_CLOSED_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.TARPAULIN_COVER,
    label: I18N.DEFAULT_TARPAULIN_COVER,
  },
  {
    key: DEFAULT_TRUCK_TYPE.GRID_AND_TARPAULIN_COVER,
    label: I18N.DEFAULT_GRID_AND_TARPAULIN_COVER,
  },
  {
    key: DEFAULT_TRUCK_TYPE.WING_BODY,
    label: I18N.DEFAULT_WING_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.FOR_RETAILER,
    label: I18N.DEFAULT_FOR_RETAILER,
  },
  {
    key: DEFAULT_TRUCK_TYPE.WITHOUT_BODY,
    label: I18N.DEFAULT_WITHOUT_BODY,
  },
  {
    key: DEFAULT_TRUCK_TYPE.WITH_LIFT,
    label: I18N.DEFAULT_WITH_LIFT,
  },
  {
    key: DEFAULT_TRUCK_TYPE.DUMP_TRUCK,
    label: I18N.DEFAULT_DUMP_TRUCK,
  },
  {
    key: DEFAULT_TRUCK_TYPE.TANK_TRUCK,
    label: I18N.DEFAULT_TANK_TRUCK,
  },
  {
    key: DEFAULT_NON_MOTORIZED_TYPE['2B'],
    label: I18N.TRUCK_2B,
  },
  {
    key: DEFAULT_NON_MOTORIZED_TYPE['3B'],
    label: I18N.TRUCK_3B,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE.CARGO_BOX,
    label: I18N.TRUCK_CARGO_BOX,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE.PACKAGE,
    label: I18N.TRUCK_PACKAGE,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE.CARGO_COMPARTMENT,
    label: I18N.TRUCK_CARGO_COMPARTMENT,
  },
  {
    key: DEFAULT_CONCATENATED_GOODS_TYPE.CARGO_FLOOR,
    label: I18N.TRUCK_CARGO_FLOOR,
  },
  {
    key: DEFAULT_CONTRACT_CAR_TYPE['4_SEATER_CAR'],
    label: I18N.TRUCK_4_SEATER_CAR,
  },
  {
    key: DEFAULT_CONTRACT_CAR_TYPE['7_SEATER_CAR'],
    label: I18N.TRUCK_7_SEATER_CAR,
  },
  {
    key: DEFAULT_CONTRACT_CAR_TYPE['16_SEATER_CAR'],
    label: I18N.TRUCK_16_SEATER_CAR,
  },
];
