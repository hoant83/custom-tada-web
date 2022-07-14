import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { ADMIN_ORDER_ROUTERS } from '@/modules/order/router.enum';

export const orderAdminRoutes = [
  {
    path: ADMIN_ORDER_ROUTERS.ADMIN_CREATE,
    name: 'admin.order.create',
    title: I18N.ORDER_EDIT_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/admin/Create')),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_ORDER_ROUTERS.ADMIN_EDIT,
    name: 'admin.order.edit',
    title: I18N.ORDER_NEW_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/admin/Edit')),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_ORDER_ROUTERS.ADMIN_REPORT,
    name: 'admin.order.report',
    title: 'Report Orders',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/admin/Report')),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_ORDER_ROUTERS.ADMIN_MANAGE,
    name: 'admin.order.manage',
    title: I18N.MENU_MANAGE_ORDERS,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/admin/Manage')),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_ORDER_ROUTERS.ORDERDETAIL,
    name: 'admin.order.detail',
    title: 'Order Detail',
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/admin/OrderDetail')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: ADMIN_ORDER_ROUTERS.TRACKING_TRUCK,
    name: 'truckowner.order.tracking-truck',
    title: 'Tracking Truck',
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/front/TrackingTruckOrders')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
