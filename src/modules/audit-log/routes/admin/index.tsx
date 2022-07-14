import React from 'react';
import { I18N } from '@/modules/lang/i18n.enum';
import { AUDITLOG_ROUTERS } from '@/modules/audit-log/router.enum';

export const auditLogAdminRoutes = [
  {
    path: AUDITLOG_ROUTERS.MANAGE,
    name: 'admin.auditlog.manage',
    title: I18N.AUDIT_LOG_MANAGE_TITLE,
    exact: true,
    permission: '',
    component: React.lazy(
      () => import('@/modules/audit-log/pages/admin/Manage')
    ),
    isLayout: false,
    isGuarded: true,
  },
];
