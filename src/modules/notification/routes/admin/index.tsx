import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { NOTIFICATION_ROUTERS } from '@/modules/notification/router.enum';

export const notificationAdminRoutes = [
  {
    path: NOTIFICATION_ROUTERS.ADMIN_CREATE,
    name: 'admin.notification.create',
    title: I18N.NOTIFICATION_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/notification/pages/admin/Create')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: NOTIFICATION_ROUTERS.ADMIN_EDIT,
    name: 'admin.notification.edit',
    title: I18N.NOTIFICATION_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/notification/pages/admin/Edit')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: NOTIFICATION_ROUTERS.ADMIN_MANAGE,
    name: 'admin.notification',
    title: I18N.NOTIFICATION_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/notification/pages/admin/Manage')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: NOTIFICATION_ROUTERS.ADMIN_SETTING,
    name: 'admin.notification',
    title: I18N.NOTIFICATION_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/notification/pages/admin/SmsSetting')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
