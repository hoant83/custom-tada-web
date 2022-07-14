import React from 'react';
import AuthenticationStore from '@/modules/account/authentication.store';

export default class TruckOwnerAuthenticationStore extends AuthenticationStore {}

export const TruckOwnerAuthenticationStoreContext = React.createContext(
  new TruckOwnerAuthenticationStore()
);
