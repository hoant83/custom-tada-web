import { observable } from 'mobx';
import { createContext } from 'react';

export default class FirebaseStore {
  @observable
  count: number = 0;

  increaseCount() {
    this.count++;
  }
}

export const FirebaseStoreContext = createContext(new FirebaseStore());
