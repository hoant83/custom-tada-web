export enum CUSTOMER_ROUTERS {
  LOGIN = '/account/login',
  FORGOT_PASSWORD = '/account/forgotpassword',
  RESET_PASSWORD_TOKEN = '/account/reset-password/:token',
  VERIFY_EMAIL = '/account/verify-email/:token',
  SET_PASSWORD_TOKEN = '/account/set-password/:token',
  CREATE = '/account/register',
  SETUP = '/account/setup',
  THANKYOU = '/account/thankyou/:action',
  ADMIN_MANAGE = '/admin/customer',
  ADMIN_CREATE = '/admin/customer/register',
  ADMIN_EDIT = '/admin/customer/:userId',
  ADMIN_MANAGE_DELETED = '/admin/customer/deleted',
  CUSTOMER_EDIT_ORDER = '/order/edit',
  CUSTOMER_ORDER_DETAIL = '/order/',
  QUOTATION = '/quotations',
}

export enum CUSTOMER_ACTION_ROUTERS {
  THANKYOU = '/account/thankyou/',
}

export enum CUSTOMER_API {
  PREFIX = 'api/customer',
  ADMIN_PREFIX = 'api/admin/customers',
}

export enum VERIFIED_STATUS {
  UNVERIFIED,
  PENDING,
  VERIFIED,
}
