import { action, observable } from 'mobx';
import { createContext } from 'react';

export default class CommonStore {
  @observable timezone: string =
    process.env.REACT_APP_TIME_ZONE || 'America/Los_Angeles';

  @observable zones = {
    PST: {
      posfix: 'PST',
      value: +7,
    },
    NOPST: {
      posfix: '',
      value: -8,
    },
    UTC: {
      posfix: 'UTC',
      value: +7,
    },
  };

  @observable timeFormat: string = 'MM/DD/YYYY HH:mm';
  @observable shortTimeFormat: string = 'dddd, DD MMMM YYYY';
  @observable hourMinusFormat: string = 'HH:mm:ss A';
  @observable activeMenu: string = '';
  dateTimeFormat: string = 'lll';
  newDateFormat: string;
  newOnlyDateFormat: string = 'DD/MM/YY';
  newOnlyTimeFormat: string = 'HH:mm A';

  @action
  async setActiveMenu(value: string) {
    this.activeMenu = value;
  }

  constructor() {
    this.newDateFormat = `${this.newOnlyDateFormat} ${this.newOnlyTimeFormat}`;
  }
}

export const CommonStoreContext = createContext(new CommonStore());
