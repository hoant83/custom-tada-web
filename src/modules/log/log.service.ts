import http from '@/libs/services';

class LogService {
  logPrefix: string = 'api/log';

  public async writeLog(error: Record<string, any>) {
    const result = await http.post(`${this.logPrefix}`, error);
    return result.data?.result;
  }
}

export default new LogService();
