import React from 'react';
import AuthenticationStore from '@/modules/account/authentication.store';

export default class AdminAuthenticationStore extends AuthenticationStore {}

export const AdminAuthenticationStoreContext = React.createContext(
  new AdminAuthenticationStore()
);
