import { action, observable } from 'mobx';
import {
  CustomerListDto,
  CustomerTableDto,
} from '@/modules/customer/customer.dto';
import adminService from '@/modules/admin-user/admin.service';
import React from 'react';
import { DriverListDto, DriverTableDto } from '@/modules/driver/driver.dto';
import {
  DriverRequestDto,
  NewDriverRequestDto,
} from '@/modules/truckowner/truckowner.dto';
import {
  newRequestInit,
  updateRequestInit,
} from '@/modules/truckowner/truckowner.constants';
import {
  AdminListDto,
  AdminTableDto,
  defaultSettingDto,
  defaultSettingInit,
  DriverEarningDto,
  GetDriversEarningDto,
  NewAdminDto,
} from '@/modules/admin-user/admin.dto';
import { newAdminFormInit } from '@/modules/admin-user/admin.constants';
import { BLACK_BOX_TYPE, DISPLAY_ON, SETTING_TYPE } from './admin.enum';
import { REFERENCE_TYPE } from '../account/referenceType.enum';
import { LICENSE } from '@/libs/constants/price-quotation';
class AdminStore {
  @observable totalCount: number = 0;
  @observable customer: CustomerTableDto[] = [];
  @observable driver: DriverTableDto[] = [];
  @observable deletedDriver: DriverTableDto[] = [];
  @observable totalDeletedCount: number = 0;
  @observable admin: AdminTableDto[] = [];
  @observable deletedAdmin: AdminTableDto[] = [];
  @observable totalDeletedAdminCount: number = 0;
  @observable driverForm: NewDriverRequestDto = newRequestInit;
  @observable driverUpdateForm: DriverRequestDto = updateRequestInit;
  @observable updateDriver: any = null;

  @observable completedOrders: number = 0;
  @observable pendingOrders: number = 0;
  @observable cancelledOrders: number = 0;
  @observable allOrdersInMonth: number = 0;
  @observable allOrders: any[] = [];
  @observable beginYear: number = 0;
  @observable endYear: number = 0;
  @observable truckOwnerResult: any = null;
  @observable truckOwnerSeries: any[] = [];
  @observable truckOwnerLabels: any[] = [];

  @observable truckOwners: any[] = [];
  @observable selectedTruckOwner: any = null;
  @observable totalTruckOwners: number = 0;
  @observable truckOwnerDrivers: any[] = [];
  @observable selectedDriver: any = null;
  @observable totalTruckOwnerDrivers: number = 0;
  @observable truckOwnerTrucks: any[] = [];
  @observable selectedTruck: any = null;
  @observable totalTruckOwnerTrucks: number = 0;
  @observable truckOwnerInfo: any[] = [];

  @observable pricingSettings: any[] = [];
  @observable pricingSetting: any = null;
  @observable settings: defaultSettingDto = defaultSettingInit;
  @observable systemFiles: any = null;
  @observable truckTypes: any[] = [];
  @observable truckPayload: any[] = [];
  @observable license: LICENSE = LICENSE.STANDARD;
  @observable displayOn: DISPLAY_ON[] = [];
  @observable blackBoxType: BLACK_BOX_TYPE[] = [];

  @observable isShowModalSetupAccount: boolean = false;

  @action
  async setDriverForm(data: any) {
    this.driverForm.firstName = data.firstName;
    this.driverForm.cardNo = data.cardNo;
    this.driverForm.phoneNumber = data.phoneNumber;
  }

  @action
  async setUpdateDriverForm(data: any) {
    this.driverUpdateForm.firstName = data.firstName;
    this.driverUpdateForm.cardNo = data.cardNo;
    this.driverUpdateForm.phoneNumber = data.phoneNumber;
    this.driverUpdateForm.verifiedStatus = data.verifiedStatus;
    this.driverUpdateForm.licenseNo = data.licenseNo;
    this.driverUpdateForm.email = data.email;
    if (data.password) {
      this.driverUpdateForm.password = data.password;
    }
  }

  @action
  async resetUpdateDriver() {
    this.updateDriver = null;
  }

  @action
  async resetDriverForm() {
    this.driverForm = newRequestInit;
  }
  @observable adminForm: NewAdminDto = newAdminFormInit;

  @action
  async getCustomers(criteria: CustomerListDto) {
    const result = await adminService.getCustomers(criteria);
    if (result) {
      this.customer = result.data?.result[0];
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getDrivers(criteria: DriverListDto) {
    const result = await adminService.getDrivers(criteria);
    if (result) {
      this.driver = result.data?.result[0];
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getDeletedDrivers(criteria: DriverListDto) {
    const result = await adminService.getDeletedDrivers(criteria);
    if (result) {
      const [drivers, count] = result;
      this.deletedDriver = drivers;
      this.totalDeletedCount = count[0].total;
    }
  }

  @action
  async restoreDriverByIdByAdmin(id: number) {
    const data = await adminService.restoreDriverByIdByAdmin(id);
    return data;
  }

  @action
  async getDeletedAdmins(criteria: DriverListDto) {
    const result = await adminService.getDeletedAdmins(criteria);
    if (result) {
      const [admins, count] = result;
      this.deletedAdmin = admins;
      this.totalDeletedAdminCount = count[0].total;
    }
  }

  @action
  async restoreAdminById(id: number) {
    const data = await adminService.restoreAdminById(id);
    return data;
  }

  @action
  async updateDriverAccount(id: number) {
    const data = await adminService.updateDriverAccount(
      this.driverUpdateForm,
      id
    );
    return data;
  }

  @action
  async getDriver(id: number) {
    const result = await adminService.getDriver(id);
    if (result) {
      this.updateDriver = result.data?.result;
    }
  }

  async deleteDriver(id: number) {
    const result = await adminService.deleteDriver(id);
    return result.data?.result;
  }

  @action
  async deleteCustomer(id: number) {
    const result = await adminService.deleteCustomer(id);
    return result.data?.result;
  }

  // ----------------------------
  // admin
  // ----------------------------

  @action
  async getAdmins(criteria: AdminListDto) {
    const result = await adminService.getAdmins(criteria);
    if (result) {
      this.admin = result.data?.result[0];
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getAdminsById(id: number) {
    const result = await adminService.getAdminsById(id);
    if (result) {
      this.setAdminForm(result.data?.result);
    }
    return true;
  }

  @action
  async setAdminForm(data: any) {
    this.adminForm.firstName = data.firstName;
    this.adminForm.email = data.email;
    this.adminForm.phoneNumber = data.phoneNumber;
    this.adminForm.cardNo = data.cardNo;
    this.adminForm.userType = +data.userType;
    if (data.password) {
      this.adminForm.password = data.password;
    }
  }

  @action
  async resetAdminForm() {
    this.adminForm = newAdminFormInit;
  }

  @action
  async addAdmin() {
    const data = await adminService.addAdmin(this.adminForm);
    return data;
  }

  @action
  async updateAdmin(id: number, model: any) {
    const result = await adminService.updateAdmin(id, model);
    return result.data?.result;
  }

  @action
  async deleteAdmin(id: number) {
    const result = await adminService.deleteAdmin(id);
    return result.data?.result;
  }

  @action
  async addDriver() {
    const data = await adminService.addDriver(this.driverForm);
    return data;
  }

  @action
  async uploadDriverLicense(formData: any, id: number) {
    const data = await adminService.uploadDriverLicense(formData, id);
    return data;
  }

  @action
  async uploadDriverCardFront(formData: any, id: number) {
    const data = await adminService.uploadDriverCardFront(formData, id);
    return data;
  }

  @action
  async uploadDriverCardBack(formData: any, id: number) {
    const data = await adminService.uploadDriverCardBack(formData, id);
    return data;
  }

  @action
  async deleteFiles(id: number, referenceType: number) {
    return await adminService.deleteFiles(id, referenceType);
  }

  @action
  async customerCancellingOrder(id: number) {
    return await adminService.customerCancellingOrder(id);
  }

  @action
  async driverCancellingOrder(id: number) {
    return await adminService.driverCancellingOrder(id);
  }

  @action
  async getDataReport(month: number, year: number) {
    const [
      allOrdersInMonthResult,
      completedOrders,
      pendingOrders,
      cancelledOrder,
      yearResult,
      truckOwnerResult,
    ] = await adminService.getDataReport(month, year);

    this.allOrdersInMonth = allOrdersInMonthResult[1];
    this.completedOrders = completedOrders ?? [];
    this.pendingOrders = pendingOrders ?? [];
    this.cancelledOrders = cancelledOrder ?? [];
    this.beginYear = (yearResult && yearResult[0]) ?? 2020;
    this.endYear = (yearResult && yearResult[1]) ?? 2020;
    this.truckOwnerResult = truckOwnerResult;

    const series: any = [];
    const truckOwnerInfo: any = truckOwnerResult
      ? Object.keys(truckOwnerResult)
      : [];
    this.truckOwnerInfo = truckOwnerInfo;
    const labels = [];
    for (let i = 0; i < truckOwnerInfo.length; i++) {
      const eachInfo = truckOwnerInfo[i].split(',');
      if (eachInfo.length < 3) {
        labels.push(eachInfo[0] + ' (' + eachInfo[1] + ') ');
      } else {
        labels.push(eachInfo[0]);
      }
    }

    Object.keys(truckOwnerResult).forEach(function (key) {
      let value = truckOwnerResult[key];
      series.push(value);
    });

    this.truckOwnerLabels = labels;
    this.truckOwnerSeries = series;
  }

  @action
  async adminDeleteTruckOwner(id: number) {
    const data = await adminService.adminDeleteTruckOwner(id);
    return data;
  }

  @action
  async getAllTruckOwners() {
    const data = await adminService.getAllTruckOWners();
    this.truckOwners = data;
    return data;
  }

  @action
  async getTruckOwnerDrivers(truckOwnerId: number) {
    const data = await adminService.getTruckOwnerDrivers(truckOwnerId);
    this.truckOwnerDrivers = data;
    return data;
  }

  @action
  async getTruckOwnerTrucks(truckOwnerId: number) {
    const data = await adminService.getTruckOwnerTrucks(truckOwnerId);
    this.truckOwnerTrucks = data;
    return data;
  }

  @action
  async assignOrderTruckOwner(orderId: number, model: number) {
    const data = await adminService.assignOrderTruckOwner(orderId, model);
    return data;
  }

  @action
  async assignOrderDrivers(orderId: number, model: number[]) {
    const data = await adminService.assignOrderDrivers(orderId, model);
    return data;
  }

  @action
  async assignOrderTrucks(orderId: number, model: number[]) {
    const data = await adminService.assignOrderTrucks(orderId, model);
    return data;
  }

  @action
  async addPriceSetting() {
    const data = await adminService.addPriceSetting();
    return data;
  }

  @action
  async getPriceSettings() {
    const data = await adminService.getPriceSettings();
    const setting = data[0];
    for (let i = 0; i < setting.length; i++) {
      setting[i].distancePrices.sort((a: any, b: any) =>
        a.id > b.id ? 1 : -1
      );
      setting[i].dynamicCharges.sort((a: any, b: any) =>
        a.id > b.id ? 1 : -1
      );
      setting[i].payloadFares.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      setting[i].surCharges.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      setting[i].truckTypeFares.sort((a: any, b: any) =>
        a.id > b.id ? 1 : -1
      );
      setting[i].zonePrices.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      setting[i].multipleStopsCharges.sort((a: any, b: any) =>
        a.id > b.id ? 1 : -1
      );
    }
    this.pricingSettings = setting;
    return setting;
  }

  @action
  async getDynamicFieldsSetting() {
    const data = await adminService.getPriceSettings();
    const setting = data[0];
    const length = setting.length;
    if (this.pricingSettings.length > 0) {
      for (let i = 0; i < length; i++) {
        this.pricingSettings[i].distancePrices = setting[
          i
        ].distancePrices.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
        this.pricingSettings[i].dynamicCharges = setting[
          i
        ].dynamicCharges.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
        this.pricingSettings[i].payloadFares = setting[
          i
        ].payloadFares.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
        this.pricingSettings[i].surCharges = setting[
          i
        ].surCharges.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
        this.pricingSettings[i].truckTypeFares = setting[
          i
        ].truckTypeFares.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
        this.pricingSettings[i].zonePrices = setting[
          i
        ].zonePrices.sort((a: any, b: any) => (a.id > b.id ? 1 : -1));
      }
    }
  }

  @action
  async updatePriceSetting(values: any) {
    return await adminService.updatePriceSetting(values);
  }

  @action
  async deletePriceSetting(id: number) {
    const data = await adminService.deletePriceSetting(id);
    return data;
  }

  @action
  async updateTruckTypeFare(values: any, id: number) {
    let model: any = {
      truckType: '',
    };
    model.truckType = values ?? [];
    return await adminService.updateTruckTypeFare(model, id);
  }

  @action
  async deleteTruckTypeFare(id: number) {
    return await adminService.deleteTruckTypeFare(id);
  }

  @action
  async addTruckTypeFare(priceSettingId: number) {
    return await adminService.addTruckTypeFare(priceSettingId);
  }

  @action
  async handleAddPayloadFare(priceSettingId: number) {
    return await adminService.handleAddPayloadFare(priceSettingId);
  }

  @action
  async addZonePrice(priceSettingId: number) {
    return await adminService.addZonePrice(priceSettingId);
  }

  @action
  async deletePayloadFare(id: number) {
    return await adminService.deletePayloadFare(id);
  }

  @action
  async updatePayloadFare(values: any, id: number) {
    let model: any = {
      payload: '',
    };
    model.payload = values ?? [];
    return await adminService.updatePayloadFare(model, id);
  }

  @action
  async updatePayloadZone(values: any, id: number) {
    let model: any = {
      payload: '',
    };
    model.payload = values ?? [];
    return await adminService.updatePayloadZone(model, id);
  }

  @action
  async deletePayloadZone(id: number) {
    return await adminService.deletePayloadZone(id);
  }

  @action
  async updateDistancePrice(values: any, id: number, type: string) {
    let model: any = {};
    if (type === 'payload') {
      model = {
        payload: '',
      };
      model.payload = values ?? [];
    } else {
      model = {
        truckType: '',
      };
      model.truckType = values ?? [];
    }

    return await adminService.updateDistancePrice(model, id);
  }

  @action
  async updateMultipleStops(values: any, id: number, type: string) {
    let model: any = {};
    if (type === 'payload') {
      model = {
        truckPayload: '',
      };
      model.truckPayload = values ?? [];
    } else {
      model = {
        truckType: '',
      };
      model.truckType = values ?? [];
    }

    return await adminService.updateMultipleStops(model, id);
  }

  @action
  async deleteDistancePrice(id: number) {
    return await adminService.deleteDistancePrice(id);
  }

  @action
  async createDistanceFare(id: number) {
    return await adminService.createDistanceFare(id);
  }

  @action
  async getDistances(id: number) {
    return await adminService.getDistances(id);
  }

  @action
  async createDistance(id: number) {
    return await adminService.createDistance(id);
  }

  @action
  async deleteDistance(id: number) {
    return await adminService.deleteDistance(id);
  }

  @action
  async createDynamicItem(id: number) {
    return await adminService.createDynamicItem(id);
  }

  @action
  async createMultipleStops(id: number) {
    return await adminService.createMultipleStops(id);
  }

  @action
  async deleteMultipleStops(id: number) {
    return await adminService.deleteMultipleStops(id);
  }

  @action
  async deleteDynamicItem(id: number) {
    return await adminService.deleteDynamicItem(id);
  }

  @action
  async getSetting(type: number) {
    const data = await adminService.getSetting(type);
    this.pricingSetting = data;
    return data;
  }

  @action
  async getSettings() {
    const data = await adminService.getSettings();
    const dataFiles = await adminService.getSystemFiles();

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
    this.settings.autoVerifyOrder = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.AUTO_VERIFY_ORDER
    ).enabled;
    this.settings.truckPool = data.find(
      (x: { settingType: SETTING_TYPE }) =>
        x.settingType === SETTING_TYPE.TRUCK_POOL
    ).enabled;
    this.systemFiles = dataFiles;
    return data;
  }

  @action
  async getSystemFiles() {
    const data = await adminService.getSystemFiles();
    this.systemFiles = data;
  }

  @action
  async updateSetting(values: any) {
    return await adminService.updateSetting(values);
  }

  @action
  async updateSettings(values: any) {
    return await adminService.updateSettings(values);
  }

  @action
  async updateCreateOrderSettings(values: any) {
    return await adminService.updateCreateOrderSettings(values);
  }

  @action
  async updateTruckPoolSettings(values: any) {
    return await adminService.updateTruckPoolSettings(values);
  }

  @action
  async syncData() {
    return await adminService.syncData();
  }

  @action
  async editPaymentDoneByCustomer(isDone: boolean, orderId: number) {
    const data = await adminService.editPaymentDoneByCustomer(isDone, orderId);
    return data;
  }

  async uploadDriverOtherDoc(files: File[], id: number) {
    const data = await adminService.uploadDriverOtherDoc(files, id);
    return data;
  }

  @action
  async editPaymentDoneByTruckOwner(isDone: boolean, orderId: number) {
    const data = await adminService.editPaymentDoneByTruckOwner(
      isDone,
      orderId
    );
    return data;
  }

  async deleteFileByFileId(id: number, fileId: string, type: number) {
    const data = await adminService.deleteFileByFileId(id, fileId, type);
    return data;
  }

  @action
  async deleteSystemFile(type: number) {
    const data = await adminService.deleteSystemFile(type);
    return data;
  }

  @action
  async uploadSystemImg(formData: any, fileType: REFERENCE_TYPE) {
    const data = await adminService.uploadSystemImg(formData, fileType);
    return data;
  }

  @action
  async getDriversEarning(criteria: GetDriversEarningDto) {
    const data = await adminService.getDeriversEarning(criteria);
    return data;
  }

  @action
  async payDriverEarning(id: number, model: any) {
    const data = await adminService.payDriverEarning(id, model);
    return data;
  }

  @action
  setModalSetupAccount(state: boolean) {
    this.isShowModalSetupAccount = state;
  }
}

export default new AdminStore();

export const AdminStoreContext = React.createContext(new AdminStore());
