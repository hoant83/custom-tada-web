import React from 'react';
import { observable, action } from 'mobx';
import companyService from '@/modules/company/company.service';
// import { removeFromStorage, saveToStorage } from '@/libs/utils/storage.util';
import { CompanyDto, CompanyFilterDto } from '@/modules/company/company.dto';
import { CustomerDto, CustomerListDto } from '@/modules/customer/customer.dto';

export default class CompanyStore {
  @observable createCompanyData: CompanyDto = {
    name: '',
    phone: '',
    address: '',
    licenseNo: '',
  };
  @observable updateCompanyData: any = null;
  @observable currentCompany: any = null;
  @observable totalCount: number = 0;
  @observable employees: any[] = [];
  @observable addEmployeeData: CustomerDto = {
    firstName: '',
    email: '',
    phoneNumber: '',
    cardNo: '',
    accountRole: '',
  };

  @action
  public async setCreateCompany(model: CompanyDto) {
    this.createCompanyData = model;
  }

  @action
  public async resetCreateCompanyData() {
    this.createCompanyData = {
      name: '',
      phone: '',
      address: '',
      licenseNo: '',
    };
  }

  @action
  public async setUpdateCompany(model: CompanyDto) {
    this.updateCompanyData = model;
  }

  @action
  public async getCompany(criteria: CompanyFilterDto) {
    const data = await companyService.getCompany();
    this.currentCompany = data;
    const updateData: CompanyDto = {
      name: this.currentCompany.name,
      phone: this.currentCompany.phone,
      address: this.currentCompany.address,
      licenseNo: this.currentCompany.licenseNo,
      businessLicenseUrl: this.currentCompany.businessLicenseUrl,
      companyIconUrl: this.currentCompany.companyIconUrl,
    };
    this.updateCompanyData = updateData;
  }

  @action
  public async createCompany(model: CompanyDto) {
    this.createCompanyData = model;
    const data = await companyService.createCompany(this.createCompanyData);
    this.resetCreateCompanyData();
    this.currentCompany = data;
    return data;
  }

  @action
  public async updateCompany(model: CompanyDto) {
    this.updateCompanyData = model;
    const data = await companyService.updateCompany(this.updateCompanyData);
    this.currentCompany = data;
    return data;
  }

  @action
  async getEmployees(criteria: CustomerListDto) {
    const result = await companyService.getEmployees(criteria);
    if (result) {
      this.employees = result[0];
      this.totalCount = result[1];
    }
  }

  @action
  async addEmployee(model: CustomerDto) {
    const result = await companyService.addEmployee(model);
    return result;
  }

  @action
  async deleteEmployee(employeeId: number) {
    const result = await companyService.deleteEmployee(employeeId);
    return result;
  }
}

export const CompanyStoreContext = React.createContext(new CompanyStore());
