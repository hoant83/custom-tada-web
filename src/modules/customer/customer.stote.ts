import React from 'react';
import { observable, action } from 'mobx';
import customerService from '@/modules/customer/customer.service';
import {
  CustomerListDto,
  CustomerRequestDto,
  CustomerUpdateFormDto,
  UpdateCustomerRequestDto,
  NewCompanyRequestDto,
  NewEmployeeDto,
  FilterEmployeeDto,
  FilterFavoriteTruckOwnerDto,
  AdminCustomerRequestDto,
  DefaultReference,
  DefaultPayment,
} from '@/modules/customer/customer.dto';
import {
  newCustomerInit,
  newCompanyInit,
  newEmployeeFormInit,
  customerRequestInit,
  customerUpdateFormInit,
  adminCustomerFormInit,
  defaultReferenceInit,
  defaultPaymentInit,
} from '@/modules/customer/customer.constants';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import { VERIFIED_STATUS, USER_STATUS } from '@/modules/customer/customer.enum';

export default class CustomerStore {
  @observable customerRequestDto: CustomerRequestDto = customerRequestInit;

  // Account Setup
  @observable accountForm: UpdateCustomerRequestDto = newCustomerInit;
  @observable currentUserDetail: any = null;

  // Company
  @observable company: any = null;
  @observable companyForm: NewCompanyRequestDto = newCompanyInit;

  // Employee
  @observable employees: any[] = [];
  @observable totalEmployees: number = 0;
  @observable employeeForm: NewEmployeeDto = newEmployeeFormInit;

  // Favorite Truckowner
  @observable favoriteTruckOwers: any[] = [];
  @observable totalFavoriteCount: number = 0;

  // Admin - Listing
  @observable customers: any[] = [];
  @observable totalCount: number = 0;

  @observable deletedCustomers: any[] = [];
  @observable totalDeletedCount: number = 0;

  // Admin - Edit Account
  // @observable accountForm: UpdateCustomerRequestDto = newCustomerInit;
  @observable customerAdmin: any = null;
  @observable
  customerUpdateForm: CustomerUpdateFormDto = customerUpdateFormInit;

  // Admin - Create Customer
  @observable
  adminCustomerForm: AdminCustomerRequestDto = adminCustomerFormInit;

  @observable defaultReference: DefaultReference;
  @observable defaultPayment: DefaultPayment;
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
  @observable truckOwnerInfo: any[] = [];
  constructor() {
    this.defaultReference = defaultReferenceInit;
    this.defaultPayment = defaultPaymentInit;
  }
  @action
  async setCustomerRequestDto(data: CustomerRequestDto) {
    this.customerRequestDto = data;
  }

  @action
  async setCustomerUpdateForm(data: any) {
    // this.customerUpdateForm = data;
    this.customerUpdateForm.phoneNumber = data.phoneNumber ?? '';
    this.customerUpdateForm.email = data.email ?? '';
    this.customerUpdateForm.firstName = data.firstName ?? '';
    this.customerUpdateForm.lastName = data.lastName ?? '';
    this.customerUpdateForm.cardNo = data.cardNo ?? '';
    this.customerUpdateForm.userStatus = +data.userStatus ?? USER_STATUS.ACTIVE;
    this.customerUpdateForm.companyId = data.companyId;
    this.customerUpdateForm.verifiedStatus =
      +data.verifiedStatus ?? VERIFIED_STATUS.UNVERIFIED;
    this.customerUpdateForm.password = data.password;
    this.customerUpdateForm.accountType = data.accountType;
  }

  // ----------------------------
  // Account Setup
  // ----------------------------
  @action
  async setAccountForm(data: any) {
    this.accountForm.phoneNumber = data.phoneNumber;
    this.accountForm.cardNo = data.cardNo;
    this.accountForm.companyId = data.companyId;
    this.accountForm.firstName = data.firstName;
    this.accountForm.accountType = data.accountType;
    this.accountForm.password = data.password;
  }

  @action
  async getAccountInfo() {
    const data = await customerService.getAccountInfo();
    this.currentUserDetail = data;
    return data;
  }

  @action
  async updateAccount(id: number) {
    const data = await customerService.updateAccount(this.accountForm, id);
    this.company = data;
    return data;
  }

  @action
  async uploadCardFront(formData: any, id: number) {
    const data = await customerService.uploadCardFront(formData, id);
    return data;
  }

  @action
  async uploadCardBack(formData: any, id: number) {
    const data = await customerService.uploadCardBack(formData, id);
    return data;
  }

  @action
  async uploadAvatar(formData: any, id: number) {
    const data = await customerService.uploadAvatar(formData, id);
    return data;
  }

  @action
  async deleteAccountFile(id: number, type: number) {
    const data = await customerService.deleteFiles(id, type);
    return data;
  }

  // ----------------------------
  // Company
  // ----------------------------

  @action
  async setCompanyForm(data: any) {
    this.companyForm.name = data.name;
    this.companyForm.phone = data.phone;
    this.companyForm.address = data.address;
    this.companyForm.licenseNo = data.licenseNo;
  }

  @action
  async resetCompanyForm() {
    this.companyForm = newCompanyInit;
  }

  @action
  async getCompany() {
    const data = await customerService.getCompany();
    this.company = data;
    return data;
  }

  @action
  async createCompany() {
    const data = await customerService.createCompany(this.companyForm);
    this.company = data;
    return data;
  }

  @action
  async updateCompany() {
    const data = await customerService.updateCompany(this.companyForm);
    this.company = data;
    return data;
  }

  @action
  async uploadCompanyIco(formData: any, id: number) {
    const data = await customerService.uploadCompanyIco(formData, id);
    if (this.company) this.company.companyIconUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async uploadBusinessLicense(formData: any, id: number) {
    const data = await customerService.uploadBusinessLicense(formData, id);
    if (this.company) this.company.businessLicenseUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async deleteCompanyFile(id: number, type: number) {
    const data = await customerService.deleteCompanyFile(id, type);
    if (type === REFERENCE_TYPE.COMPANY_ICON) {
      this.company.companyIconUrl = '';
    }
    if (type === REFERENCE_TYPE.BUSINESS_LICENSE) {
      this.company.businessLicenseUrl = '';
    }
    return data;
  }

  // ----------------------------
  // Employee
  // ----------------------------

  @action
  async setEmployeeForm(data: any) {
    this.employeeForm.firstName = data.firstName;
    this.employeeForm.email = data.email;
    this.employeeForm.phoneNumber = data.phoneNumber;
    this.employeeForm.cardNo = data.cardNo;
    this.employeeForm.accountRole = +data.accountRole;
    this.employeeForm.accountType = +data.accountType;
    if (data.password) {
      this.employeeForm.password = data.password;
    }
  }

  @action
  async resetEmployeeForm() {
    this.employeeForm = newEmployeeFormInit;
  }

  @action
  async getEmployees(criteria: FilterEmployeeDto) {
    const data = await customerService.getEmployees(criteria);
    this.employees = data[0];
    this.totalEmployees = data[1];
  }

  @action
  async getEmployeeById(id: number) {
    const result = await customerService.getEmployeeById(id);
    if (result) {
      return result.data?.result;
    }
  }

  @action
  async addEmployee() {
    const data = await customerService.addEmployee(this.employeeForm);
    return data;
  }

  @action
  async updateEmployee(id: number) {
    const data = await customerService.updateEmployee(this.employeeForm, id);
    return data;
  }

  @action
  async deleteEmployee(id: number) {
    const data = await customerService.deleteEmployee(id);
    return data;
  }

  // ----------------------------
  // Favorite Truckowner
  // ----------------------------
  @action
  async getFavoriteTruckOwner(criteria: FilterFavoriteTruckOwnerDto) {
    const data = await customerService.getFavoriteTruckOwner(criteria);
    if (data) {
      this.favoriteTruckOwers = data[0];
      this.totalFavoriteCount = data[1];
    }
  }

  @action
  async getAllFavoriteTruckOwner() {
    const data = await customerService.getAllFavoriteTruckOwner();
    if (data) {
      this.favoriteTruckOwers = data[0];
      this.totalFavoriteCount = data[1];
    }
  }

  @action
  async deleteFavoriteTruckOwner(id: number): Promise<boolean> {
    return await customerService.deleteFavoriteTruckOwner(id);
  }

  @action
  async resetFavoriteTruckOwner(): Promise<Boolean> {
    return await customerService.resetFavoriteTruckOwner();
  }

  @action
  async addFavoriteTruckOwner(publicId: string): Promise<Boolean> {
    return await customerService.addFavoriteTruckOwner(publicId);
  }

  // ----------------------------
  // Admin
  // ----------------------------

  //
  // Customer
  //
  @action
  async setAdminCustomerForm(data: any) {
    this.adminCustomerForm.firstName = data.firstName ?? '';
    this.adminCustomerForm.lastName = data.lastName ?? '';
    this.adminCustomerForm.email = data.email ?? '';
    this.adminCustomerForm.phoneNumber = data.phoneNumber;
    this.adminCustomerForm.accountRole = +data.accountRole;
    this.adminCustomerForm.accountType = data.accountType;
  }

  @action
  async resetAdminCustomerForm() {
    this.adminCustomerForm = adminCustomerFormInit;
  }

  public async addCustomerByAdmin() {
    const data = await customerService.addCustomerByAdmin(
      this.adminCustomerForm
    );
    return data;
  }

  @action
  async deleteCustomerByIdByAdmin(id: number) {
    const data = await customerService.deleteCustomerByAdmin(id);
    return data;
  }

  @action
  async verifyCustomerByAdmin(id: number) {
    const data = await customerService.verifyCustomerByAdmin(id);
    return data;
  }

  @action
  async getCustomerByAdmin(filter: CustomerListDto) {
    const data = await customerService.getCustomerByAdmin(filter);
    const [customers, count] = data;
    this.customers = customers;
    this.totalCount = count;
    return data;
  }

  @action
  async getDeletedCustomerByAdmin(filter: CustomerListDto) {
    const data = await customerService.getDeletedCustomerByAdmin(filter);
    const [customers, count] = data;
    this.deletedCustomers = customers;
    this.totalDeletedCount = count[0].total;
    return data;
  }

  @action
  async createCustomerByAdmin() {
    const data = await customerService.createCustomerByAdmin(
      this.customerRequestDto
    );
    return data;
  }

  @action
  async getCustomerByIdByAdmin(id: number) {
    const data = await customerService.getCustomerByIdByAdmin(id);
    this.customerAdmin = null;
    this.customerAdmin = data;
    return data;
  }

  @action
  async updateCustomerByAdmin(id: number) {
    const data = await customerService.updateCustomerByAdmin(
      this.customerUpdateForm,
      id
    );
    return data;
  }

  @action
  async restoreCustomerByIdByAdmin(id: number) {
    const data = await customerService.restoreCustomerByIdByAdmin(id);
    return data;
  }

  @action
  async getCompanyByAdmin(id: number) {
    const data = await customerService.getCompanyByAdmin(id);
    this.company = data;
    return data;
  }

  @action
  async createCompanyByAdmin(id: number) {
    const data = await customerService.createCompanyByAdmin(
      this.companyForm,
      id
    );
    this.company = data;
    return data;
  }

  @action
  async updateCompanyByAdmin(id: number) {
    const data = await customerService.updateCompanyByAdmin(
      this.companyForm,
      id
    );
    this.company = data;
    return data;
  }

  @action
  async uploadCardFrontByAdmin(formData: any, id: number) {
    const data = await customerService.uploadCardFrontByAdmin(formData, id);
    return data;
  }

  @action
  async uploadCardBackByAdmin(formData: any, id: number) {
    const data = await customerService.uploadCardBackByAdmin(formData, id);
    return data;
  }

  @action
  async uploadAvatarByAdmin(formData: any, id: number) {
    const data = await customerService.uploadAvatarByAdmin(formData, id);
    return data;
  }

  @action
  async deleteAccountFileByAdmin(id: number, type: number) {
    const data = await customerService.deleteFilesByAdmin(id, type);
    return data;
  }

  @action
  async uploadCompanyIcoByAdmin(formData: any, id: number) {
    const data = await customerService.uploadCompanyIcoByAdmin(formData, id);
    if (this.company) this.company.companyIconUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async uploadBusinessLicenseByAdmin(formData: any, id: number) {
    const data = await customerService.uploadBusinessLicenseByAdmin(
      formData,
      id
    );
    if (this.company) this.company.businessLicenseUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async deleteCompanyFileByAdmin(id: number, type: number) {
    const data = await customerService.deleteCompanyFileByAdmin(id, type);
    if (type === REFERENCE_TYPE.COMPANY_ICON) {
      this.company.companyIconUrl = '';
    }
    if (type === REFERENCE_TYPE.BUSINESS_LICENSE) {
      this.company.businessLicenseUrl = '';
    }
    return data;
  }

  @action
  async getEmployeesByAdmin(criteria: FilterEmployeeDto, customerId: number) {
    const data = await customerService.getEmployeesByAdmin(
      criteria,
      customerId
    );
    this.employees = data[0];
    this.totalEmployees = data[1];
  }

  @action
  async getEmployeeByIdByAdmin(id: number, customerId: number) {
    const result = await customerService.getEmployeeByIdByAdmin(id, customerId);
    if (result) {
      return result.data?.result;
    }
  }

  @action
  async addEmployeeByAdmin(customerId: number) {
    const data = await customerService.addEmployeeByAdmin(
      this.employeeForm,
      customerId
    );
    return data;
  }

  @action
  async updateEmployeeByAdmin(id: number) {
    const data = await customerService.updateEmployeeByAdmin(
      this.employeeForm,
      id
    );
    return data;
  }

  @action
  async deleteEmployeeByAdmin(id: number, customerId: number) {
    const data = await customerService.deleteEmployeeByAdmin(id, customerId);
    return data;
  }

  @action
  async getFavoriteTruckOwnerByAdmin(
    criteria: FilterFavoriteTruckOwnerDto,
    customerId: number
  ) {
    const data = await customerService.getFavoriteTruckOwnerByAdmin(
      criteria,
      customerId
    );
    if (data) {
      this.favoriteTruckOwers = data[0];
      this.totalFavoriteCount = data[1];
    }
  }

  @action
  async getAllFavoriteTruckOwnerByAdmin(orderId: number) {
    const data = await customerService.getAllFavoriteTruckOwnerByAdmin(orderId);
    if (data) {
      this.favoriteTruckOwers = data[0];
      this.totalFavoriteCount = data[1];
    }
  }

  @action
  async deleteFavoriteTruckOwnerByAdmin(
    id: number,
    customerId: number
  ): Promise<boolean> {
    return await customerService.deleteFavoriteTruckOwnerByAdmin(
      id,
      customerId
    );
  }

  @action
  async resetFavoriteTruckOwnerByAdmin(customerId: number): Promise<Boolean> {
    return await customerService.resetFavoriteTruckOwnerByAdmin(customerId);
  }

  @action
  async addFavoriteTruckOwnerByAdmin(
    publicId: string,
    customerId: number
  ): Promise<Boolean> {
    return await customerService.addFavoriteTruckOwnerByAdmin(
      publicId,
      customerId
    );
  }

  @action
  async cancelOrderByCustomer(id: number) {
    const data = await customerService.cancelOrderByCustomer(id);
    return data;
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
    ] = await customerService.getDataReport(month, year);
    this.allOrdersInMonth = allOrdersInMonthResult
      ? allOrdersInMonthResult[1]
      : [];
    this.completedOrders = completedOrders ?? [];
    this.pendingOrders = pendingOrders ?? [];
    this.cancelledOrders = cancelledOrder ?? [];
    this.beginYear = (yearResult && yearResult[0]) ?? 2020;
    this.endYear = (yearResult && yearResult[1]) ?? 2020;
    this.truckOwnerResult = truckOwnerResult ?? [];

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

    if (truckOwnerResult) {
      Object.keys(truckOwnerResult).forEach(function (key) {
        let value = truckOwnerResult[key];
        series.push(value);
      });
    }

    this.truckOwnerLabels = labels;
    this.truckOwnerSeries = series;
  }

  // Default reference
  @action
  async getDefaultReference() {
    const data = await customerService.getDefaultReference();
    this.defaultReference = data;
    return data;
  }

  @action
  async updateDefaultReference(model: DefaultReference) {
    const data = await customerService.updateDefaultReference(model);
    return data;
  }

  // Payment

  @action
  async getDefaultPayment() {
    const data = await customerService.getDefaultPayment();
    this.defaultPayment = data;
    return data;
  }

  @action
  async updateDefaultPayment(model: DefaultPayment) {
    const data = await customerService.updateDefaultPayment(model);
    return data;
  }

  @action
  async editPaymentDone(isDone: boolean, orderId: number) {
    const data = await customerService.editPaymentDone(isDone, orderId);
    return data;
  }
}

export const CustomerStoreContext = React.createContext(new CustomerStore());
