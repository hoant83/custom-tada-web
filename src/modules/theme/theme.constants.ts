import { AdminMenuDto, MenuDto } from '@/modules/theme/theme.dto';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';
import { CUSTOMER_ORDER_ROUTERS } from '@/modules/order/router.enum';
import { CMS_ROUTERS } from '@/modules/cms/router.enum';
import {
  TRUCKOWNER_ORDER_ROUTERS,
  ADMIN_ORDER_ROUTERS,
} from '@/modules/order/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { DRIVER_ROUTERS } from '@/modules/driver/router.enum';
import { AUDITLOG_ROUTERS } from '@/modules/audit-log/router.enum';
import { NOTIFICATION_ROUTERS } from '@/modules/notification/router.enum';

export const adminMenu: AdminMenuDto[] = [
  {
    url: ADMIN_ORDER_ROUTERS.ADMIN_MANAGE,
    label: I18N.ADMIN_MENU_ORDER,
    icon: 'ico ico-orders',
  },
  {
    url: CUSTOMER_ROUTERS.ADMIN_MANAGE,
    label: I18N.ADMIN_MENU_CUSTOMER,
    icon: 'ico ico-accounts',
  },
  {
    url: TRUCKOWNER_ROUTERS.ADMIN_MANAGE,
    label: I18N.ADMIN_MENU_TRUCKOWNER,
    icon: 'ico ico-accounts',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE,
    label: I18N.ADMIN_MENU_ADMIN_ACCOUNT,
    icon: 'ico ico-accounts',
  },
  {
    url: DRIVER_ROUTERS.ADMIN_MANAGE,
    label: I18N.ADMIN_MENU_DRIVER,
    icon: 'ico ico-accounts',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_MANAGE_PAYMENTS,
    label: I18N.MENU_MANAGE_PAYMENTS,
    icon: 'ico ico-credit-card',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_PRICE_SETTING,
    label: I18N.PRICING_TITLE,
    icon: 'ico ico-noti-system',
  },

  {
    url: ADMIN_USER_ROUTERS.ADMIN_IMPORTANT_NOTE,
    label: I18N.IMPORTANT_NOTE_TITLE,
    icon: 'ico ico-noti-system',
  },
  {
    url: ADMIN_ORDER_ROUTERS.ADMIN_REPORT,
    label: I18N.ADMIN_MENU_REPORT,
    icon: 'ico ico-accounts',
  },
  {
    url: AUDITLOG_ROUTERS.MANAGE,
    label: I18N.ADMIN_MENU_AUDIT_LOG,
    icon: 'ico ico-noti-system',
  },
  {
    url: NOTIFICATION_ROUTERS.ADMIN_MANAGE,
    label: I18N.ADMIN_MENU_NOTIFICATION,
    icon: 'ico ico-noti',
  },
  {
    url: NOTIFICATION_ROUTERS.ADMIN_SETTING,
    label: I18N.ADMIN_MENU_SMSSETTING,
    icon: 'ico ico-noti',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_SETTINGS,
    label: I18N.DEFAULT_TITLE,
    icon: 'ico ico-noti-system',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP,
    label: I18N.PRICE_QUOTATION_TITLE,
    icon: 'ico ico-quotation',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_TRACKING_SETUP,
    label: I18N.TRACKING_SETUP,
    icon: 'ico ico-tracking',
  },
  {
    url: ADMIN_USER_ROUTERS.ADMIN_COMMISSION_SETUP,
    label: I18N.COMMISSION_SETUP,
    icon: 'ico ico-quotation',
  },
];

export const menuTadaTruck: MenuDto[] = [
  {
    url: CUSTOMER_ORDER_ROUTERS.CREATE,
    label: I18N.MENU_NEW_ORDER,
    icon: 'ico ico-new-order-2',
  },
  {
    url: CUSTOMER_ORDER_ROUTERS.MANAGE,
    label: I18N.MENU_MANAGE_ORDERS,
    icon: 'ico ico-orders',
  },
  {
    url: CUSTOMER_ORDER_ROUTERS.QUOTATION,
    label: I18N.MENU_QUOTATION,
    icon: 'ico ico-quotation',
  },
  {
    url: CUSTOMER_ORDER_ROUTERS.MANAGE_PAYMENTS,
    label: I18N.MENU_MANAGE_PAYMENTS,
    icon: 'ico ico-credit-card',
  },
  {
    url: CUSTOMER_ROUTERS.SETUP,
    label: I18N.MENU_ACCOUNT_SETUP,
    icon: 'ico ico-accounts',
  },
  {
    url: CUSTOMER_ORDER_ROUTERS.REPORT,
    label: I18N.MENU_REPORTS,
    icon: 'ico ico-report',
  },
  {
    url: CMS_ROUTERS.TERMS_CONDITIONS,
    label: I18N.MENU_TERM_CONDITIONS,
    icon: 'ico ico-term',
  },
];

export const menuTruckOwner: MenuDto[] = [
  {
    url: TRUCKOWNER_ROUTERS.SETUP,
    label: I18N.MENU_ACCOUNT_SETUP,
    icon: 'ico ico-accounts',
  },
  {
    url: TRUCKOWNER_ORDER_ROUTERS.NEW_MANAGE,
    label: I18N.TRUCKOWNER_MY_ORDERS,
    icon: 'ico ico-new-order',
  },
  // {
  //   url: TRUCKOWNER_ORDER_ROUTERS.PENDING_ORDER,
  //   label: I18N.MENU_TRUCKOWNER_MANAGE_ORDERS,
  //   icon: 'ico ico-orders',
  // },
  // {
  //   url: TRUCKOWNER_ORDER_ROUTERS.JOBS,
  //   label: I18N.MENU_MY_JOBS,
  //   icon: 'ico ico-noti-order',
  // },
  {
    url: TRUCKOWNER_ORDER_ROUTERS.REPORT,
    label: I18N.MENU_REPORTS,
    icon: 'ico ico-report',
  },
  {
    url: TRUCKOWNER_ROUTERS.COMMISSION,
    label: I18N.COMMISSION_SETUP,
    icon: 'ico ico-quotation',
  },
  {
    url: CMS_ROUTERS.TERMS_CONDITIONS,
    label: I18N.MENU_TERM_CONDITIONS,
    icon: 'ico ico-term',
  },
];
