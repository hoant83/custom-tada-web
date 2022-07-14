import React from 'react';
import { customerRoutes } from '@/modules/customer/routes/front';
import { customerOrderRoutes } from '@/modules/order/routes/front';
import { cmsRoutes } from '@/modules/cms/routes/front';
import { themeRoutes } from '@/modules/theme/routes/front';

export const tadaTruckRoutes = [
  {
    path: '/',
    name: 'home',
    title: 'Tada Truck - Home Page',
    exact: true,
    permission: '',
    component: React.lazy(() => import('@/themes/tadatruck/pages/Home')),
    isLayout: false,
    isGuarded: true,
  },
  ...customerRoutes,
  ...customerOrderRoutes,
  ...cmsRoutes,
  ...themeRoutes,
];
