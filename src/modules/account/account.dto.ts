import { ACCOUNT_TYPE } from '../customer/customer.enum';

export interface LoginDto {
  phoneNumber?: string;
  email?: string;
  password: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
}

export interface SetPasswordDto {
  token: string;
  password: string;
}

export interface CreateCustomerDto {
  email: string;
  password: string;
  phoneNumber: string;
  accountType: ACCOUNT_TYPE;
}

export interface CreateTruckOwnerDto {
  email: string;
  password: string;
  phoneNumber: string;
  referalCode?: string;
}

export type CreateUserDto = CreateCustomerDto | CreateTruckOwnerDto;
export interface UserTableDto {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UpdateAccountDto {
  phone?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  cardNo?: string;
  companyId?: string;
}

export interface CreateEmployeeDto {
  email?: string;
  password?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  accountRole: 0;
}

export interface CompanyTableDto {
  id: number;
  name: string;
  phone: string;
  address: string;
  licenseNo: string;
}

export interface UpdateAccountInfo {
  phoneNumber: string;
  cardNo: string;
}

export interface UpdateCompany {
  name: string;
  phone: string;
  address: string;
  licenseNo: string;
}
