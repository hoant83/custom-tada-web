import { LOCATION_TYPE } from '@/libs/constants/location-type.constant';

export interface PaginationRequest {
  skip?: number;

  take?: number;

  search?: string;

  orderBy?: string;

  orderDirection?: 'asc' | 'desc';
}

export interface Address {
  id?: number;
  company: string;
  locationType: string;
  locationName: string;
  locationAddress: string;
  inChargeName?: string;
  inChargeNo?: string;
  pickupCity?: string;
  pickupAddress?: number[];
  pickupAddressText?: string;
  dropoffAddressText?: string;
  dropoffAddress?: number[];
}

export interface AddressPaginationRequest extends PaginationRequest {
  locationType?: LOCATION_TYPE | '';
}

export interface UpdateAddress {
  id: number;
  company: string;
  locationType: string;
  locationName: string;
  locationAddress: string;
  inChargeName?: string;
  inChargeNo?: string;
}
