export enum TRUCKOWNER_ROUTERS {
  LOGIN = '/account/login',
  FORGOT_PASSWORD = '/account/forgotpassword',
  RESET_PASSWORD = '/account/resetpassword',
  CREATE = '/account/register',
  SETUP = '/account/setup',
  THANKYOU = '/account/thankyou/:action',
  ADMIN_MANAGE = '/admin/truckowner',
  ADMIN_MANAGE_DELETED = '/admin/truckowner/deleted',
  ADMIN_CREATE = '/admin/truckowner/create',
  ADMIN_EDIT = '/admin/truckowner/:userId',
  RESET_PASSWORD_TOKEN = '/account/reset-password/:token',
  VERIFY_EMAIL = '/account/verify-email/:token',
  SET_PASSWORD_TOKEN = '/account/set-password/:token',
  COMMISSION = '/commission',
  VERIFY_OTP = '/account/verify-otp/:phoneNumber',
  VERIFED_ACCOUNT = '/account/verified',
}

export enum TRUCKOWNER_ACTION_ROUTERS {
  THANKYOU = '/account/thankyou/',
  VERIFY_OTP = '/account/verify-otp/',
}

export enum TRUCKOWNER_API {
  PREFIX = 'api/truck-owner',
  ADMIN_PREFIX = 'api/admin/truck-owners',
  ADMIN_TRUCKOWNER_PREFIX = 'api/admin/truck-owner',
  PROVINCE_PREFIX = 'api/province',
}

export enum NOTIFICATION_API {
  PREFIX = 'api/notification',
  REGISTER = 'register-token',
}
