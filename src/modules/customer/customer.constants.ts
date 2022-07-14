import {
  VERIFIED_STATUS,
  USER_STATUS,
  ACCOUNT_ROLE,
  ACCOUNT_TYPE,
} from '@/modules/customer/customer.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  CustomerRequestDto,
  CustomerUpdateFormDto,
  NewCompanyRequestDto,
  UpdateCustomerRequestDto,
  NewEmployeeDto,
  AdminCustomerRequestDto,
} from '@/modules/customer/customer.dto';
import { SendSms } from '@/libs/dto/SendSms.dto';

export const VerifiedStatus = [
  {
    key: VERIFIED_STATUS.UNVERIFIED,
    label: I18N.STATUS_UNVERIFIED,
  },
  {
    key: VERIFIED_STATUS.PENDING,
    label: I18N.STATUS_PENDING,
  },
  {
    key: VERIFIED_STATUS.VERIFIED,
    label: I18N.STATUS_VERIFIED,
  },
];

export const EmailVerifiedStatus = [
  {
    key: true,
    label: I18N.STATUS_VERIFIED,
  },
  {
    key: false,
    label: I18N.STATUS_UNVERIFIED,
  },
];

export const PhoneVerifiedStatus = [
  {
    key: true,
    label: I18N.STATUS_VERIFIED,
  },
  {
    key: false,
    label: I18N.STATUS_UNVERIFIED,
  },
];

export const getVerifiedStatus = (t: any, key: any) => {
  return t(VerifiedStatus.find((item) => item.key === key)?.label);
};

export const getEmailVerifiedStatus = (t: any, key: any) => {
  return t(EmailVerifiedStatus.find((item) => item.key === key)?.label);
};

export const getPhoneVerifiedStatus = (t: any, key: any) => {
  return t(PhoneVerifiedStatus.find((item) => item.key === key)?.label);
};

export const getKeyVerifiedStatus = (label: string) => {
  return VerifiedStatus.find((item) => item.label === label)?.key;
};

export const UserStatus = [
  {
    key: USER_STATUS.ACTIVE,
    label: I18N.USER_STATUS_ACTIVE,
  },
  {
    key: USER_STATUS.INACTIVE,
    label: I18N.USER_STATUS_INACTIVE,
  },
];

export const getUserStatus = (t: any, key: any) => {
  return t(UserStatus.find((item) => item.key === key)?.label);
};

export const getKeyUserStatus = (label: string) => {
  return UserStatus.find((item) => item.label === label)?.key;
};

export const AccountRole = [
  {
    key: ACCOUNT_ROLE.OWNER,
    label: I18N.CUSTOMER_ROLE_OWNER,
  },
  {
    key: ACCOUNT_ROLE.ADMIN,
    label: I18N.CUSTOMER_ROLE_ADMIN,
  },
  {
    key: ACCOUNT_ROLE.EXECUTIVE,
    label: I18N.CUSTOMER_ROLE_EXECUTIVE,
  },
];

export const getAccountRole = (t: any, key: any) => {
  return key
    ? t(AccountRole.find((item) => item.key === key)?.label)
    : t(I18N.CUSTOMER_ROLE_OWNER);
};

export const getKeyAccountRole = (label: string) => {
  return AccountRole.find((item) => item.label === label)?.key;
};

export const AccountType = [
  {
    key: ACCOUNT_TYPE.COMPANY,
    label: I18N.CUSTOMER_TYPE_COMPANY,
  },
  {
    key: ACCOUNT_TYPE.INDIVIDUAL,
    label: I18N.CUSTOMER_TYPE_INDIVIDUAL,
  },
];

export const getAccountType = (t: any, key: any) => {
  return t(AccountType.find((item) => item.key === key)?.label);
};

export const getAccountTypeByCompany = (t: any, companyId: number) => {
  return companyId
    ? t(I18N.CUSTOMER_TYPE_COMPANY)
    : t(I18N.CUSTOMER_TYPE_INDIVIDUAL);
};

export const getKeyAccountType = (
  label: string,
  customerId: number,
  companyId: number
) => {
  return label === 'Company' || 'company' ? companyId : customerId;
};

export const customerRequestInit: CustomerRequestDto = {
  email: '',
  password: '',
  phoneNumber: '',
};

// Init data of company
export const newCompanyInit: NewCompanyRequestDto = {
  name: '',
  phone: '',
  address: '',
  licenseNo: '',
};

export const newCustomerInit: UpdateCustomerRequestDto = {
  // phone: '',
  // email: '',
  // firstName: '',
  // lastName: '',
  // password: '',
  // cardNo: '',
};

export const newEmployeeFormInit: NewEmployeeDto = {
  firstName: '',
  email: '',
  phoneNumber: '',
  cardNo: '',
  accountRole: '',
  accountType: '',
};

export const EmployeeType = [
  {
    key: '',
    label: '',
  },
  {
    key: ACCOUNT_ROLE.ADMIN,
    label: I18N.CUSTOMER_ROLE_ADMIN,
  },
  {
    key: ACCOUNT_ROLE.EXECUTIVE,
    label: I18N.CUSTOMER_ROLE_EXECUTIVE,
  },
];

export const EmployeeTypeLabel = [
  {
    key: ACCOUNT_ROLE.OWNER,
    label: I18N.CUSTOMER_ROLE_OWNER,
  },
  {
    key: ACCOUNT_ROLE.ADMIN,
    label: I18N.CUSTOMER_ROLE_ADMIN,
  },
  {
    key: ACCOUNT_ROLE.EXECUTIVE,
    label: I18N.CUSTOMER_ROLE_EXECUTIVE,
  },
];

export const getEmployeeType = (t: any, key: any) => {
  return t(EmployeeTypeLabel.find((item) => item.key === key)?.label);
};

// Admin

export const customerUpdateFormInit: CustomerUpdateFormDto = {
  phoneNumber: '',
  email: '',
  firstName: '',
  lastName: '',
  cardNo: '',
  userStatus: USER_STATUS.INACTIVE,
  verifiedStatus: VERIFIED_STATUS.UNVERIFIED,
  accountType: -1,
};

export const adminCustomerFormInit: AdminCustomerRequestDto = {
  accountRole: ACCOUNT_ROLE.OWNER,
};

export const customerDto = {
  accountRole: '',
  backCardUrl: '',
  cardNo: '',
  companyId: '',
  createdDate: '',
  deletedAt: '',
  email: '',
  firstName: '',
  frontCardUrl: '',
  id: '',
  phoneNumber: '',
  verifiedStatus: 0,
  accountType: -1,
};

export const defaultReferenceInit = {
  orderManagerName: '',
  orderManagerNo: '',
  pickupCity: '',
  dropoffAddress: [],
  dropoffAddressText: '',
  pickupAddress: [],
  pickupAddressText: '',
  personInChargePickup: '',
  personInChargePickupNO: '',
  personInChargeDropoff: '',
  personInChargeDropoffNO: '',
};

export const defaultPaymentInit = {
  needVATInvoice: false,
  companyName: '',
  bussinessLicenseNO: '',
  address: '',
  email: '',
  paymentType: null,
  otherPayment: '',
};

export const initialSendSms: SendSms = {
  phoneNumber: '',
  message: '',
};

export const customerAccountTypeFilterOptions = [
  {
    key: 0,
    label: I18N.CUSTOMER_TYPE_INDIVIDUAL,
  },
  {
    key: 1,
    label: I18N.CUSTOMER_TYPE_CORPORATE,
  },
  {
    key: 2,
    label: I18N.CUSTOMER_TYPE_LOGISTIC_FORWARDER,
  },
  {
    key: 3,
    label: I18N.CUSTOMER_TYPE_BUSINESS_PARTNER,
  },
];
