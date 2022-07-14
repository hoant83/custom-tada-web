import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { THEME_ROUTERS } from '@/modules/theme/router.enum';

export const themeRoutes = [
  {
    path: THEME_ROUTERS.UI,
    name: 'theme.ui',
    title: I18N.ACCOUNT_LOGIN_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/theme/pages/front/StyleGuide')
    ),
    isLayout: false,
    isGuarded: false,
  },
];
