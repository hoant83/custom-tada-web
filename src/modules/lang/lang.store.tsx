import React from 'react';
import { observable, action } from 'mobx';

class LanguageStore {
  @observable activeLanguage: string = process.env.REACT_APP_DEFAULT_LANG || '';

  @action
  setActiveLanguage = (value: string) => {
    this.activeLanguage = value;
  };
}

export default new LanguageStore();

export const LanguageStoreContext = React.createContext(new LanguageStore());
