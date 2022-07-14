import React from 'react';
import AuthenticationStore from '@/modules/account/authentication.store';
// import { action, observable } from 'mobx';
// import UpdateAccountInfo from '@/modules/account/updateAccount.dto';
// import customerService from '@/modules/customer/customer.service';
// import { FavoriteTruckOwnerOp } from '@/modules/truckowner/truckowner.dto';

export default class CustomerAuthenticationStore extends AuthenticationStore {
  // @observable updateAccountForm: UpdateAccountInfo = {
  //   firstName: '',
  //   phoneNumber: '',
  //   cardNo: '',
  //   accountRole: '',
  // };
  // @observable favoriteTruckOp: any[] = [];
  // @observable totalCount: number = 0;
  // @observable company = null;
  // @action
  // async updateAccountInfo(model: UpdateAccountInfo, id: number) {
  //   return await customerService.updateAccountInfo(model, id);
  // }
  // @action
  // async uploadFrontCard(formData: any, id: number) {
  //   return await customerService.uploadFrontCard(formData, id);
  // }
  // @action
  // async uploadBackCard(formData: any, id: number) {
  //   return await customerService.uploadBackCard(formData, id);
  // }
  // @action
  // async uploadBusinessLicense(formData: any, id: number) {
  //   return await customerService.uploadBusinessLicense(formData, id);
  // }
  // @action
  // async uploadCompanyIco(formData: any, id: number) {
  //   return await customerService.uploadCompanyIco(formData, id);
  // }
  // @action
  // async getFavoriteTruckOwner(criteria: FavoriteTruckOwnerOp) {
  //   const data = await customerService.getFavoriteTruckOp(criteria);
  //   if (data) {
  //     this.favoriteTruckOp = data[0];
  //     this.totalCount = data[1];
  //   }
  // }
  // @action
  // async deleteFavoriteTruckOwner(id: number): Promise<boolean> {
  //   return await customerService.deleteFavoriteTruckOwner(id);
  // }
  // @action
  // async resetFavoriteTruckOwner(): Promise<Boolean> {
  //   return await customerService.resetFavoriteTruckOwner();
  // }
  // @action
  // async addFavoriteTruckOwner(publicId: string): Promise<Boolean> {
  //   return await customerService.addFavoriteTruckOwner(publicId);
  // }
  // @action
  // async getEmployeeByid(id: number) {
  //   return await customerService.getEmployeeByid(id);
  // }
  // @action
  // async deleteFile(referenceId: number, referenceType: number) {
  //   return await customerService.deleteFile(referenceId, referenceType);
  // }
}

export const CustomerAuthenticationStoreContext = React.createContext(
  new CustomerAuthenticationStore()
);
