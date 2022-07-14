import { LICENSE } from '@/libs/constants/price-quotation';
import { removeFromStorage, saveToStorage } from '@/libs/utils/storage.util';
import { LoginDto } from '@/modules/account/account.dto';
import authenticateService from '@/modules/account/authenticate.service';
import { action, observable } from 'mobx';
import React from 'react';
import { defaultSettingDto, defaultSettingInit } from '../admin-user/admin.dto';
import {
  BLACK_BOX_TYPE,
  DISPLAY_ON,
  SETTING_TYPE,
} from '../admin-user/admin.enum';
import adminService from '../admin-user/admin.service';

export default class AuthenticationStore {
  @observable loggedUser: any = null;
  @observable tmpUser: any = null;
  @observable loginFormValue: LoginDto = {
    email: '',
    password: '',
  };

  @observable settings: defaultSettingDto = defaultSettingInit;
  @observable systemFiles: any = null;
  @observable color: any = null;
  @observable license: any = LICENSE.STANDARD;
  @observable displayOn: DISPLAY_ON[] = [];
  @observable blackBoxType: BLACK_BOX_TYPE[] = [];
  @observable enableQuotation: boolean = false;
  @action
  async setLoginFormValue(data: LoginDto) {
    this.loginFormValue = data;
  }

  @action
  async setLoggedUser(data: any) {
    this.loggedUser = data;
  }

  @action
  async clearTmpUser() {
    this.tmpUser = null;
  }

  @action
  async login(history: any, url: string, callbackOTP?: any) {
    const data = await authenticateService.login(
      this.loginFormValue,
      callbackOTP
    );
    if (data) {
      this._setCurrentInfo(data);
      this._redirectAfterLogin(history, url);
    }
  }

  @action
  async validateToken(token: string, history: any) {
    const data = await authenticateService.validateToken(token);
    if (data) {
      this._saveUser(data);
    }
  }

  @action
  async validateResetToken(token: string, history: any) {
    const data = await authenticateService.validateResetToken(token);
    if (data) {
      this.tmpUser = data;
    }
  }

  @action
  async logout(history: any, url: string) {
    removeFromStorage('token');
    this.loggedUser = null;
    history.push(url);
  }

  private _setCurrentInfo(data: any) {
    this.loggedUser = data;
    saveToStorage('token', data.token);
  }

  private _saveUser(data: any) {
    this.loggedUser = data;
  }

  private _redirectAfterLogin(history: any, url: string) {
    return history.push(url);
  }

  @action
  async registerToken(token: string) {
    const result = await authenticateService.registerToken(token);
    return result;
  }

  @action
  async validateEmailToken(token: string) {
    const result = await authenticateService.validateEmailToken(token);
    if (result) {
      this.tmpUser = result;
    }
    return result;
  }

  @action
  async getSetting(type: number) {
    const data = await authenticateService.getSetting(type);
    return data;
  }

  @action
  async getSettings() {
    const data = await authenticateService.getSettings();
    const dataFiles = await authenticateService.getSystemFiles();
    this.settings.email = data.find(
      (x: { settingType: SETTING_TYPE }) => x.settingType === SETTING_TYPE.EMAIL
    ).rawHtml;
    this.settings.fbLabel = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.FB_TEXT
    ).rawHtml;
    this.settings.fbLink = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.FB_LINK
    ).rawHtml;
    this.settings.qrLabel = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.QR_TEXT
    ).rawHtml;
    this.settings.phoneNumber = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.PHONE_NUMBER
    ).rawHtml;
    this.settings.companyName = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.COMPANY_NAME
    ).rawHtml;
    this.settings.defaultColor = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.DEFAULT_COLOR
    ).rawHtml;
    this.settings.monthlyOrder = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.MONTHLY_ORDER
    ).rawHtml;
    this.systemFiles = dataFiles;
    this.color = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.DEFAULT_COLOR
    ).rawHtml;
    this.settings.remain = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.MONTHLY_ORDER
    ).remain;
    this.settings.autoVerifyOrder = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.AUTO_VERIFY_ORDER
    ).enabled;
    this.settings.truckPool = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.TRUCK_POOL
    ).enabled;
    return data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.DEFAULT_COLOR
    ).rawHtml;
  }

  getSettingsSchedule() {
    this.getSettings();
    return setInterval(() => this.getSettings(), 30000);
  }

  getTrackingSchedule() {
    this.getTrackingSettings();
    return setInterval(() => this.getTrackingSettings(), 15000);
  }

  @action
  async getRemainOrders() {
    const data = await authenticateService.getSettings();
    return data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.MONTHLY_ORDER
    ).remain;
  }

  getRemainOrderSchedule() {
    return this.getRemainOrders();
  }

  @action
  async getTrackingSettings() {
    const data = await authenticateService.getTrackingSettings();
    if (data) {
      this.license = data.license;
      this.displayOn = data.displayOn;
      this.blackBoxType = data.blackBoxType;
      this.enableQuotation = data.enableQuotation;
    }
    return data;
  }
}

export const AuthenticationStoreContext = React.createContext(
  new AuthenticationStore()
);
