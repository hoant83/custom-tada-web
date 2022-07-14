import React from 'react';
import { observable, action } from 'mobx';
import truckOwnerService from '@/modules/truckowner/truckowner.service';
import { UserTableDto, CreateUserDto } from '@/modules/account/account.dto';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import {
  UpdateTruckOwnerRequestDto,
  FilterDriverDto,
  FilterTruckDto,
  DriverRequestDto,
  NewDriverRequestDto,
  NewCompanyRequestDto,
  NewTruckDto,
  AdminFilterDto,
  TruckOwnerUpdateFormDto,
  AdminTruckOwnerRequestDto,
  NewBankAccountRequestDto,
} from '@/modules/truckowner/truckowner.dto';
import {
  newRequestInit,
  newCompanyInit,
  newTruckOwnerInit,
  newTruckFormInit,
  truckOwnerUpdateFormInit,
  adminTruckOwnerFormInit,
  newBankAccountInit,
} from '@/modules/truckowner/truckowner.constants';
import {
  VERIFIED_STATUS,
  USER_STATUS,
} from '@/modules/truckowner/truckowner.enum';
import { GetDriversEarningDto } from '../admin-user/admin.dto';
import truckownerService from '@/modules/truckowner/truckowner.service';

class TruckOwnerStore {
  @observable drivers: DriverRequestDto[] = [];
  @observable driverForm: NewDriverRequestDto = newRequestInit;
  @observable truckForm: NewTruckDto = newTruckFormInit;
  @observable myDrivers: any[] = [];
  @observable selectedDriver: any = null;
  @observable totalDrivers: number = 0;
  @observable myTrucks: any[] = [];
  @observable totalTrucks: number = 0;
  @observable users: UserTableDto[] = [];
  @observable totalCount: number = 0;
  @observable currentUserDetail: any = null;
  @observable provinces: any = null;
  @observable createUserForm: CreateUserDto = {
    email: '',
    password: '',
    phoneNumber: '',
    accountType: 0,
  };
  @observable containerSize: any[] = [];
  @observable truckPayload: any[] = [];
  @observable nonMotorizedType: any[] = [];
  @observable concatenatedGoodsType: any[] = [];
  @observable contractCarType: any[] = [];

  // Account Setup
  @observable accountForm: UpdateTruckOwnerRequestDto = newTruckOwnerInit;
  @observable accountService: any = {};

  // Company
  @observable company: any = null;
  @observable companyForm: NewCompanyRequestDto = newCompanyInit;

  // BankAccount
  @observable bankAccount: any = null;
  @observable bankAccountForm: NewBankAccountRequestDto = newBankAccountInit;

  // My Jobs
  @observable orderTrucks: any[] = [];
  @observable orderDrivers: any[] = [];

  // Admin - Listing
  @observable truckowners: any[] = [];
  @observable totalTruckOwners: number = 0;

  @observable deletedTruckOwners: any[] = [];
  @observable totalDeletedTruckOwners: number = 0;

  // Admin - Edit Account
  @observable truckOwnerAdmin: any = null;
  @observable
  truckOwnerUpdateForm: TruckOwnerUpdateFormDto = truckOwnerUpdateFormInit;

  // Admin - Add New Account
  @observable
  adminTruckOwnerForm: AdminTruckOwnerRequestDto = adminTruckOwnerFormInit;
  @observable companyAdmin: any = null;
  @observable companyAdminForm: NewCompanyRequestDto = newCompanyInit;
  @observable bankAccountAdmin: any = null;
  @observable
  bankAccountAdminForm: NewBankAccountRequestDto = newBankAccountInit;
  @observable myAdminTrucks: any[] = [];
  @observable totalAdminTrucks: number = 0;
  @observable adminDrivers: any[] = [];
  @observable totalAdminDrivers: number = 0;

  //TruckOwner - Report
  @observable completedOrders: number = 0;
  @observable pendingOrders: number = 0;
  @observable cancelledOrders: number = 0;
  @observable allOrdersInMonth: number = 0;
  @observable allOrders: any[] = [];
  @observable beginYear: number = 0;
  @observable endYear: number = 0;
  @observable customerResult: any = null;
  @observable customerSeries: any[] = [];
  @observable customerLabels: any[] = [];
  @observable customerInfo: any[] = [];
  @observable customerRevenue: number[] = [];

  // OTP
  @observable isSendOTPSuccess: boolean | null = null;

  @action
  async setCreateUserForm(data: CreateUserDto) {
    this.createUserForm = data;
  }

  @action
  async setAccountForm(data: any) {
    this.accountForm.firstName = data.firstName;
    this.accountForm.phoneNumber = data.phoneNumber;
    this.accountForm.cardNo = data.cardNo;
    this.accountForm.companyId = data.companyId;
    this.accountForm.password = data.password;
  }

  @action
  async setDriverForm(ownerId: number, data: any) {
    this.driverForm.firstName = data.firstName;
    this.driverForm.cardNo = data.cardNo;
    this.driverForm.ownerId = ownerId;
    this.driverForm.phoneNumber = data.phoneNumber;
  }

  @action
  async setTruckForm(data: any) {
    this.truckForm.truckNo = data.truckNo;
    this.truckForm.truckLoad = data.truckLoad;
    this.truckForm.truckType = +data.truckType;
  }

  @action
  async resetDriverForm() {
    this.driverForm = newRequestInit;
  }

  @action
  async resetTruckForm() {
    this.driverForm = newTruckFormInit;
  }

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
  async setBankAccountForm(data: any) {
    this.bankAccountForm.companyName = data.companyName;
    this.bankAccountForm.businessLicenseNo = data.businessLicenseNo;
    this.bankAccountForm.bankName = data.bankName;
    this.bankAccountForm.bankBranch = data.bankBranch;
    this.bankAccountForm.bankAccountHolderName = data.bankAccountHolderName;
    this.bankAccountForm.bankAccountNumber = data.bankAccountNumber;
  }

  @action
  async setBankAccountAdminForm(data: any) {
    this.bankAccountAdminForm.companyName = data.companyName;
    this.bankAccountAdminForm.businessLicenseNo = data.businessLicenseNo;
    this.bankAccountAdminForm.bankName = data.bankName;
    this.bankAccountAdminForm.bankBranch = data.bankBranch;
    this.bankAccountAdminForm.bankAccountHolderName =
      data.bankAccountHolderName;
    this.bankAccountAdminForm.bankAccountNumber = data.bankAccountNumber;
  }

  @action
  async resetBankAccountForm() {
    this.bankAccountForm = newBankAccountInit;
  }

  @action
  async resetBankAccountAdminForm() {
    this.bankAccountAdminForm = newBankAccountInit;
  }

  @action
  async register() {
    const data = await truckOwnerService.register(this.createUserForm);
    return data;
  }

  @action
  async forgotPassword(email: string, lang: string) {
    const data = await truckOwnerService.forgotPassword(email, lang);
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

  // ----------------------------
  // Account Setup
  // ----------------------------
  @action
  async getProvince() {
    const data = await truckOwnerService.getProvince();
    this.provinces = data[0];
    return data;
  }

  @action
  async getAccountInfo() {
    const data = await truckOwnerService.getAccountInfo();
    this.currentUserDetail = data;
    return data;
  }

  @action
  async updateAccount(id: number) {
    const data = await truckOwnerService.updateAccount(this.accountForm, id);
    this.company = data;
    return data;
  }

  @action
  async updateServiceType(serviceType: any, id: number) {
    let model: any = {
      serviceType: '',
    };
    model.serviceType = serviceType;
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  @action
  async updatePickupZone(pickupZone: number[], id: number) {
    let model: any = {
      pickupZone: '',
    };
    model.pickupZone = pickupZone ?? [];
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  @action
  async updateContainerSize(containerSize: string[], id: number) {
    let model: any = {
      containerSize: '',
    };
    model.containerSize = containerSize ?? [];
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  @action
  async updateNonMotorizedType(nonMotorizedType: string[], id: number) {
    let model: any = {
      nonMotorizedType: '',
    };
    model.nonMotorizedType = nonMotorizedType ?? [];
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  async updateConcatenatedGoodsType(
    concatenatedGoodsType: string[],
    id: number
  ) {
    let model: any = {
      concatenatedGoodsType: '',
    };
    model.concatenatedGoodsType = concatenatedGoodsType ?? [];
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  @action
  async updateContractCarType(contractCarType: string[], id: number) {
    let model: any = {
      contractCarType: '',
    };
    model.contractCarType = contractCarType ?? [];
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  @action
  async updatePayload(payload: number[], id: number) {
    let model: any = {
      truckPayload: '',
    };
    model.truckPayload = payload ?? [];
    const data = await truckOwnerService.updateAccount(model, id);
    return data;
  }

  @action
  async updateContainerSizeByAdmin(containerSize: string[], id: number) {
    let model: any = {
      containerSize: '',
    };
    model.containerSize = containerSize ?? [];
    const data = await truckOwnerService.updateAccountByAdmin(model, id);
    return data;
  }

  @action
  async updatePayloadByAdmin(payload: number[], id: number) {
    let model: any = {
      truckPayload: '',
    };
    model.truckPayload = payload ?? [];
    const data = await truckOwnerService.updateAccountByAdmin(model, id);
    return data;
  }

  @action
  async uploadCardFront(formData: any, id: number) {
    const data = await truckOwnerService.uploadCardFront(formData, id);
    return data;
  }

  @action
  async uploadCardBack(formData: any, id: number) {
    const data = await truckOwnerService.uploadCardBack(formData, id);
    return data;
  }

  @action
  async deleteAccountFile(id: number, type: number) {
    const data = await truckOwnerService.deleteFiles(id, type);
    return data;
  }

  // ----------------------------
  // Company
  // ----------------------------

  @action
  async getCompany() {
    const data = await truckOwnerService.getCompany();
    this.company = data;
    return data;
  }

  @action
  async createCompany() {
    const data = await truckOwnerService.createCompany(this.companyForm);
    this.company = data;
    return data;
  }

  @action
  async updateCompany() {
    const data = await truckOwnerService.updateCompany(this.companyForm);
    this.company = data;
    return data;
  }

  @action
  async getBankAccount() {
    const data = await truckOwnerService.getBankAccount();
    this.bankAccount = data;
    return data;
  }

  @action
  async getBankAccountByAdmin(truckOwnerId: number) {
    const data = await truckOwnerService.getBankAccountByAdmin(truckOwnerId);
    this.bankAccountAdmin = data;
    return data;
  }

  @action
  async createBankAccount() {
    const data = await truckOwnerService.createBankAccount(
      this.bankAccountForm
    );
    this.bankAccount = data;
    return data;
  }

  @action
  async updateBankAccount() {
    const data = await truckOwnerService.updateBankAccount(
      this.bankAccountForm
    );
    this.bankAccount = data;
    return data;
  }

  @action
  async createBankAccountByAdmin(truckOwnerId: number) {
    const data = await truckOwnerService.createBankAccountByAdmin(
      this.bankAccountAdminForm,
      truckOwnerId
    );
    this.bankAccountAdmin = data;
    return data;
  }

  @action
  async updateBankAccountByAdmin(truckOwnerId: number) {
    const data = await truckOwnerService.updateBankAccountByAdmin(
      this.bankAccountAdminForm,
      truckOwnerId
    );
    this.bankAccountAdmin = data;
    return data;
  }

  @action
  async uploadCompanyIco(formData: any, id: number) {
    const data = await truckOwnerService.uploadCompanyIco(formData, id);
    if (this.company) this.company.companyIconUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async uploadBusinessLicense(formData: any, id: number) {
    const data = await truckOwnerService.uploadBusinessLicense(formData, id);
    if (this.company) this.company.businessLicenseUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async deleteCompanyFile(id: number, type: number) {
    const data = await truckOwnerService.deleteCompanyFile(id, type);
    if (type === REFERENCE_TYPE.COMPANY_ICON) {
      this.company.companyIconUrl = '';
    }
    if (type === REFERENCE_TYPE.BUSINESS_LICENSE) {
      this.company.businessLicenseUrl = '';
    }
    return data;
  }

  // ----------------------------
  // Driver
  // ----------------------------
  @action
  async getDrivers(criteria: FilterDriverDto) {
    const data = await truckOwnerService.getDrivers(criteria);
    this.drivers = data[0];
    this.totalDrivers = data[1];
  }

  @action
  async deleteDriver(id: number) {
    const data = await truckOwnerService.deleteDriver(id);
    return data;
  }

  @action
  async getDriverById(id: number) {
    const result = await truckOwnerService.getDriverById(id);
    if (result) {
      return result.data?.result;
    }
  }

  @action
  async addDriver() {
    const data = await truckOwnerService.addDriver(this.driverForm);
    return data;
  }

  @action
  async uploadDriverLicense(formData: any, id: number) {
    const data = await truckOwnerService.uploadDriverLicense(formData, id);
    return data;
  }

  @action
  async uploadDriverCardFront(formData: any, id: number) {
    const data = await truckOwnerService.uploadDriverCardFront(formData, id);
    return data;
  }

  @action
  async uploadDriverCardBack(formData: any, id: number) {
    const data = await truckOwnerService.uploadDriverCardBack(formData, id);
    return data;
  }

  @action
  async uploadTruckCertificate(formData: any, id: number) {
    const data = await truckOwnerService.uploadTruckCertificate(formData, id);
    return data;
  }

  @action
  async updateDriver(id: number) {
    const data = await truckOwnerService.updateDriver(this.driverForm, id);
    return data;
  }

  @action
  async getMyDrivers() {
    const result = await truckOwnerService.getMyDrivers();
    if (result) {
      this.myDrivers = result[0];
      this.totalDrivers = result[1];
    }
  }

  @action
  async getMyTrucks() {
    const result = await truckOwnerService.getMyTrucks();
    if (result) {
      this.myTrucks = result[0];
      this.totalTrucks = result[1];
    }
  }

  @action
  async deleteDriverFile(id: number, type: number) {
    const data = await truckOwnerService.deleteDriverFile(id, type);
    return data;
  }

  // ----------------------------
  // Truck
  // ----------------------------
  @action
  async getTrucks(criteria: FilterTruckDto) {
    const data = await truckOwnerService.getTrucks(criteria);
    this.myTrucks = data[0];
    this.totalTrucks = data[1];
  }

  @action
  async deleteTruck(id: number) {
    const data = await truckOwnerService.deleteTruck(id);
    return data;
  }

  @action
  async getTruckById(id: number) {
    const result = await truckOwnerService.getTruckById(id);
    if (result) {
      return result.data?.result;
    }
  }

  @action
  async addTruck() {
    const data = await truckOwnerService.addTruck(this.truckForm);
    return data;
  }

  @action
  async uploadCertificate(formData: any, id: number) {
    const data = await truckOwnerService.uploadCertificate(formData, id);
    return data;
  }

  @action
  async updateTruck(id: number) {
    const data = await truckOwnerService.updateTruck(this.truckForm, id);
    return data;
  }

  @action
  async deleteTruckFile(id: number, type: number) {
    const data = await truckOwnerService.deleteTruckFile(id, type);
    return data;
  }

  // ----------------------------
  // My Jobs
  // ----------------------------

  @action
  async resetOrderTrucks() {
    this.orderTrucks = [];
  }

  @action
  async getOrderTrucks(orderId: number) {
    const data = await truckOwnerService.getOrderTrucks(orderId);
    this.orderTrucks = data;
    return data;
  }

  @action
  async assignOrderTrucks(orderId: number, model: number[]) {
    const data = await truckOwnerService.assignOrderTrucks(orderId, model);
    return data;
  }

  @action
  async resetOrderDrivers() {
    this.orderDrivers = [];
  }

  @action
  async getOrderDrivers(orderId: number) {
    const data = await truckOwnerService.getOrderDrivers(orderId);
    this.orderDrivers = data;
    return data;
  }

  @action
  async assignOrderDrivers(orderId: number, model: number[]) {
    const data = await truckOwnerService.assignOrderDrivers(orderId, model);
    return data;
  }

  // ----------------------------
  // Admin - Account
  // ----------------------------

  @action
  async setTruckOwnerUpdateForm(data: any) {
    // this.truckOwnerUpdateForm = data;
    this.truckOwnerUpdateForm.phoneNumber = data.phoneNumber ?? '';
    this.truckOwnerUpdateForm.email = data.email ?? '';
    this.truckOwnerUpdateForm.firstName = data.firstName ?? '';
    this.truckOwnerUpdateForm.lastName = data.lastName ?? '';
    this.truckOwnerUpdateForm.cardNo = data.cardNo ?? '';
    this.truckOwnerUpdateForm.userStatus =
      +data.userStatus ?? USER_STATUS.ACTIVE;
    this.truckOwnerUpdateForm.verifiedStatus =
      +data.verifiedStatus ?? VERIFIED_STATUS.UNVERIFIED;
    this.truckOwnerUpdateForm.password = data.password ?? '';
  }

  @action
  async getTruckOwnerByAdmin(filter: AdminFilterDto) {
    const data = await truckOwnerService.getTruckOwnerByAdmin(filter);
    const [customers, count] = data;
    this.truckowners = customers;
    this.totalTruckOwners = count;
    return data;
  }

  @action
  async getDeletedTruckOwnerByAdmin(filter: AdminFilterDto) {
    const data = await truckOwnerService.getDeletedTruckOwnerByAdmin(filter);
    const [truckOwners, count] = data;
    this.deletedTruckOwners = truckOwners;
    this.totalDeletedTruckOwners = count;
    return data;
  }

  @action
  async restoreTruckOwnerByIdByAdmin(id: number) {
    const data = await truckOwnerService.restoreTruckOwnerByIdByAdmin(id);
    return data;
  }

  @action
  async setAdminTruckOwnerForm(data: any) {
    this.adminTruckOwnerForm.firstName = data.firstName ?? '';
    this.adminTruckOwnerForm.lastName = data.lastName ?? '';
    this.adminTruckOwnerForm.email = data.email ?? '';
    this.adminTruckOwnerForm.phoneNumber = data.phoneNumber;
  }

  @action
  async resetAdminTruckOwnerForm() {
    this.adminTruckOwnerForm = adminTruckOwnerFormInit;
  }

  @action
  async addTruckOwnerByAdmin() {
    const data = await truckOwnerService.addTruckOwnerByAdmin(
      this.adminTruckOwnerForm
    );
    return data;
  }

  @action
  async getTruckOwnerByIdByAdmin(id: number) {
    const data = await truckOwnerService.getTruckOwnerByIdByAdmin(id);
    this.truckOwnerAdmin = null;
    this.truckOwnerAdmin = data;
    return data;
  }

  @action
  async updateTruckOwnerByAdmin(id: number) {
    const data = await truckOwnerService.updateTruckOwnerByAdmin(
      this.truckOwnerUpdateForm,
      id
    );
    return data;
  }

  @action
  async updateServiceTypeByAdmin(serviceType: any, id: number) {
    let model: any = {
      serviceType: '',
    };
    model.serviceType = serviceType;

    const data = await truckOwnerService.updateTruckOwnerByAdmin(model, id);
    return data;
  }

  @action
  async updatePickupZoneByAdmin(pickupZone: number[], id: number) {
    let model: any = {
      pickupZone: '',
    };
    model.pickupZone = pickupZone ?? [];

    const data = await truckOwnerService.updateTruckOwnerByAdmin(model, id);
    return data;
  }

  @action
  async deleteTruckOwnerByIdByAdmin(id: number) {
    const data = await truckOwnerService.deleteTruckOwnerByAdmin(id);
    return data;
  }

  @action
  async verifyTruckOwnerByAdmin(id: number) {
    const data = await truckOwnerService.verifyTruckOwnerByAdmin(id);
    return data;
  }

  // Account Files
  @action
  async uploadTruckOwnerCardFrontByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadTruckOwnerCardFrontByAdmin(
      formData,
      id
    );
    return data;
  }

  @action
  async uploadTruckOwnerCardBackByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadTruckOwnerCardBackByAdmin(
      formData,
      id
    );
    return data;
  }

  @action
  async deleteTruckOwnerFilesByAdmin(id: number, type: number) {
    const data = await truckOwnerService.deleteTruckOwnerFilesByAdmin(id, type);
    return data;
  }

  // Company
  @action
  async setCompanyAdminForm(data: any) {
    this.companyAdminForm.name = data.name;
    this.companyAdminForm.phone = data.phone;
    this.companyAdminForm.address = data.address;
    this.companyAdminForm.licenseNo = data.licenseNo;
  }

  @action
  async resetCompanyAdminForm() {
    this.companyAdminForm = newCompanyInit;
  }

  @action
  async getCompanyByAdmin(id: number) {
    const data = await truckOwnerService.getCompanyByAdmin(id);
    this.companyAdmin = data;
    return data;
  }

  @action
  async updateCompanyByAdmin(id: number) {
    const data = await truckOwnerService.updateCompanyByAdmin(
      id,
      this.companyAdminForm
    );
    this.companyAdmin = data;
    return data;
  }

  @action
  async uploadCompanyIcoByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadCompanyIcoByAdmin(formData, id);
    if (this.companyAdmin)
      this.companyAdmin.companyIconUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async uploadBusinessLicenseByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadBusinessLicenseByAdmin(
      formData,
      id
    );
    if (this.companyAdmin)
      this.companyAdmin.businessLicenseUrl = data?.imgURL ?? '';
    return data;
  }

  @action
  async deleteCompanyFileByAdmin(id: number, type: number) {
    const data = await truckOwnerService.deleteCompanyFileByAdmin(id, type);
    if (type === REFERENCE_TYPE.COMPANY_ICON) {
      this.companyAdmin.companyIconUrl = '';
    }
    if (type === REFERENCE_TYPE.BUSINESS_LICENSE) {
      this.companyAdmin.businessLicenseUrl = '';
    }
    return data;
  }

  // Trucks
  @action
  async getTrucksByAdmin(id: number, criteria: FilterTruckDto) {
    const data = await truckOwnerService.getTrucksByAdmin(id, criteria);
    this.myAdminTrucks = data[0];
    this.totalAdminTrucks = data[1];
  }

  @action
  async deleteTruckByAdmin(id: number) {
    const data = await truckOwnerService.deleteTruckByAdmin(id);
    return data;
  }

  @action
  async getTruckByIdByAdmin(id: number) {
    const result = await truckOwnerService.getTruckByIdByAdmin(id);
    if (result) {
      return result.data?.result;
    }
  }

  @action
  async addTruckByAdmin(id: number) {
    const data = await truckOwnerService.addTruckByAdmin(this.truckForm, id);
    return data;
  }

  @action
  async uploadCertificateByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadCertificateByAdmin(formData, id);
    return data;
  }

  @action
  async updateTruckByAdmin(id: number) {
    const data = await truckOwnerService.updateTruckByAdmin(this.truckForm, id);
    return data;
  }

  @action
  async deleteTruckFileByAdmin(id: number, type: number) {
    const data = await truckOwnerService.deleteTruckFileByAdmin(id, type);
    return data;
  }

  // Drivers
  @action
  async getDriversByAdmin(id: number, criteria: FilterDriverDto) {
    const data = await truckOwnerService.getDriversByAdmin(id, criteria);
    this.adminDrivers = data[0];
    this.totalAdminDrivers = data[1];
  }

  @action
  async deleteDriverByAdmin(id: number) {
    const data = await truckOwnerService.deleteDriverByAdmin(id);
    return data;
  }

  @action
  async getDriverByIdByAdmin(id: number) {
    const result = await truckOwnerService.getDriverByIdByAdmin(id);
    if (result) {
      return result.data?.result;
    }
  }

  @action
  async addDriverByAdmin(id: number) {
    const data = await truckOwnerService.addDriverByAdmin(this.driverForm, id);
    return data;
  }

  @action
  async uploadDriverLicenseByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadDriverLicenseByAdmin(
      formData,
      id
    );
    return data;
  }

  @action
  async uploadDriverCardFrontByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadDriverCardFrontByAdmin(
      formData,
      id
    );
    return data;
  }

  @action
  async uploadDriverCardBackByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadDriverCardBackByAdmin(
      formData,
      id
    );
    return data;
  }

  @action
  async uploadTruckCertificateByAdmin(formData: any, id: number) {
    const data = await truckOwnerService.uploadTruckCertificateByAdmin(
      formData,
      id
    );
    return data;
  }

  @action
  async updateDriverByAdmin(id: number) {
    const data = await truckOwnerService.updateDriverByAdmin(
      this.driverForm,
      id
    );
    return data;
  }

  @action
  async editPaymentDone(isDone: boolean, orderId: number) {
    const data = await truckOwnerService.editPaymentDone(isDone, orderId);
    return data;
  }
  async uploadTruckOtherDoc(files: File[], id: number) {
    const data = await truckOwnerService.uploadTruckOtherDoc(files, id);
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
      customerResult,
      revenue,
    ] = await truckOwnerService.getDataReport(month, year);

    this.allOrdersInMonth = allOrdersInMonthResult
      ? allOrdersInMonthResult[1]
      : [];
    this.completedOrders = completedOrders ?? [];
    this.pendingOrders = pendingOrders ?? [];
    this.cancelledOrders = cancelledOrder ?? [];
    this.beginYear = (yearResult && yearResult[0]) ?? 2021;
    this.endYear = (yearResult && yearResult[1]) ?? 2021;
    this.customerResult = customerResult ?? [];
    this.customerRevenue = revenue ?? [];

    const series: any = [];
    const customerInfo: any = customerResult ? Object.keys(customerResult) : [];
    this.customerInfo = customerInfo;
    const labels = [];
    for (let i = 0; i < customerInfo.length; i++) {
      const eachInfo = customerInfo[i].split(',');

      labels.push(eachInfo[0]);
    }

    if (customerResult) {
      Object.keys(customerResult).forEach(function (key) {
        let value = customerResult[key];
        series.push(value);
      });
    }

    this.customerLabels = labels;
    this.customerSeries = series;
  }
  async uploadDriverOtherDoc(files: File[], id: number) {
    const data = await truckOwnerService.uploadDriverOtherDoc(files, id);
    return data;
  }

  @action
  async deleteTruckFileByFileId(id: number, fileId: string, type: number) {
    const data = await truckOwnerService.deleteTruckFileByFileId(
      id,
      fileId,
      type
    );
    return data;
  }

  @action
  async deleteDriverFileByFileId(id: number, fileId: string, type: number) {
    const data = await truckOwnerService.deleteDriverFileByFileId(
      id,
      fileId,
      type
    );
    return data;
  }

  @action
  async getDriversEarning(criteria: GetDriversEarningDto) {
    const data = await truckownerService.getDeriversEarning(criteria);
    return data;
  }

  @action
  async payDriverEarning(id: number, model: any) {
    const data = await truckOwnerService.payDriverEarning(id, model);
    return data;
  }

  @action
  async sendOTP(phone: string) {
    const data = await truckOwnerService.sendOTP(phone);
    if (data) this.isSendOTPSuccess = true;
    else this.isSendOTPSuccess = false;
    return data;
  }

  @action
  async verifyOtp(phoneNumber: string, otpCode: number) {
    const data = await truckOwnerService.verifyOtp({ phoneNumber, otpCode });
    return data;
  }

  @action async sendMailVerification(phoneNumber: string) {
    const data = await truckOwnerService.sendMailVerification(phoneNumber);
    return data;
  }
}

export default new TruckOwnerStore();

export const TruckOwnerStoreContext = React.createContext(
  new TruckOwnerStore()
);
