import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { CMS_ROUTERS } from '@/modules/cms/router.enum';

export const cmsRoutes = [
  {
    path: CMS_ROUTERS.FAQ,
    name: 'faq',
    title: I18N.TOPMENU_FAQ,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/themes/truckowner/modules/cms/pages/Faq')
    ),
    isLayout: false,
    isGuarded: false,
  },
  {
    path: CMS_ROUTERS.TERMS_CONDITIONS,
    name: 'terms.and.conditions',
    title: I18N.MENU_TERM_CONDITIONS,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/cms/pages/front/TermsConditions')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
