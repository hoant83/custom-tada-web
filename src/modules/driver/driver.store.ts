import React from 'react';
import { observable } from 'mobx';

class DriverStore {
  @observable driversByTruckOwner: any[] = [];
}

export default new DriverStore();

export const DriverStoreContext = React.createContext(new DriverStore());
