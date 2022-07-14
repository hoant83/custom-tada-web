import { action } from 'mobx';
import logService from './log.service';

class LogStore {
  @action
  async writeLog(error: Record<string, any>) {
    const result = await logService.writeLog(error);
    return result;
  }
}

export default new LogStore();
