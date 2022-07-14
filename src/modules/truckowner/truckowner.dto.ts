import {
  VERIFIED_STATUS,
  USER_STATUS,
} from '@/modules/truckowner/truckowner.enum';
import { TRUCK_TYPE, TRUCK_STATUS } from '@/modules/truckowner/truckowner.enum';
import { OrderRequestDto } from '@/modules/order/order.dto';

export interface NewDriverDto {
  firstName?: string;
  phoneNumber?: string;
  cardNo?: string;
  ownerId?: string;
  idCardFrontImage?: any;
  idCardBackImage?: any;
  driverLicense?: any;
  otherDocumentURLs?: Record<string, string>;
}

export interface NewTruckDto {
  truckNo?: string;
  truckLoad?: string;
  truckType?: TRUCK_TYPE;
  certificateURL?: string;
  otherDocumentURLs?: Record<string, string>;
}

export interface NewDriverRequestDto {
  firstName?: string;
  phoneNumber?: string;
  cardNo?: string;
  ownerId?: number;
}

export interface FilterDriverDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
}

export interface FilterTruckDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface DriverRequestDto {
  cardNo?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  notiToken?: string;
  ownerId?: number;
  phoneNumber?: string;
  status?: USER_STATUS;
  verifiedStatus?: VERIFIED_STATUS;
  licenseNo?: string;
  password?: string;
}

export interface TruckRequestDto {
  id?: number;
  ownerId?: number;
  truckLoad?: string;
  truckNo?: string;
  truckStatus?: TRUCK_STATUS;
  truckType?: TRUCK_TYPE;
}

// ------------------------------------------------
// TODO: will move to correctly module
// ------------------------------------------------

export interface TruckOwnerListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface TruckOnwerFilterDto {
  skip: number;
  take: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  search?: string;
  status?: string;
}

export interface FavoriteTruckOwnerOp {
  skip?: number;
  take?: number;
}

export interface FavoriteTruckOnwerOpFilterDto {
  skip: number;
  take: number;
  search?: string;
  status?: string;
}

export interface FavoriteTruckOpTableDto {
  id: number;
  firstName: string;
  companyName: string;
  email: string;
  address: string;
  phoneNumber: string;
  company: any;
}

export interface FavoriteTruckOp {
  firstName: string;
  email: string;
  companyName: string;
  address: string;
  phoneNumber: string;
}

export interface TruckOwnerRequestDto {}

export interface NewCompanyRequestDto {
  name: string;
  phone: string;
  address: string;
  licenseNo: string;
  companyIconUrl?: string;
  businessLicenseUrl?: string;
}

export interface NewTruckDto {
  truckNo?: string;
  truckLoad?: string;
  truckType?: TRUCK_TYPE;
  ownerId?: number;
  certificate?: any;
  otherDocumentURLs?: Record<string, string>;
}

export interface NewTruckRequestDto {
  truckNo?: string;
  truckLoad?: string;
  ownerId?: number;
  truckType: TRUCK_TYPE;
}

export interface FilterOrderDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  order?: OrderRequestDto;
  searchBy?: string;
  searchKeyword?: string;
}

export interface UpdateTruckOwnerRequestDto {
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  cardNo?: string;
  companyId?: number;
  truckService?: TRUCK_TYPE;
  pickupZone?: number[];
}

// ------------------------
// Admin
// ------------------------
export interface AdminFilterDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
}

export interface TruckOwnerUpdateFormDto {
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  cardNo?: string;
  companyId?: number;
  userStatus?: USER_STATUS;
  verifiedStatus?: VERIFIED_STATUS;
}

export interface AdminTruckOwnerRequestDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

// Init new company
export interface NewBankAccountRequestDto {
  companyName: string;
  businessLicenseNo: string;
  bankName: string;
  bankBranch: string;
  bankAccountHolderName: string;
  bankAccountNumber: string;
}

export interface UpdateOrderCommissionDto {
  id?: number;
  isEnableSetCommissionForDriver: boolean;
  isEnableAllowDriverSeeCommission: boolean;
  isEnableAllowDriverSeeOrdersPrice: boolean;
  percentCommission: number;
  fixedCommission: number;
}
