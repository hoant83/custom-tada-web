import http from '@/libs/services';
import { removeConfirmationFields } from '@/libs/utils/apis.util';
import { CreateUserDto, ResetPasswordDto } from '@/modules/account/account.dto';
import {
  FilterDriverDto,
  FilterTruckDto,
  FilterOrderDto,
  NewDriverRequestDto,
  UpdateTruckOwnerRequestDto,
  AdminFilterDto,
  TruckOwnerRequestDto,
  TruckOwnerUpdateFormDto,
  NewCompanyRequestDto,
  NewTruckDto,
  AdminTruckOwnerRequestDto,
  NewBankAccountRequestDto,
} from '@/modules/truckowner/truckowner.dto';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import { TRUCKOWNER_API } from '@/modules/truckowner/router.enum';
import { GetDriversEarningDto } from '../admin-user/admin.dto';

class TruckownerService {
  prefix: string = TRUCKOWNER_API.PREFIX;
  adminPrefix: string = TRUCKOWNER_API.ADMIN_PREFIX;
  adminTruckOwnerPrefix: string = TRUCKOWNER_API.ADMIN_TRUCKOWNER_PREFIX;
  provincePrefix: string = TRUCKOWNER_API.PROVINCE_PREFIX;

  public async changeUserPassword(id: number, model: any) {
    const result = await http.post(
      `${this.prefix}/:id/change-user-password`,
      model
    );
    return result;
  }

  public async forgotPassword(email: string, lang: string) {
    const result = await http.get(
      `${this.prefix}/forgot-password/${lang}?email=${email}`
    );
    return result.data.result;
  }

  public async resetPassword(model: ResetPasswordDto) {
    // const result = await http.get(
    //   `${this.prefix}/forgot-password?email=${email}`
    // );
    // return result.data.result;
  }

  public async register(model: CreateUserDto) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.post(`${this.prefix}`, excludedModel);
    return result.data?.result;
  }

  // TODO: sort order all functions of this file
  // ----------------------------
  // Account
  // ----------------------------

  public async getProvince() {
    const result = await http.get(`${this.provincePrefix}`);
    return result.data?.result;
  }

  public async getAccountInfo() {
    const result = await http.get(`${this.prefix}/info`);
    return result.data?.result;
  }

  public async updateAccount(model: UpdateTruckOwnerRequestDto, id: number) {
    const result = await http.put(`${this.prefix}/${id}`, model);
    return result.data?.result;
  }

  public async updateAccountByAdmin(
    model: UpdateTruckOwnerRequestDto,
    id: number
  ) {
    const result = await http.put(`${this.adminTruckOwnerPrefix}/${id}`, model);
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

  public async getBankAccount() {
    const result = await http.get(`${this.prefix}/bank-account`);
    return result.data?.result;
  }

  public async getBankAccountByAdmin(truckOwnerId: number) {
    const result = await http.get(
      `${this.adminTruckOwnerPrefix}/${truckOwnerId}/bank-account`
    );
    return result.data?.result;
  }

  public async createBankAccount(model: NewBankAccountRequestDto) {
    const result = await http.post(`${this.prefix}/bank-account`, model);
    return result.data?.result;
  }

  public async updateBankAccount(model: NewBankAccountRequestDto) {
    const result = await http.put(`${this.prefix}/bank-account`, model);
    return result.data?.result;
  }

  public async createBankAccountByAdmin(
    model: NewBankAccountRequestDto,
    truckOwnerId: number
  ) {
    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${truckOwnerId}/bank-account`,
      model
    );
    return result.data?.result;
  }

  public async updateBankAccountByAdmin(
    model: NewBankAccountRequestDto,
    truckOwnerId: number
  ) {
    const result = await http.put(
      `${this.adminTruckOwnerPrefix}/${truckOwnerId}/bank-account`,
      model
    );
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
  // Truck
  // ----------------------------
  public async getTrucks(criteria: FilterTruckDto) {
    const result = await http.get(
      `${this.prefix}/trucks${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async getTruckById(id: number) {
    const result = await http.get(`${this.prefix}/trucks/${id}`);
    return result;
  }

  public async addTruck(model: NewTruckDto) {
    const result = await http.post(`${this.prefix}/trucks`, model);
    return result.data?.result;
  }

  public async updateTruck(model: NewTruckDto, id: number) {
    const result = await http.put(`${this.prefix}/trucks/${id}`, model);
    return result.data?.result;
  }

  public async deleteTruck(id: number) {
    const result = await http.delete(`${this.prefix}/truck/${id}`);
    return result.data?.result;
  }

  public async deleteTruckFile(id: number, type: number) {
    const result = await http.delete(
      `${this.prefix}/truck-files/${id}/${type}`
    );
    return result.data?.result;
  }

  public async uploadCertificate(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-truck-certificate`,
      form,
      config
    );
    return result.data?.result;
  }

  // ----------------------------
  // Driver
  // ----------------------------
  public async getDrivers(criteria: FilterDriverDto) {
    const result = await http.get(
      `${this.prefix}/drivers${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async getDriverById(id: number) {
    const result = await http.get(`${this.prefix}/driver/${id}`);
    return result;
  }

  public async deleteDriver(id: number) {
    const result = await http.delete(`${this.prefix}/driver/${id}`);
    return result.data?.result;
  }

  public async addDriver(model: NewDriverRequestDto) {
    const result = await http.post(`${this.prefix}/add-driver`, model);
    return result.data?.result;
  }

  public async updateDriver(model: NewDriverRequestDto, id: number) {
    const result = await http.put(`${this.prefix}/driver/${id}`, model);
    return result.data?.result;
  }

  public async deleteDriverFile(id: number, type: number) {
    const result = await http.delete(
      `${this.prefix}/driver-files/${id}/${type}`
    );
    return result.data?.result;
  }

  public async uploadDriverLicense(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-driver-license`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadDriverCardFront(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-driver-card-front`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadDriverCardBack(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-driver-card-back`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadTruckCertificate(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-truck-certificate`,
      form,
      config
    );
    return result.data?.result;
  }

  // ----------------------------
  // Orders
  // ----------------------------
  public async getNewOrders(id: number) {
    const result = await http.get(`${this.prefix}/${id}/new-orders`);
    return result.data?.result;
  }

  public async getOrders(criteria: FilterOrderDto) {
    const result = await http.get(
      `${this.prefix}/orders${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  // ----------------------------
  // My Jobs
  // ----------------------------
  public async getOrderTrucks(orderId: number) {
    const result = await http.get(`${this.prefix}/order/${orderId}/trucks`);
    return result.data?.result;
  }

  public async assignOrderTrucks(orderId: number, model: number[]) {
    const result = await http.post(
      `${this.prefix}/order/${orderId}/trucks`,
      model
    );
    return result.data?.result;
  }

  public async getOrderDrivers(orderId: number) {
    const result = await http.get(`${this.prefix}/order/${orderId}/drivers`);
    return result.data?.result;
  }

  public async assignOrderDrivers(orderId: number, model: number[]) {
    const result = await http.post(
      `${this.prefix}/order/${orderId}/drivers`,
      model
    );
    return result.data?.result;
  }

  // ----------------------------
  // Admin
  // ----------------------------

  //
  // Truckowner
  //

  public async getTruckOwnerByAdmin(criteria: AdminFilterDto) {
    const result = await http.get(
      `${this.adminPrefix}${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async addTruckOwnerByAdmin(model: AdminTruckOwnerRequestDto) {
    const result = await http.post(`${this.adminTruckOwnerPrefix}`, model);
    return result.data?.result;
  }

  public async getDeletedTruckOwnerByAdmin(criteria: AdminFilterDto) {
    const result = await http.get(
      `${this.adminPrefix}/deleted${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async restoreTruckOwnerByIdByAdmin(id: number) {
    const result = await http.post(`${this.adminPrefix}/${id}/restore`);
    return result.data?.result;
  }

  public async getTruckOwnerByIdByAdmin(id: number) {
    const result = await http.get(`${this.adminPrefix}/${id}`);
    return result.data?.result;
  }

  public async createTruckOwnerByAdmin(model: TruckOwnerRequestDto) {
    const result = await http.post(`${this.adminPrefix}`, model);
    return result.data?.result;
  }

  public async updateTruckOwnerByAdmin(
    model: TruckOwnerUpdateFormDto,
    id: number
  ) {
    const result = await http.put(`${this.adminPrefix}/${id}`, model);
    return result.data?.result;
  }

  public async deleteTruckOwnerByAdmin(id: number) {
    const result = await http.delete(`${this.adminPrefix}/${id}`);
    return result.data?.result;
  }

  public async verifyTruckOwnerByAdmin(id: number) {
    const result = await http.put(
      `${this.adminPrefix}/${id}/email-verification`
    );
    return result.data?.result;
  }

  // Account Files

  public async uploadTruckOwnerCardFrontByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-card-front`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadTruckOwnerCardBackByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-card-back`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteTruckOwnerFilesByAdmin(id: number, type: number) {
    const result = await http.delete(
      `${this.adminTruckOwnerPrefix}/files/${id}/${type}`
    );
    return result.data?.result;
  }

  // Company
  public async getCompanyByAdmin(id: number) {
    const result = await http.get(
      `${this.adminTruckOwnerPrefix}/${id}/company`
    );
    return result.data?.result;
  }

  public async updateCompanyByAdmin(id: number, model: NewCompanyRequestDto) {
    const result = await http.put(
      `${this.adminTruckOwnerPrefix}/${id}/company`,
      model
    );
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
      `${this.adminTruckOwnerPrefix}/${id}/upload-company-icon`,
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
      `${this.adminTruckOwnerPrefix}/${id}/upload-business-license`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteCompanyFileByAdmin(id: number, type: number) {
    const result = await http.delete(
      `${this.adminTruckOwnerPrefix}/company-files/${id}/${type}`
    );
    return result.data?.result;
  }

  // Trucks
  public async getTrucksByAdmin(id: number, criteria: FilterTruckDto) {
    const result = await http.get(
      `${this.adminTruckOwnerPrefix}/${id}/trucks${prepareGetQuery({
        ...criteria,
      })}`
    );
    return result.data?.result;
  }

  public async getTruckByIdByAdmin(id: number) {
    const result = await http.get(`${this.adminTruckOwnerPrefix}/truck/${id}`);
    return result;
  }

  public async addTruckByAdmin(model: NewTruckDto, id: number) {
    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/truck`,
      model
    );
    return result.data?.result;
  }

  public async updateTruckByAdmin(model: NewTruckDto, id: number) {
    const result = await http.put(
      `${this.adminTruckOwnerPrefix}/truck/${id}`,
      model
    );
    return result.data?.result;
  }

  public async deleteTruckByAdmin(id: number) {
    const result = await http.delete(
      `${this.adminTruckOwnerPrefix}/truck/${id}`
    );
    return result.data?.result;
  }

  public async deleteTruckFileByAdmin(id: number, type: number) {
    const result = await http.delete(
      `${this.adminTruckOwnerPrefix}/truck-files/${id}/${type}`
    );
    return result.data?.result;
  }

  public async uploadCertificateByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-truck-certificate`,
      form,
      config
    );
    return result.data?.result;
  }

  // Drivers
  public async getDriversByAdmin(id: number, criteria: FilterDriverDto) {
    const result = await http.get(
      `${this.adminTruckOwnerPrefix}/${id}/drivers${prepareGetQuery({
        ...criteria,
      })}`
    );
    return result.data?.result;
  }

  public async getDriverByIdByAdmin(id: number) {
    const result = await http.get(`${this.adminTruckOwnerPrefix}/driver/${id}`);
    return result;
  }

  public async deleteDriverByAdmin(id: number) {
    const result = await http.delete(
      `${this.adminTruckOwnerPrefix}/driver/${id}`
    );
    return result.data?.result;
  }

  public async addDriverByAdmin(model: NewDriverRequestDto, id: number) {
    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/driver`,
      model
    );
    return result.data?.result;
  }

  public async updateDriverByAdmin(model: NewDriverRequestDto, id: number) {
    const result = await http.put(
      `${this.adminTruckOwnerPrefix}/driver/${id}`,
      model
    );
    return result.data?.result;
  }

  public async deleteDriverFileByAdmin(id: number, type: number) {
    const result = await http.delete(
      `${this.adminTruckOwnerPrefix}/driver-files/${id}/${type}`
    );
    return result.data?.result;
  }

  public async uploadDriverLicenseByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-driver-license`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadDriverCardFrontByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-driver-card-front`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadDriverCardBackByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-driver-card-back`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadTruckCertificateByAdmin(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.adminTruckOwnerPrefix}/${id}/upload-truck-certificate`,
      form,
      config
    );
    return result.data?.result;
  }

  // ...
  public async getMyDrivers() {
    const result = await http.get(`${this.prefix}/drivers`);
    return result.data?.result;
  }

  public async getMyTrucks() {
    const result = await http.get(`${this.prefix}/trucks`);
    return result.data?.result;
  }

  public async editPaymentDone(isDone: boolean, orderId: number) {
    const result = await http.put(`${this.prefix}/payment-done/${orderId}`, {
      isDone,
    });
    return result.data?.result;
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

  public async uploadDriverOtherDoc(files: File[], id: number) {
    const form = new FormData();
    files.forEach((file) => {
      form.append('images[]', file);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-driver-doc`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadTruckOtherDoc(files: File[], id: number) {
    const form = new FormData();
    files.forEach((file) => {
      form.append('images[]', file);
    });

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-truck-doc`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteTruckFileByFileId(
    id: number,
    fileId: string,
    type: number
  ) {
    const result = await http.delete(
      `${this.prefix}/truck-files/other-doc/${id}/${fileId}/${type}`
    );
    return result.data?.result;
  }

  public async deleteDriverFileByFileId(
    id: number,
    fileId: string,
    type: number
  ) {
    const result = await http.delete(
      `${this.prefix}/driver-files/other-doc/${id}/${fileId}/${type}`
    );
    return result.data?.result;
  }

  public async getDefaultCommission() {
    const result = await http.get(`${this.prefix}/default-commission`);
    return result.data?.result;
  }

  public async getDeriversEarning(model: GetDriversEarningDto) {
    const result = await http.get(
      `${this.prefix}/drivers-earning${prepareGetQuery({ ...model })}`
    );
    return result.data?.result;
  }

  public async payDriverEarning(id: number, model: any) {
    return await http.post(`${this.prefix}/driver/${id}/payment`, model);
  }

  public async sendOTP(phone: string) {
    const result = await http.get(`${this.prefix}/send-otp?phone=${phone}`);
    return result.data?.result;
  }

  public async verifyOtp(model: any) {
    const result = await http.post(`${this.prefix}/otp-verification`, model);
    return result.data?.result;
  }

  public async sendMailVerification(phoneNumber: string) {
    const result = await http.post(
      `${this.prefix}/send-mail-verification/${phoneNumber}`
    );
    return result.data?.result;
  }
}

export default new TruckownerService();
