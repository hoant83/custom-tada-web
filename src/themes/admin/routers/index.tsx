import React from 'react';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { getRouteTitle, isGuarded, getRoute } from '@/libs/utils/routes.util';
import { retrieveFromStorage } from '@/libs/utils/storage.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CommonStoreContext } from '@/libs/stores/common.store';
import AdminLayout from '@/themes/admin/layout';
import { adminRoutes } from '@/themes/admin/routers/routes';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { LimitOrderPopup } from '@/modules/account/components/LimitOrderPopup';
// import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/enums/router.enum';

declare const document: any;

const AdminRouter = () => {
  const location = useLocation();
  const history = useHistory();
  const authStore = React.useContext(AuthenticationStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();

  const { MESSAGES_MONTHLY_LIMIT_REACH } = I18N;

  React.useEffect(() => {
    const title: string = getRouteTitle(location.pathname, adminRoutes);
    document.title = t(title);

    const route: string = getRoute(location.pathname, adminRoutes);
    commonStore.setActiveMenu(route);
  }, [location.pathname, t, commonStore]);

  React.useEffect(() => {
    const existedToken = retrieveFromStorage('token');

    if (!existedToken && isGuarded(location.pathname, adminRoutes)) {
      history.push(ADMIN_USER_ROUTERS.ADMIN_LOGIN);
    }
    if (
      (existedToken || existedToken !== null) &&
      (!authStore.loggedUser || authStore.loggedUser === null)
    ) {
      authStore.validateToken(existedToken, history);
      if (location.pathname === '/') {
        history.push(ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE);
        commonStore.setActiveMenu(ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE);
      }
    }
  }, [history, authStore, location.pathname, commonStore]);

  return (
    <>
      {authStore.loggedUser && !authStore.loggedUser.notShowAgain && (
        <LimitOrderPopup content={t(`${MESSAGES_MONTHLY_LIMIT_REACH}`)} />
      )}
      <Switch>
        <Route
          path="/"
          render={(props: any) => <AdminLayout {...props} exact />}
        />
      </Switch>
    </>
  );
};

export default observer(AdminRouter);
