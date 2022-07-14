import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

export const truckOwnerAdminRoutes = [
  {
    path: TRUCKOWNER_ROUTERS.ADMIN_MANAGE,
    name: 'admin.truckowner.admin',
    title: I18N.TRUCKOWNER_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/admin/Manage')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.ADMIN_MANAGE_DELETED,
    name: 'admin.truckowner.admin',
    title: I18N.TRUCKOWNER_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/admin/ManageDeleted')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.ADMIN_EDIT,
    name: 'admin.truckowner.edit',
    title: I18N.TRUCKOWNER_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/admin/Edit')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ROUTERS.ADMIN_CREATE,
    name: 'admin.truckowner.create',
    title: I18N.TRUCKOWNER_NEW_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/truckowner/pages/admin/Create')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
