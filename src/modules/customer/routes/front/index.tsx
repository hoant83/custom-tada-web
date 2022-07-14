import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

export const customerRoutes = [
  {
    path: CUSTOMER_ROUTERS.LOGIN,
    name: 'customer.login',
    title: I18N.ACCOUNT_LOGIN_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/customer/pages/front/Login')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.FORGOT_PASSWORD,
    name: 'customer.forgotpassword',
    title: I18N.ACCOUNT_FORGOT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/front/ForgotPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.RESET_PASSWORD_TOKEN,
    name: 'customer.resetpassword',
    title: I18N.ACCOUNT_RESETPASSWORD_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/front/ResetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.SET_PASSWORD_TOKEN,
    name: 'customer.setpassword',
    title: I18N.ACCOUNT_RESETPASSWORD_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/front/SetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.CREATE,
    name: 'customer.create',
    title: I18N.ACCOUNT_CREATE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/front/Create')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.SETUP,
    name: 'customer.setup',
    title: I18N.CUSTOMER_ACCOUNT_SETUP,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/customer/pages/front/Setup')),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: CUSTOMER_ROUTERS.THANKYOU,
    name: 'customer.thankyou',
    title: I18N.ACCOUNT_THANKYOU,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/front/ThankYou')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.VERIFY_EMAIL,
    name: 'truckowner.verified-email',
    title: I18N.ACCOUNT_VERIFIED_PAGETITLE,
    exact: true,
    component: React.lazy(
      () => import('@/modules/customer/pages/front/VerifiedEmail')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.QUOTATION,
    name: 'customer.quotation',
    title: I18N.CUSTOMER_QUOTATION_TITLE,
    exact: true,
    component: React.lazy(
      () => import('@/modules/customer/pages/front/ManagePriceQuotations')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
