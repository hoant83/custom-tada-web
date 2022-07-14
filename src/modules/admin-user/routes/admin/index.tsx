import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';

export const adminUserAdminRoutes = [
  {
    path: ADMIN_USER_ROUTERS.ADMIN_LOGIN,
    name: 'admin.login',
    title: I18N.ACCOUNT_LOGIN_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Login')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_FORGOT_PASSWORD,
    name: 'admin.forgotpassword',
    title: I18N.ACCOUNT_FORGOT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Forgot')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_RESET_PASSWORD,
    name: 'admin.resetpassword',
    title: I18N.ACCOUNT_RESETPASSWORD_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/ResetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_SET_PASSWORD,
    name: 'admin.setpassword',
    title: I18N.ACCOUNT_SETPASSWORD_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/SetPassword')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_VERIFY_EMAIL,
    name: 'admin.verifyemail',
    title: I18N.ACCOUNT_VERIFIED_PAGETITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/VerifiedEmail')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE,
    name: 'admin.account.manage',
    title: I18N.ACCOUNT_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Manage')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE_DELETED,
    name: 'admin.account.manage',
    title: I18N.ACCOUNT_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/ManageDeleted')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_CREATE,
    name: 'admin.account.create',
    title: I18N.ACCOUNT_CREATENEW_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Create')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_EDIT,
    name: 'admin.account.edit',
    title: I18N.ACCOUNT_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Edit')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_PRICE_SETTING,
    name: 'admin.price.setting',
    title: I18N.PRICING_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Price')
    ),
    isLayout: false,
    isGuarded: true,
  },

  {
    path: ADMIN_USER_ROUTERS.ADMIN_MANAGE_PAYMENTS,
    name: 'admin.manage.payment',
    title: I18N.ADMIN_MANAGE_PAYMENTS,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/admin/ManagePayment')
    ),
    isLayout: false,
    isGuarded: true,
  },

  {
    path: ADMIN_USER_ROUTERS.ADMIN_IMPORTANT_NOTE,
    name: 'admin.important-note',
    title: I18N.PRICING_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/ImportantNote')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_SETTINGS,
    name: 'admin.setting',
    title: I18N.DEFAULT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/Setting')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP,
    name: 'admin.price-quotation-setup',
    title: I18N.PRICE_QUOTATION_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/PriceQuotation')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP_CREATE,
    name: 'admin.price-quotation-setup',
    title: I18N.PRICE_QUOTATION_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/PriceQuotationSetup')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP_EDIT,
    name: 'admin.price-quotation-setup',
    title: I18N.PRICE_QUOTATION_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/PriceQuotationSetup')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_TRACKING_SETUP,
    name: 'admin.tracking-settings',
    title: I18N.TRACKING_SETUP,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/TrackingSettings')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_USER_ROUTERS.ADMIN_COMMISSION_SETUP,
    name: 'admin.commission-settings',
    title: I18N.COMMISSION_SETUP,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/admin-user/pages/admin/CommissionSettings')
    ),
    isLayout: false,
    isGuarded: true,
  },
];
