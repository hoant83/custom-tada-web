import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { DRIVER_ROUTERS } from '@/modules/driver/router.enum';

export const driverAdminRoutes = [
  {
    path: DRIVER_ROUTERS.ADMIN_MANAGE,
    name: 'admin.driver',
    title: I18N.DRIVER_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/driver/pages/admin/Manage')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: DRIVER_ROUTERS.ADMIN_MANAGE_DELETED,
    name: 'admin.driver.deleted',
    title: I18N.DRIVER_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/driver/pages/admin/ManageDeleted')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: DRIVER_ROUTERS.ADMIN_EDIT,
    name: 'admin.driver.edit',
    title: I18N.DRIVER_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/driver/pages/admin/Edit')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: DRIVER_ROUTERS.ADMIN_CREATE,
    name: 'admin.driver.create',
    title: I18N.DRIVER_ADMIN_NEW_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/driver/pages/admin/Create')),
    isLayout: false,
    isGuarded: false,
  },
];
