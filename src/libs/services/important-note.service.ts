import http from '@/libs/services';
import { ImportantNote } from '../dto/important-note/important-note.dto';
class ImportantNoteService {
  private readonly _adminPrefix: string = 'api/admin-important-notes';
  private readonly _prefix: string = 'api/important-notes';

  async list() {
    const result = await http.get(`${this._adminPrefix}`);
    return result.data?.result;
  }

  async update(id: number, model: Partial<ImportantNote>) {
    const result = await http.put(`${this._adminPrefix}/${id}`, model);
    return result.data?.result;
  }

  async notShowAgain() {
    const result = await http.put(`${this._prefix}`);
    return result.data?.result;
  }

  async retrieve() {
    const result = await http.get(`${this._prefix}`);
    return result.data?.result;
  }
}

export default new ImportantNoteService();
