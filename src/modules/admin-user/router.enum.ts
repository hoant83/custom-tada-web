export enum ADMIN_USER_ROUTERS {
  ADMIN_LOGIN = '/admin/login',
  ADMIN_FORGOT_PASSWORD = '/admin/forgotpassword',
  ADMIN_RESET_PASSWORD = '/admin/resetpassword',
  ADMIN_ACCOUNT_MANAGE = '/admin/account',
  ADMIN_ACCOUNT_MANAGE_DELETED = '/admin/account/deleted',
  ADMIN_ACCOUNT_CREATE = '/admin/account/create',
  ADMIN_ACCOUNT_EDIT = '/admin/account/:userId',
  ADMIN_VERIFY_EMAIL = '/admin/verify-email/:token',
  ADMIN_SET_PASSWORD = '/admin/set-password/:token',
  ADMIN_PRICE_SETTING = '/admin/pricing',

  ADMIN_IMPORTANT_NOTE = '/admin/important-note',
  ADMIN_MANAGE_PAYMENTS = '/admin/payment',
  ADMIN_SETTINGS = '/admin/setting',
  ADMIN_PRICE_QUOTATION_SETUP = '/admin/price-quotation-setup',
  ADMIN_TRACKING_SETUP = '/admin/tracking',
  ADMIN_COMMISSION_SETUP = '/admin/commission',
  ADMIN_PRICE_QUOTATION_SETUP_CREATE = '/admin/price-quotation-setup/create',
  ADMIN_PRICE_QUOTATION_SETUP_EDIT = '/admin/price-quotation-setup/edit/:id',
}

export enum ADMIN_API {
  PREFIX = 'api/admin',
}
