/* eslint-disable react-hooks/exhaustive-deps */
import { CommonStoreContext } from '@/libs/stores/common.store';
import { ImportantNoteStoreContext } from '@/libs/stores/important-note.store';
import { getRoute, getRouteTitle, isGuarded } from '@/libs/utils/routes.util';
import { retrieveFromStorage } from '@/libs/utils/storage.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { ClientPopUp } from '@/modules/account/components/ClientPopUp';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import TadaTruckLayout from '@/themes/tadatruck/layout';
import { tadaTruckRoutes } from '@/themes/tadatruck/routers/routes';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

declare const document: any;

const TadaTruckRouter = () => {
  const location = useLocation();
  const history = useHistory();
  const authStore = React.useContext(AuthenticationStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  const importantNoteStore = React.useContext(ImportantNoteStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();

  React.useEffect(() => {
    const title: string = getRouteTitle(location.pathname, tadaTruckRoutes);
    document.title = t(title);

    const route: string = getRoute(location.pathname, tadaTruckRoutes);
    commonStore.setActiveMenu(route);
  }, [location.pathname, t, commonStore]);

  React.useEffect(() => {
    const existedToken = retrieveFromStorage('token');

    if (!existedToken && isGuarded(location.pathname, tadaTruckRoutes)) {
      history.push(CUSTOMER_ROUTERS.LOGIN);
    }
    if (
      (existedToken || existedToken !== null) &&
      (!authStore.loggedUser || authStore.loggedUser === null)
    ) {
      authStore.validateToken(existedToken, history);
      if (location.pathname === '/') {
        history.push(CUSTOMER_ROUTERS.SETUP);
        commonStore.setActiveMenu(CUSTOMER_ROUTERS.SETUP);
      }
      if (location.pathname === '/quotations' && !authStore.enableQuotation) {
        history.push(CUSTOMER_ROUTERS.SETUP);
        commonStore.setActiveMenu(CUSTOMER_ROUTERS.SETUP);
      }
    }
  }, [history, authStore, location.pathname, commonStore]);

  React.useEffect(() => {
    if (authStore.loggedUser && !authStore.loggedUser.notShowAgain) {
      importantNoteStore.retrieve();
    }
  }, [authStore.loggedUser]);

  return (
    <>
      {authStore.loggedUser && importantNoteStore.popupImportantNote && (
        <ClientPopUp content={importantNoteStore.popupImportantNote.content} />
      )}
      <Switch>
        <Route
          path="/"
          render={(props: any) => <TadaTruckLayout {...props} exact />}
        />
      </Switch>
    </>
  );
};

export default observer(TadaTruckRouter);
