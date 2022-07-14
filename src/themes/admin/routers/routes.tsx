import React from 'react';
import { adminUserAdminRoutes } from '@/modules/admin-user/routes/admin';
import { auditLogAdminRoutes } from '@/modules/audit-log/routes/admin';
import { customerAdminRoutes } from '@/modules/customer/routes/admin';
import { driverAdminRoutes } from '@/modules/driver/routes/admin';
import { notificationAdminRoutes } from '@/modules/notification/routes/admin';
import { orderAdminRoutes } from '@/modules/order/routes/admin';
import { truckOwnerAdminRoutes } from '@/modules/truckowner/routes/admin';

export const adminRoutes = [
  {
    path: '/',
    name: 'admin',
    title: 'Admin Board',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/themes/admin/pages/Home')),
    isLayout: false,
    isGuarded: true,
  },
  ...adminUserAdminRoutes,
  ...auditLogAdminRoutes,
  ...customerAdminRoutes,
  ...driverAdminRoutes,
  ...notificationAdminRoutes,
  ...orderAdminRoutes,
  ...truckOwnerAdminRoutes,
];
