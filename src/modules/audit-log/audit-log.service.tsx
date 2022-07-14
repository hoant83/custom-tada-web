import http from '@/libs/services';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import { AuditLogListDto } from '@/modules/audit-log/audit.dto';

class AuditLogService {
  prefix = 'api/audit-log';

  public async getAuditLogs(criteria: AuditLogListDto) {
    return await http.get(
      `${this.prefix}/get-list${prepareGetQuery({ ...criteria })}`
    );
  }
}

export default new AuditLogService();
