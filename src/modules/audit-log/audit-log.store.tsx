import { action, observable } from 'mobx';
import { createContext } from 'react';
import auditLogService from './audit-log.service';

import {
  AuditLogListDto,
  AuditLogTableDto,
} from '@/modules/audit-log/audit.dto';

export default class AuditLogStore {
  @observable auditLogs: AuditLogTableDto[] = [];
  @observable totalCount: number = 0;

  @action
  async getAuditLogs(criteria: AuditLogListDto) {
    const clone = { ...criteria } as any;

    if (clone.role === -1) {
      delete clone.role;
    } else {
      clone.role = criteria.role!.toString() ?? '';
    }

    if (clone.before) {
      clone.before = criteria.before?.toISOString();
    }

    if (clone.after) {
      clone.after = criteria.after?.toISOString();
    }
    const result = await auditLogService.getAuditLogs(clone);
    if (result) {
      this.auditLogs = result.data?.result[0];
      this.totalCount = result.data?.result[1];
    }
  }
}

export const AuditLogStoreContext = createContext(new AuditLogStore());
