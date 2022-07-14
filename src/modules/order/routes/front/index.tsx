import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  CUSTOMER_ORDER_ROUTERS,
  TRUCKOWNER_ORDER_ROUTERS,
} from '@/modules/order/router.enum';

export const customerOrderRoutes = [
  {
    path: CUSTOMER_ORDER_ROUTERS.CREATE,
    name: 'customer.order.create',
    title: I18N.ORDER_CREATED_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/front/Create')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.MANAGE,
    name: 'customer.order.manage',
    title: I18N.MENU_MANAGE_ORDERS,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/front/Manage')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.MANAGE_PAYMENTS,
    name: 'customer.order.managePayment',
    title: I18N.MENU_MANAGE_PAYMENTS,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/front/ManagePayment')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.THANKYOU,
    name: 'customer.order.thankyou',
    title: I18N.ORDER_THANKYOU_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/front/ThankYou')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.REPORT,
    name: 'customer.order.report',
    title: 'Edit Order',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/front/Report')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.ORDERDETAIL,
    name: 'customer.order.detail',
    title: 'Order Detail',
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/front/OrderDetail')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.EDIT,
    name: 'customer.order.edit',
    title: 'Edit Order',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/modules/order/pages/front/Edit')),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CUSTOMER_ORDER_ROUTERS.TRACKING_TRUCK,
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

export const truckOwnerOrderRoutes = [
  {
    path: TRUCKOWNER_ORDER_ROUTERS.NEW_MANAGE,
    name: 'truckowner.order.new',
    title: I18N.MENU_MANAGE_NEWORDER,
    exact: true,
    permission: '',
    // component: React.lazy(() => import('@/modules/order/pages/front/NewOrder')),
    component: React.lazy(
      () => import('@/modules/order/pages/front/TruckOwnerOrders')
    ),
    isLayout: false,
    isGuarded: true,
  },

  // {
  //   path: TRUCKOWNER_ORDER_ROUTERS.PENDING_ORDER,
  //   name: 'truckowner.order.pending',
  //   title: I18N.MENU_MANAGE_ORDERS,
  //   exact: true,
  //   permission: '',
  //   component: React.lazy(
  //     () => import('@/modules/order/pages/front/WrapperPendingOrder')
  //   ),
  //   isLayout: false,
  //   isGuarded: true,
  // },
  // {
  //   path: TRUCKOWNER_ORDER_ROUTERS.JOBS,
  //   name: 'truckowner.order.job',
  //   title: I18N.MENU_MY_JOBS,
  //   exact: true,
  //   permission: '',
  //   component: React.lazy(() => import('@/modules/order/pages/front/Jobs')),
  //   isLayout: false,
  //   isGuarded: true,
  // },
  {
    path: TRUCKOWNER_ORDER_ROUTERS.REPORT,
    name: 'truckowner.order.report',
    title: 'Report Order',
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/front/TruckOwnerReport')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: TRUCKOWNER_ORDER_ROUTERS.ORDERDETAIL,
    name: 'truckowner.order.detail',
    title: I18N.MENU_MY_JOBS,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/order/pages/front/OrderDetail')
    ),
    isLayout: false,
    isGuarded: true,
  },
  {
    path: TRUCKOWNER_ORDER_ROUTERS.TRACKING_TRUCK,
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
