import React from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { THEMES } from '@/theme.enum';
import { getCompanyName, normalizeName } from '@/libs/utils/normalize.ulti';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import tadaLogo from '@/modules/theme/assets/images/tada-logo.svg';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import adminStore, {
  AdminStoreContext,
} from '@/modules/admin-user/admin.store';
import { ACCOUNT_ROLE } from '@/modules/admin-user/admin.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
  isAdmin?: boolean;
}

const AccountSummary = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const adminStore = React.useContext(AdminStoreContext);

  const history = useHistory();

  const [companyInfo, setCompanyInfo] = React.useState<any>(null);

  /*
   * Props of Component
   */
  const { className, isAdmin = false } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { TOPMENU_WELCOME } = I18N;

  const handlePushAccountPage = () => {
    history.push(
      isAdmin ? ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE : CUSTOMER_ROUTERS.SETUP
    );
    if (isAdmin && authStore.loggedUser?.userType !== ACCOUNT_ROLE.SUPERADMIN) {
      adminStore.setModalSetupAccount(true);
    }
  };

  React.useEffect(() => {
    if (typeof authStore.loggedUser?.companyId === 'number') {
      if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
        customerStore.getCompany();
      }

      if (process.env.REACT_APP_THEME === THEMES.TRUCKOWNER) {
        truckOwnerStore.getCompany();
      }
    } else {
      customerStore.company = null;
      truckOwnerStore.company = null;
    }
  }, [authStore, authStore.loggedUser, customerStore, truckOwnerStore]);

  React.useEffect(() => {
    if (customerStore.company) {
      setCompanyInfo(customerStore.company);
    }
    if (truckOwnerStore.company) {
      setCompanyInfo(truckOwnerStore.company);
    }
  }, [customerStore.company, truckOwnerStore.company]);

  return (
    <>
      <div className={`item box-info ${className ? className : ''}`}>
        <span
          onClick={() => {
            handlePushAccountPage();
          }}
        >
          {companyInfo ? (
            <>
              {getCompanyName(
                authStore.loggedUser,
                companyInfo,
                t(TOPMENU_WELCOME)
              )}
            </>
          ) : (
            <>
              {normalizeName(
                authStore.loggedUser?.firstName ?? '',
                authStore.loggedUser?.lastName ?? '',
                t(TOPMENU_WELCOME)
              )}
            </>
          )}
        </span>
        <div
          className="info-avatar"
          onClick={() => {
            handlePushAccountPage();
          }}
        >
          <img
            src={
              companyInfo && companyInfo.companyIconUrl
                ? companyInfo.companyIconUrl
                : authStore.loggedUser?.avatarUrl
                ? authStore.loggedUser?.avatarUrl
                : tadaLogo
            }
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
};

export default observer(AccountSummary);
