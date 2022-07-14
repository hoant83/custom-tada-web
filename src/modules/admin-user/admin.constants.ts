import { NewAdminDto } from '@/modules/admin-user/admin.dto';
import {
  ACCOUNT_ROLE,
  COLORS,
  PRICE_OPTIONS,
} from '@/modules/admin-user/admin.enum';
import { I18N } from '@/modules/lang/i18n.enum';

export const newAdminFormInit: NewAdminDto = {
  email: '',
  firstName: '',
  phoneNumber: '',
  cardNo: '',
  userType: '',
};

export const AdminType = [
  {
    key: '',
    label: '',
    isAdmin: true,
  },
  {
    key: ACCOUNT_ROLE.SUPERADMIN,
    label: I18N.ADMIN_ROLE_SUPPERADMIN,
  },
  {
    key: ACCOUNT_ROLE.ADMIN,
    label: I18N.ADMIN_ROLE_ADMIN,
    isAdmin: true,
  },
];

export const priceOpions = [
  {
    key: PRICE_OPTIONS.PERCENTAGE,
    label: I18N.PRICING_PERCENTAGE,
  },
  {
    key: PRICE_OPTIONS.VALUE,
    label: I18N.PRICING_VALUE,
  },
];

export const colors = [
  {
    key: COLORS.YELLOW,
    label: I18N.SETTINGS_YELLOW,
  },
  {
    key: COLORS.PINK,
    label: I18N.SETTINGS_PINK,
  },
  {
    key: COLORS.ORANGE,
    label: I18N.SETTINGS_ORANGE,
  },
  {
    key: COLORS.GREEN,
    label: I18N.SETTINGS_GREEN,
  },
  {
    key: COLORS.BLUE,
    label: I18N.SETTINGS_BLUE,
  },
  {
    key: COLORS.GREY,
    label: I18N.SETTINGS_GREY,
  },
  {
    key: COLORS.DARK_GREEN,
    label: I18N.SETTINGS_DARK_GREEN,
  },
  {
    key: COLORS.BLACK,
    label: I18N.SETTINGS_BLACK,
  },
];

export const getAdminType = (t: any, key: any) => {
  return t(AdminType.find((item) => item.key === key)?.label);
};
