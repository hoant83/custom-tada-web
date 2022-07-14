/* eslint-disable react-hooks/exhaustive-deps */
import { LanguageStoreContext } from '@/modules/lang/lang.store';
import { THEMES } from '@/theme.enum';
import AdminRouter from '@/themes/admin/routers';
import TadaTruckRouter from '@/themes/tadatruck/routers';
import TruckOwnerRouter from '@/themes/truckowner/routers';
import { observer } from 'mobx-react';
import React from 'react';
import { LOCAL_STORAGE_KEY } from './libs/constants/local-storage-key.constants';
import { FirebaseStoreContext } from './libs/stores/firebase.store';
import { messaging } from './libs/utils/firebase.util';
import { retrieveFromStorage, saveToStorage } from './libs/utils/storage.util';
import { AuthenticationStoreContext } from './modules/account/authentication.store';
import { NotificationStoreContext } from './modules/notification/notification.store';

const theme = process.env.REACT_APP_THEME || 'truckowner';
const AdminTheme = React.lazy(() => import('@/themes/admin/layout/theme'));
const TadaTruckTheme = React.lazy(
  () => import('@/themes/tadatruck/layout/theme')
);
const TruckOwnerTheme = React.lazy(
  () => import('@/themes/truckowner/layout/theme')
);

function App() {
  const languageStore = React.useContext(LanguageStoreContext);
  const firebaseStore = React.useContext(FirebaseStoreContext);
  const notiStore = React.useContext(NotificationStoreContext);

  const authStore = React.useContext(AuthenticationStoreContext);

  if ('serviceWorker' in navigator) {
    // Supported!
    navigator.serviceWorker.addEventListener('message', (message) => {
      notiStore.getNotiList();
    });
  }
  React.useEffect(() => {
    if (messaging) {
      messaging
        .getToken()
        .then((token) => {
          saveToStorage(LOCAL_STORAGE_KEY.DEVICE_TOKEN, token);
        })
        .catch(() => {
          console.error('Permission notification - Granted');
        });
    }
  }, [firebaseStore]);

  React.useEffect(() => {
    const deviceId = retrieveFromStorage(LOCAL_STORAGE_KEY.DEVICE_TOKEN);
    if (authStore.loggedUser && deviceId) {
      authStore.registerToken(deviceId);
    }
  }, [authStore.loggedUser, authStore]);

  React.useEffect(() => {
    const lang =
      retrieveFromStorage('lang') ?? process.env.REACT_APP_DEFAULT_LANG;
    if (lang) {
      languageStore.setActiveLanguage(lang);
    }
  }, [languageStore]);

  const getSettingsColor = React.useCallback(async () => {
    const result = await authStore.getSettings();
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
      if (result) {
        document.body.className = '';
        document.body.classList.add(`${result ? result : ''}`);
      }
    }
  }, []);

  const getSettingsScheduleColor = React.useCallback(async () => {
    const result = await authStore.getSettingsSchedule();
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
      if (result) {
        document.body.className = '';
        document.body.classList.add(`${result ? result : ''}`);
      }
    }
  }, []);

  const getTrackingSchedule = React.useCallback(async () => {
    const tracking = await authStore.getTrackingSchedule();
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
      if (tracking) {
        document.body.classList.remove('enable-quotation', 'disable-quotation');
        document.body.classList.add(
          `${
            authStore?.enableQuotation
              ? 'enable-quotation'
              : 'disable-quotation'
          }`
        );
      }
    }
  }, []);

  const setTracking = React.useCallback(async () => {
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK) {
      document.body.classList.remove('enable-quotation', 'disable-quotation');
      document.body.classList.add(
        `${
          authStore?.enableQuotation ? 'enable-quotation' : 'disable-quotation'
        }`
      );
    }
  }, []);

  React.useEffect(() => {
    getSettingsColor();
  }, [authStore]);

  React.useEffect(() => {
    getSettingsScheduleColor();
  }, [authStore]);

  React.useEffect(() => {
    setTracking();
  }, [authStore.enableQuotation]);

  React.useEffect(() => {
    getTrackingSchedule();
  }, [authStore]);

  if (theme === THEMES.ADMIN) {
    return (
      <>
        <AdminRouter />
        <AdminTheme />
      </>
    );
  }
  if (theme === THEMES.TADATRUCK) {
    return (
      <>
        <TadaTruckRouter />
        <TadaTruckTheme />
      </>
    );
  }
  return (
    <>
      <TruckOwnerRouter />
      <TruckOwnerTheme />
    </>
  );
}

export default observer(App);
