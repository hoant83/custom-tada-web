import { I18N } from '@/modules/lang/i18n.enum';
import { USER_ROLE } from '@/modules/account/account.enum';

export const UserRoleLabel = [
  {
    key: USER_ROLE.ADMIN,
    label: I18N.USER_ROLE_ADMIN,
  },
  {
    key: USER_ROLE.CUSTOMER,
    label: I18N.USER_ROLE_CUSTOMER,
  },
  {
    key: USER_ROLE.TRUCK_OWNER,
    label: I18N.USER_ROLE_TRUCK_OWNER,
  },
  {
    key: USER_ROLE.DRIVER,
    label: I18N.USER_ROLE_DRIVER,
  },
];

export const getUserRole = (t: any, key: any) => {
  return t(UserRoleLabel.find((item) => item.key === key)?.label);
};
