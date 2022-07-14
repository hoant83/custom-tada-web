import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

export const truckOwnerRoutes = [
  {
    path: TRUCKOWNER_ROUTERS.LOGIN,
    name: 'truckowner.login',
    title: I18N.ACCOUNT_LOGIN_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/Login')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.FORGOT_PASSWORD,
    name: 'truckowner.forgotpassword',
    title: I18N.ACCOUNT_FORGOT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/ForgotPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.RESET_PASSWORD,
    name: 'truckowner.resetpassword',
    title: I18N.ACCOUNT_RESETPASSWORD_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/ResetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.CREATE,
    name: 'truckowner.create',
    title: I18N.ACCOUNT_CREATE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/Create')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.SETUP,
    name: 'truckowner.setup',
    title: I18N.CUSTOMER_ACCOUNT_SETUP,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/Setup')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: TRUCKOWNER_ROUTERS.THANKYOU,
    name: 'truckowner.thankyou',
    title: I18N.ACCOUNT_THANKYOU,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/ThankYou')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: TRUCKOWNER_ROUTERS.RESET_PASSWORD_TOKEN,
    name: 'truckowner.reset-password',
    title: I18N.ACCOUNT_RESETPASSWORD_TITLE,
    exact: true,
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/ResetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.SET_PASSWORD_TOKEN,
    name: 'truckowner.reset-password',
    title: I18N.ACCOUNT_RESETPASSWORD_TITLE,
    exact: true,
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/SetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.VERIFY_EMAIL,
    name: 'truckowner.verified-email',
    title: I18N.ACCOUNT_VERIFIED_PAGETITLE,
    exact: true,
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/VerifiedAccount')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.VERIFED_ACCOUNT,
    name: 'truckowner.verified-account',
    title: I18N.ACCOUNT_VERIFIED_PAGETITLE,
    exact: true,
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/VerifiedAccount')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.COMMISSION,
    name: 'truckowner.commission',
    title: I18N.COMMISSION_SETUP,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/front/Commission')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: TRUCKOWNER_ROUTERS.VERIFY_OTP,
    name: 'truckowner.verified-otp',
    title: I18N.ACCOUNT_VERIFIED_PAGETITLE,
    exact: true,
    component: React.lazy(() => import('@/modules/truckowner/pages/front/OTP')),
    isLayout: false,
    isGuarded: false,
  },
];
