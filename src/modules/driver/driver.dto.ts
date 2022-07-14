import { DriverRequestDto } from '@/modules/truckowner/truckowner.dto';
import { VERIFIED_STATUS } from '@/modules/account/account.enum';

export interface NewDriverDto {
  name: string;
  phone: string;
  cardNO: string;
  idCardFrontImage: any;
  idCardBackImage: any;
  driverLicense: any;
}
export interface DriverTableDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  verifiedStatus: any;
  status: any;
  cardNo: string;
  lastActiveDate?: Date;
  createdDate?: Date;
  publicId?: string;
}

export interface DriverListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  driver?: DriverRequestDto;
  searchBy?: string;
  searchKeyword?: string;
}

export interface UpdateDriverRequestDto {
  phone?: string;
  email?: string;
  firstName?: string;
  cardNo?: string;
  verifiedStatus?: VERIFIED_STATUS;
}
