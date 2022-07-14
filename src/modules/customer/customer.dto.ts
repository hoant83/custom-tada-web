import {
  ACCOUNT_ROLE,
  ACCOUNT_TYPE,
  PAYMENT_TYPE,
  USER_STATUS,
  VERIFIED_STATUS,
} from '@/modules/customer/customer.enum';
import {
  CONTAINER_SIZE,
  CONTAINER_TYPE,
  SERVICE_TYPE,
} from '../order/order.enum';
import {
  DEFAULT_NON_MOTORIZED_TYPE,
  DEFAULT_CONCATENATED_GOODS_TYPE,
  DEFAULT_CONTRACT_CAR_TYPE,
  DEFAULT_TRUCK_PAYLOAD,
  DEFAULT_TRUCK_TYPE,
} from '../truck/truck.enum';

export interface CustomerTableDto {
  id: number;
  accountRole: ACCOUNT_ROLE;
  cardNo: string;
  companyId: number;
  createdDate: Date;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: USER_STATUS;
  updatedDate: Date;
  verifiedStatus: VERIFIED_STATUS;
  companyName?: string;
  emailVerified?: boolean;
  accountType?: number;
  lastActiveDate?: Date;
}

export interface CustomerListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
}

export interface CustomerActionsDto {
  label: string;
  status: string;
  action: any;
}

export interface CustomerRequestDto {
  email?: string;
  password?: string;
  phoneNumber?: string;
}

export interface CustomerDto {
  firstName?: string;
  id?: number;
  email: string;
  phoneNumber: string;
  cardNo?: string;
  accountRole?: any;
  cardFront?: any;
  cardBack?: any;
}

// TODO: restructure sort by of this file
// Init new company
export interface NewCompanyRequestDto {
  name: string;
  phone: string;
  address: string;
  licenseNo: string;
  companyIconUrl?: string;
  businessLicenseUrl?: string;
}

export interface UpdateCustomerRequestDto {
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  cardNo?: string;
  companyId?: number;
  accountType?: number;
}

export interface NewEmployeeDto {
  email?: string;
  password?: string;
  phoneNumber?: string;
  firstName?: string;
  cardNo?: string;
  accountRole?: any;
  accountType?: any;
  confirmPassword?: string;
}

export interface FilterEmployeeDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface FilterFavoriteTruckOwnerDto {
  skip?: number;
  take?: number;
}

// ------------------------
// Admin
// ------------------------

export interface CustomerUpdateFormDto {
  phoneNumber?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  cardNo?: string;
  companyId?: number;
  userStatus?: USER_STATUS;
  verifiedStatus?: VERIFIED_STATUS;
  accountType?: number;
}

//
// Customer
//
export interface AdminCustomerRequestDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  accountRole?: ACCOUNT_ROLE;
  accountType?: number;
}

//
// Default reference
//

export interface DefaultReference {
  id?: number;
  typeOfTransport?: SERVICE_TYPE;
  containerType?: CONTAINER_TYPE;
  truckType?: DEFAULT_TRUCK_TYPE;
  containerSize?: CONTAINER_SIZE;
  truckPayload?: DEFAULT_TRUCK_PAYLOAD;
  orderManagerName?: string;
  orderManagerNo?: string;
  pickupCity?: string;
  dropoffAddress?: number[];
  dropoffAddressText: string;
  pickupAddress: number[];
  pickupAddressText: string;
  personInChargePickup: string;
  personInChargePickupNO: string;
  personInChargeDropoff: string;
  personInChargeDropoffNO: string;
  nonMotorizedType?: DEFAULT_NON_MOTORIZED_TYPE;
  concatenatedGoodsType?: DEFAULT_CONCATENATED_GOODS_TYPE;
  contractCarType?: DEFAULT_CONTRACT_CAR_TYPE;
}

export interface DefaultPayment {
  id?: number;
  needVATInvoice: boolean;
  companyName?: string;
  bussinessLicenseNO?: string;
  address?: string;
  email?: string;
  paymentType?: PAYMENT_TYPE | null;
  otherPayment?: string;
}

export interface PriceQuotationListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
}
