import React from 'react';
import { observable, action } from 'mobx';
import accountService from '@/modules/account/account.service';
import {
  UserTableDto,
  CreateUserDto,
  ResetPasswordDto,
  SetPasswordDto,
} from '@/modules/account/account.dto';

class AccountStore {
  @observable users: UserTableDto[] = [];
  @observable totalCount: number = 0;
  @observable currentUserDetail: any = null;
  @observable createUserForm: CreateUserDto = {
    email: '',
    password: '',
    phoneNumber: '',
    accountType: 0,
  };

  @observable resetPasswordFormValue: ResetPasswordDto = {
    token: '',
    password: '',
  };

  @action
  async setCreateUserForm(data: CreateUserDto) {
    this.createUserForm = data;
  }

  @action
  async setResetPasswordFormValue(data: ResetPasswordDto) {
    this.resetPasswordFormValue = data;
  }

  @action
  async register(lang: string) {
    const data = await accountService.register(this.createUserForm, lang);
    return data;
  }

  @action
  async forgotPassword(email: string, lang: string) {
    const data = await accountService.forgotPassword(email, lang);
    return data;
  }

  @action
  async resetCreateUserForm() {
    this.createUserForm = {
      email: '',
      password: '',
      phoneNumber: '',
      accountType: 0,
    };
  }

  @action
  async changePassword(history: any, userID: number, url: string) {
    const data = await accountService.changePassword(
      userID,
      this.resetPasswordFormValue
    );
    if (data) {
      history.push(url);
    }
  }

  @action
  async resetPassword(model: ResetPasswordDto) {
    const data = await accountService.resetPassword(model);
    return data;
  }

  @action
  async changeLanguage(id: number, token: string, language: string) {
    return await accountService.changeLanguage(id, token, language);
  }

  @action
  async setPassword(model: SetPasswordDto) {
    const data = await accountService.setPassword(model);
    return data;
  }
}

export default new AccountStore();

export const AccountStoreContext = React.createContext(new AccountStore());
