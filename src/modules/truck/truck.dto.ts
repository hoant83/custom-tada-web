import { TRUCK_TYPE, TRUCK_STATUS } from '@/modules/truck/truck.enum';

export interface NewTruckDto {
  truckType: TRUCK_TYPE;
  truckNo: string;
  truckLoad: string;
  status: TRUCK_STATUS;
  certificate: any;
}

export interface TruckTableDto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}
