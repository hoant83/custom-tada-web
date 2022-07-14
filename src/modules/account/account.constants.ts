import { VERIFIED_STATUS, USER_STATUS } from '@/modules/account/account.enum';
import { getValueFromObject } from '@/libs/utils/fetch.util';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  ACCOUNT_ROLE,
  CUSTOMER_ACCOUNT_TYPE,
} from '@/modules/customer/customer.enum';

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

export const getVerifiedStatus = (t: any, key: any) => {
  return t(VerifiedStatus.find((item) => item.key === key)?.label);
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

export const accountGrid = [
  {
    colName: 'ID',
    colData: 'id',
    isSort: true,
  },
  {
    colName: I18N.CUSTOMER_EMAIL,
    colData: getValueFromObject(
      {
        email: 'aaa',
      },
      'email'
    ),
    isSort: false,
  },
  {
    colName: I18N.CUSTOMER_NAME,
    colData: ['firstName', 'lastName'],
    isSort: false,
  },
  {
    colName: I18N.CUSTOMER_PHONE,
    colData: 'phone',
    isSort: false,
  },
  {
    colName: I18N.CUSTOMER_TYPE_LABEL,
    colData: '',
    isSort: false,
  },
  {
    colName: I18N.CUSTOMER_STATUS_LABEL,
    colData: '',
    isSort: false,
  },
  {
    colName: I18N.CUSTOMER_STATUS,
    colData: '',
    isSort: false,
  },
  {
    colName: I18N.ADMIN_COL_ACTIONS,
    colData: ['view', 'edit', 'delete'],
    isSort: false,
  },
];

export const AccountType = [
  {
    key: '',
    label: '',
  },
  {
    key: ACCOUNT_ROLE.ADMIN,
    label: 'Admin',
  },
  {
    key: ACCOUNT_ROLE.EXECUTIVE,
    label: 'Executive',
  },
];

export const getAccountType = (t: any, key: any) => {
  return t(AccountType.find((item) => item.key === key)?.label);
};

export const customerAccountTypes = [
  {
    key: '',
    label: I18N.ACCOUNT_CUSTOMER_TYPE,
    value: -1,
  },
  {
    key: CUSTOMER_ACCOUNT_TYPE.INDIVIDUAL,
    label: I18N.CUSTOMER_TYPE_INDIVIDUAL,
    value: 0,
  },
  {
    key: CUSTOMER_ACCOUNT_TYPE.CORPORRATE,
    label: I18N.CUSTOMER_TYPE_CORPORATE,
    value: 1,
  },
  {
    key: CUSTOMER_ACCOUNT_TYPE.LOGISTIC_FORWARDER,
    label: I18N.CUSTOMER_TYPE_LOGISTIC_FORWARDER,
    value: 2,
  },
  {
    key: CUSTOMER_ACCOUNT_TYPE.BUSINESS_PARTNER,
    label: I18N.CUSTOMER_TYPE_BUSINESS_PARTNER,
    value: 3,
  },
];

export const getCustomerAccountType = (t: any, key: any) => {
  return t(customerAccountTypes.find((item) => item.key === key)?.label);
};

export const getCustomerAccountTypeByValue = (t: any, value: any) => {
  return t(customerAccountTypes.find((item) => item.value === value)?.label);
};

export const MAXIMUM_OTHER_DOCUMENT = 3;
