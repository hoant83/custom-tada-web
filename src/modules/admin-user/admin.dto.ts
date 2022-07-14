export interface AdminTableDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  verifiedStatus: any;
  status: any;
  cardNo: string;
  userType: any;
}

export interface NewAdminDto {
  email: string;
  firstName: string;
  phoneNumber: string;
  cardNo: string;
  userType: any;
  password?: string;
  confirmPassword?: string;
}

export interface AdminListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface AdminActionsDto {
  label: string;
  status: string;
  action: any;
}

export interface SettingDto {
  id?: number;
  baseFareTractor: number;
  baseFareNormal: number;
  isUsing: boolean;
  payloadFares: PayloadFare[];
  distancePrices: DistancePrice[];
  dynamicCharges: DynamicCharge[];
  surCharges: SurCharge[];
  truckTypeFares: TruckTypeFare[];
  zonePrices: ZonePrice[];
}

export interface defaultSettingDto {
  phoneNumber?: string;
  fbLink?: string;
  fbLabel?: string;
  qrLabel?: string;
  email?: string;
  companyName?: string;
  defaultColor?: string;
  monthlyOrder?: string;
  remain?: any;
  autoVerifyOrder?: boolean;
  truckPool?: boolean;
}

export const defaultSettingInit: defaultSettingDto = {
  phoneNumber: '',
  fbLabel: '',
  fbLink: '',
  qrLabel: '',
  email: '',
  companyName: '',
  defaultColor: 'yellow',
  monthlyOrder: '',
  remain: '',
  autoVerifyOrder: false,
  truckPool: false,
};

export interface PayloadFare {
  id: number;
  payload: any[];
  price: number;
  priceOption: number;
}

export interface ZonePrice {
  id: number;
  dropoffZoneArea: string;
  pickupZoneArea: number;
  payload: any[];
  sameZone: number;
  cost: number;
}

export interface DistancePrice {
  id: number;
  payload: any[];
  distances: Distance[];
}

export interface Distance {
  id: number;
  from: number;
  to: number;
  costPerKm: number;
  distancePriceId: number;
}

export interface SurCharge {
  id: number;
  multipleStopPriceOption: number;
  multipleStopPrice: number;
  specialGoodsPriceOption: number;
  specialGoodsPrice: number;
  heavyCargoPriceOption: number;
  payloadMoreThan: number;
  heavyCargoPrice: number;
  inconvenientLocationPriceOption: number;
  inconvenientLocationPrice: null;
}

export interface DynamicCharge {
  id: number;
  name: string;
  priceOption: number;
  cost: number;
}

export interface TruckTypeFare {
  id: number;
  truckType: any[];
  price: number;
}

export interface PriceQuotationListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
}

export interface PriceQuotationDto {
  id?: number;
  name: string;
  toAllCustomers?: boolean;
  quotation?: any;
  note?: string;
  toCustomers?: number[];
  currency?: string;
}

export interface LicenseMail {
  companyName: string;
  email: string;
  contactNo?: string;
  notes?: string;
}

export interface AdminGeneralSetupCommissionDto {
  isEnableCommissionFeature: boolean;
  isEnableAllTruckOwnersCommission?: boolean;
  isEnableSetupDefaultDriversCommission?: boolean;
  defaultPercentCommission?: number;
  defaultFixedCommission?: number;
  truckOwnersId?: number[];
}

export interface DriverEarningDto {
  firstName: string;
  lastName: string | null;
  phoneNumber: string;
  noOfTrips: number;
  earnings: number;
  paid: number;
  remainingBal: number;
}

export interface GetDriversEarningDto {
  skip?: number;
  take?: number;
  from?: string;
  to?: string;
  searchBy?: string;
  searchKeyword?: string;
  phone?: string;
  isExport?: boolean;
}
