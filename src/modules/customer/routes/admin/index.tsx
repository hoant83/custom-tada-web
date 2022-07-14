import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

export const customerAdminRoutes = [
  {
    path: CUSTOMER_ROUTERS.ADMIN_CREATE,
    name: 'admin.customer.create',
    title: I18N.CUSTOMER_NEW_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/admin/Create')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.ADMIN_MANAGE_DELETED,
    name: 'admin.customer.manage.deleted',
    title: I18N.CUSTOMER_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/admin/ManageDeleted')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.ADMIN_EDIT,
    name: 'admin.customer.edit',
    title: I18N.CUSTOMER_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/customer/pages/admin/Edit')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ROUTERS.ADMIN_MANAGE,
    name: 'admin.customer.manage',
    title: I18N.CUSTOMER_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/customer/pages/admin/Manage')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
