import { action, observable } from 'mobx';
import { createContext } from 'react';
import { ImportantNote } from '../dto/important-note/important-note.dto';
import importantNoteService from '../services/important-note.service';

export default class ImportantNoteStore {
  @observable
  adminImportantNotes: ImportantNote[] = [];

  @observable
  isLoading: boolean = false;

  @observable
  popupImportantNote: ImportantNote | null = null;

  @action
  async listImportantNotes() {
    this.setIsLoading(true);
    const data = await importantNoteService.list();
    this.setAdminImportantNote(data);
    this.setIsLoading(false);
  }

  @action
  setAdminImportantNote(data: ImportantNote[]) {
    this.adminImportantNotes = data;
  }

  @action
  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  @action
  setPopupImportantNote(data: ImportantNote) {
    this.popupImportantNote = data;
  }

  async retrieve() {
    const result = await importantNoteService.retrieve();
    this.setPopupImportantNote(result);
  }
}

export const ImportantNoteStoreContext = createContext(
  new ImportantNoteStore()
);
