import React from 'react';
import { truckOwnerRoutes } from '@/modules/truckowner/routes/front';
import { truckOwnerOrderRoutes } from '@/modules/order/routes/front';
import { cmsRoutes } from '@/themes/truckowner/modules/cms/routes';

export const truckOwnerThemeRoutes = [
  {
    path: '/',
    name: 'home',
    title: 'Truck Owner - Home Page',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/themes/truckowner/pages/Home')),
    isLayout: false,
    isGuarded: true,
  },
  ...truckOwnerRoutes,
  ...truckOwnerOrderRoutes,
  ...cmsRoutes,
];
