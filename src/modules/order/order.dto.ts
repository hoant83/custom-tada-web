import {
  CONTAINER_SIZE,
  CONTAINER_TYPE,
  ORDER_TYPE,
  SERVICE_TYPE,
  TRUCK_SPECIAL_TYPE,
} from '@/modules/order/order.enum';
import { DEFAULT_TRUCK_PAYLOAD, DEFAULT_TRUCK_TYPE } from '../truck/truck.enum';
import { PAYMENT_TYPE } from '@/modules/customer/customer.enum';

export interface OrderRequestDto {
  id?: number;
  createdByAdmin?: number;
  createdByCustomer?: number;
  companyId?: number;
  orderType?: ORDER_TYPE;
  serviceType?: SERVICE_TYPE;
  referenceNo?: string;
  referenceNote?: string;
  containerSize?: CONTAINER_SIZE;
  containerType?: CONTAINER_TYPE;
  containerQuantity?: number;
  pickupCity?: string;
  status?: string;
  truckSpecialType?: TRUCK_SPECIAL_TYPE;
  truckQuantity?: number;
  truckLoad?: string;
  cargoType?: string;
  cargoName?: string;
  cargoWeight?: number;
  packageSize?: string;
  pickupAddress?: number[];
  pickupAddressText?: string;
  pickupContactNo?: string;
  pickupTime?: string;
  dropoffAddress?: number[];
  dropoffAddressText?: string;
  dropoffContactNo?: string;
  dropoffTime?: string;
  pickupEmptyContainer?: boolean;
  pickupEmptyAddress?: string;
  dropoffEmptyContainer?: boolean;
  dropoffEmptyAddress?: string;
  noteToDriver?: string;
  price?: boolean;
  priceRequest?: number;
  suggestedPrice?: number;
  vat?: boolean;
  vatInfo?: string;
  inChargeName?: string;
  inChargeContactNo?: string;
  otherGeneralNotes?: string;
  detailRequest?: string;
  staffNote?: string;
  staffAnotherNote?: string;
  dropOffFields?: string;
}

export interface OrderListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  order?: OrderRequestDto;
  searchBy?: string;
  searchKeyword?: string;
  isGetAll?: boolean;
}

export interface OrderListDtoV2 {
  skip?: number;
  take?: number;
  orderId?: string;
  referenceNo?: string;
  status?: any[];
  paymentType?: any[];
  createdFrom?: string;
  createdTo?: string;
  pickupFrom?: string;
  pickupTo?: string;
  pickupAddress?: string;
  dropoffFrom?: string;
  dropoffTo?: string;
  dropoffAddress?: string;
  orderManagerName?: string;
  customerName?: string;
  truckOwnerName?: string;
  truckOwnerPartnerId?: string;
  all?: string;
}

export interface ExportOrderListDto {
  ids?: string[];
  isSelectedAll?: boolean;
  createdByCustomer?: number;
}

export interface dropoff {
  dropoffAddressText: string;
  dropoffAddress: any[];
  dropoffTime: Date;
  dropoffContact: string;
  dropoffContactNo: string;
}

export interface OrderTableDto {
  id: number;
  orderId: number;
  referenceNo: string;
  lastName: string;
  serviceType: string;
  priceRequest: number;
  suggestedPrice: number;
  containerType: string;
  containerSize: string;
  pickupAddressText: string;
  dropoffAddressText: string;
  dropOffFields: dropoff[];
  pickupTime: Date;
  status: string;
  createdByCustomer?: any;
  createdDate: Date;
  documentLinks?: any[];
  metadata: any[];
  truckType: DEFAULT_TRUCK_TYPE;
  truckPayload: DEFAULT_TRUCK_PAYLOAD;
  paymentType: PAYMENT_TYPE;
  price: number;
  paymentDueDate: Date;
  isPaymentDoneByTruckOwner: boolean;
  isPaymentDoneByCustomer: boolean;
  owner: any;
  totalPrice: number;
  additionalPrices: any[];
  useSuggestedPrice: boolean;
  priceCal?: number;
}

export interface OrderActionsDto {
  label: string;
  status: string;
  action: any;
  checkNewStatus?: (id: string) => boolean;
}

export interface DynamicDropOffDto {
  id?: number;
  dropoffAddressText: string;
  dropoffAddress: any[] | null;
  dropoffTime: string;
  dropoffContact: string;
  dropoffContactNo: string;
}

export interface StatisticListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
  fromDate?: string;
  toString?: string;
  isExportAll?: boolean;
}
