import http from '@/libs/services';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import {
  AdminCustomerRequestDto,
  CustomerListDto,
  CustomerRequestDto,
  CustomerUpdateFormDto,
  DefaultPayment,
  DefaultReference,
  FilterEmployeeDto,
  FilterFavoriteTruckOwnerDto,
  NewCompanyRequestDto,
  NewEmployeeDto,
  UpdateCustomerRequestDto,
} from '@/modules/customer/customer.dto';
import { CUSTOMER_API } from '@/modules/customer/router.enum';
import { PriceQuotationListDto } from './customer.dto';

class CustomerService {
  prefix: string = CUSTOMER_API.PREFIX;
  adminPrefix: string = CUSTOMER_API.ADMIN_PREFIX;
  quotationPrefix: string = 'api/price-quotations';

  // TODO: sort order all functions of this file
  // ----------------------------
  // Account
  // ----------------------------

  public async changeUserPassword(id: number, model: any) {
    const result = await http.post(
      `${this.prefix}/:id/change-user-password`,
      model
    );
    return result;
  }

  public async getAccountInfo() {
    const result = await http.get(`${this.prefix}/info`);
    return result.data?.result;
  }

  public async updateAccount(model: UpdateCustomerRequestDto, id: number) {
    const result = await http.put(`${this.prefix}/${id}`, model);
    return result.data?.result;
  }

  public async uploadCardFront(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-card-front`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadCardBack(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-card-back`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadAvatar(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-profile-img`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteFiles(id: number, type: number) {
    const result = await http.delete(`${this.prefix}/files/${id}/${type}`);
    return result.data?.result;
  }

  // ----------------------------
  // Company
  // ----------------------------

  public async getCompany() {
    const result = await http.get(`${this.prefix}/company`);
    return result.data?.result;
  }

  public async createCompany(model: NewCompanyRequestDto) {
    const result = await http.post(`${this.prefix}/company`, model);
    return result.data?.result;
  }

  public async updateCompany(model: NewCompanyRequestDto) {
    const result = await http.put(`${this.prefix}/company`, model);
    return result.data?.result;
  }

  public async uploadCompanyIco(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await http.post(
      `${this.prefix}/${id}/upload-company-icon`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadBusinessLicense(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-business-license`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteCompanyFile(id: number, type: number) {
    const result = await http.delete(
      `${this.prefix}/company-files/${id}/${type}`
    );
    return result.data?.result;
  }

  // ----------------------------
  // Employee
  // ----------------------------

  public async getEmployees(criteria: FilterEmployeeDto) {
    const result = await http.get(
      `${this.prefix}/employees/${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async getEmployeeById(id: number) {
    const result = await http.get(`${this.prefix}/employee/${id}`);
    return result;
  }

  public async addEmployee(model: NewEmployeeDto) {
    const result = await http.post(`${this.prefix}/add-employee`, model);
    return result.data?.result;
  }

  public async updateEmployee(model: NewEmployeeDto, id: number) {
    const result = await http.put(`${this.prefix}/${id}`, model);
    return result.data?.result;
  }

  public async deleteEmployee(id: number) {
    const result = await http.delete(`${this.prefix}/employee/${id}`);
    return result.data?.result;
  }

  // ----------------------------
  // Favorite Truckowner
  // ----------------------------

  public async getFavoriteTruckOwner(criteria: FilterFavoriteTruckOwnerDto) {
    const result = await http.get(
      `${this.prefix}/list-favorite-truck-owner/${prepareGetQuery({
        ...criteria,
      })}`
    );
    return result.data?.result;
  }

  public async getAllFavoriteTruckOwner() {
    const result = await http.get(`${this.prefix}/list-favorite-truck-owner/`);
    return result.data?.result;
  }

  public async addFavoriteTruckOwner(publicId: string): Promise<boolean> {
    return await http.post(
      `${this.prefix}/add-favorite-truck-owner/${publicId}`
    );
  }

  public async deleteFavoriteTruckOwner(id: number): Promise<boolean> {
    return await http.put(`${this.prefix}/remove-favorite-truck-owner/${id}`);
  }

  public async resetFavoriteTruckOwner(): Promise<boolean> {
    return await http.put(`${this.prefix}/reset-favorite-truck-owner`);
  }

  // ----------------------------
  // Admin
  // ----------------------------

  //
  // Customer
  //
  public async addCustomerByAdmin(model: AdminCustomerRequestDto) {
    const result = await http.post(`${this.adminPrefix}`, model);
    return result.data?.result;
  }

  public async deleteCustomerByAdmin(id: number) {
    const result = await http.delete(`${this.adminPrefix}/${id}`);
    return result.data?.result;
  }

  public async verifyCustomerByAdmin(id: number) {
    const result = await http.put(
      `${this.adminPrefix}/${id}/email-verification`
    );
    return result.data?.result;
  }

  public async getCustomerByAdmin(criteria: CustomerListDto) {
    const result = await http.get(
      `${this.adminPrefix}${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async getDeletedCustomerByAdmin(criteria: CustomerListDto) {
    const result = await http.get(
      `${this.adminPrefix}/deleted${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async createCustomerByAdmin(model: CustomerRequestDto) {
    const result = await http.post(`${this.adminPrefix}`, model);
    return result.data?.result;
  }

  public async getCustomerByIdByAdmin(id: number) {
    const result = await http.get(`${this.adminPrefix}/${id}`);
    return result.data?.result;
  }

  public async updateCustomerByAdmin(model: CustomerUpdateFormDto, id: number) {
    const result = await http.put(`${this.adminPrefix}/${id}`, model);
    return result.data?.result;
  }

  public async restoreCustomerByIdByAdmin(id: number) {
    const result = await http.post(`${this.adminPrefix}/${id}/restore`);
    return result.data?.result;
  }

  // Employee
  public async getEmployeeByid(id: number) {
    const result = await http.get(`${this.prefix}/employee/${id}`);
    return result.data?.result;
  }

  public async deleteFile(referenceId: number, referenceType: number) {
    return await http.delete(
      `${this.prefix}/files/${referenceId}/${referenceType}`
    );
  }

  public async getCompanyByAdmin(id: number) {
    const result = await http.get(`${this.adminPrefix}/company/${id}`);
    return result.data?.result;
  }

  public async createCompanyByAdmin(model: NewCompanyRequestDto, id: number) {
    const result = await http.post(`${this.adminPrefix}/company`, {
      model,
      id,
    });
    return result.data?.result;
  }

  public async updateCompanyByAdmin(model: NewCompanyRequestDto, id: number) {
    const result = await http.put(`${this.adminPrefix}/company`, {
      model,
      id,
    });
    return result.data?.result;
  }

  public async uploadCardFrontByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminPrefix}/${id}/upload-card-front`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadCardBackByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminPrefix}/${id}/upload-card-back`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadAvatarByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminPrefix}/${id}/upload-profile-img`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteFilesByAdmin(id: number, type: number) {
    const result = await http.delete(`${this.adminPrefix}/files/${id}/${type}`);
    return result.data?.result;
  }

  public async uploadCompanyIcoByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await http.post(
      `${this.adminPrefix}/${id}/upload-company-icon`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadBusinessLicenseByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminPrefix}/${id}/upload-business-license`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteCompanyFileByAdmin(id: number, type: number) {
    const result = await http.delete(
      `${this.adminPrefix}/company-files/${id}/${type}`
    );
    return result.data?.result;
  }

  public async getEmployeesByAdmin(
    criteria: FilterEmployeeDto,
    customerId: number
  ) {
    const result = await http.get(
      `${this.adminPrefix}/employees${prepareGetQuery({
        ...criteria,
        customerId,
      })}`
    );
    return result.data?.result;
  }

  public async getEmployeeByIdByAdmin(id: number, customerId: number) {
    const result = await http.get(
      `${this.adminPrefix}/employee/${id}${prepareGetQuery({
        customerId,
      })}`
    );
    return result;
  }

  public async addEmployeeByAdmin(model: NewEmployeeDto, customerId: number) {
    const result = await http.post(`${this.adminPrefix}/add-employee`, {
      model,
      customerId,
    });
    return result.data?.result;
  }

  public async updateEmployeeByAdmin(model: NewEmployeeDto, id: number) {
    const result = await http.put(`${this.adminPrefix}/employee/${id}`, model);
    return result.data?.result;
  }

  public async deleteEmployeeByAdmin(id: number, customerId: number) {
    const result = await http.delete(
      `${this.adminPrefix}/${customerId}/employee/${id}`
    );
    return result.data?.result;
  }

  public async getFavoriteTruckOwnerByAdmin(
    criteria: FilterFavoriteTruckOwnerDto,
    customerId: number
  ) {
    const result = await http.get(
      `${this.adminPrefix}/list-favorite-truck-owner/${prepareGetQuery({
        ...criteria,
        customerId,
      })}`
    );
    return result.data?.result;
  }

  public async getAllFavoriteTruckOwnerByAdmin(orderId: number) {
    const result = await http.get(
      `${this.adminPrefix}/all-list-favorite-truck-owner/${prepareGetQuery({
        orderId,
      })}`
    );
    return result.data?.result;
  }
  //
  public async getFavoriteTruckOwnerByPublicId(publicId: any) {
    return await http.get(`/api/customer/get-favorite-truck-owner/${publicId}`);
  }

  public async addFavoriteTruckOwnerByAdmin(
    publicId: string,
    customerId: number
  ): Promise<boolean> {
    return await http.post(
      `${this.adminPrefix}/add-favorite-truck-owner/${publicId}`,
      { customerId }
    );
  }

  public async deleteFavoriteTruckOwnerByAdmin(
    id: number,
    customerId: number
  ): Promise<boolean> {
    return await http.put(
      `${this.adminPrefix}/remove-favorite-truck-owner/${id}`,
      { customerId }
    );
  }

  public async resetFavoriteTruckOwnerByAdmin(
    customerId: number
  ): Promise<boolean> {
    return await http.put(`${this.adminPrefix}/reset-favorite-truck-owner`, {
      customerId,
    });
  }

  public async cancelOrderByCustomer(id: number) {
    const result = await http.put(`${this.prefix}/orders/${id}/cancel-order`);
    return result;
  }

  public async getDataReport(month: number, year: number) {
    const result = await http.get(
      `${this.prefix}/orders/report/${prepareGetQuery({
        month,
        year,
      })}`
    );
    return result.data?.result;
  }

  public async getDefaultReference() {
    const result = await http.get(`${this.prefix}/default-reference`);
    return result.data?.result;
  }

  public async updateDefaultReference(model: DefaultReference) {
    const result = await http.put(`${this.prefix}/default-reference`, model);
    return result.data?.result;
  }

  public async getDefaultPayment() {
    const result = await http.get(`${this.prefix}/default-payment`);
    return result.data?.result;
  }

  public async updateDefaultPayment(model: DefaultPayment) {
    const result = await http.put(`${this.prefix}/default-payment`, model);
    return result.data?.result;
  }

  public async editPaymentDone(isDone: boolean, orderId: number) {
    const result = await http.put(`${this.prefix}/payment-done/${orderId}`, {
      isDone,
    });
    return result.data?.result;
  }

  public async getPriceQuotations(
    customerId: number,
    criteria: PriceQuotationListDto
  ) {
    return await http.get(
      `${this.quotationPrefix}/customer/${customerId}${prepareGetQuery({
        ...criteria,
      })}`
    );
  }
}

export default new CustomerService();
