import http from '@/libs/services';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import { CustomerListDto } from '@/modules/customer/customer.dto';
import {
  DriverRequestDto,
  NewDriverRequestDto,
} from '@/modules/truckowner/truckowner.dto';
import { DriverListDto } from '@/modules/driver/driver.dto';
import {
  AdminListDto,
  NewAdminDto,
  PriceQuotationListDto,
  PriceQuotationDto,
  LicenseMail,
  GetDriversEarningDto,
} from '@/modules/admin-user/admin.dto';
import { REFERENCE_TYPE } from '../account/referenceType.enum';

class AdminService {
  adminPrefix: string = 'api/admin';
  quotationPrefix: string = 'api/price-quotations';

  public async getCustomers(criteria: CustomerListDto) {
    return await http.get(
      `${this.adminPrefix}/customers/${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getDrivers(criteria: DriverListDto) {
    return await http.get(
      `${this.adminPrefix}/drivers/${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getDeletedDrivers(criteria: DriverListDto) {
    const result = await http.get(
      `${this.adminPrefix}/drivers/deleted${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async restoreDriverByIdByAdmin(id: number) {
    const result = await http.post(`${this.adminPrefix}/drivers/${id}/restore`);
    return result.data?.result;
  }

  public async getDeletedAdmins(criteria: DriverListDto) {
    const result = await http.get(
      `${this.adminPrefix}/deleted${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async restoreAdminById(id: number) {
    const result = await http.post(`${this.adminPrefix}/${id}/restore`);
    return result.data?.result;
  }

  public async getDriver(id: number) {
    return await http.get(`${this.adminPrefix}/driver/${id}`);
  }

  public async updateDriverAccount(model: DriverRequestDto, id: number) {
    const result = await http.put(`${this.adminPrefix}/driver/${id}`, model);
    return result.data?.result;
  }

  public async addAdmin(model: NewAdminDto) {
    const result = await http.post(`${this.adminPrefix}`, model);
    return result.data?.result;
  }

  public async getAdmins(criteria: AdminListDto) {
    return await http.get(
      `${this.adminPrefix}/accounts/${prepareGetQuery({ ...criteria })}`
    );
  }

  public async deleteDriver(id: number) {
    return await http.delete(`${this.adminPrefix}/drivers/${id}`);
  }

  public async deleteCustomer(id: number) {
    return await http.delete(`${this.adminPrefix}/customers/${id}`);
  }

  public async deleteAdmin(id: number) {
    return await http.delete(`${this.adminPrefix}/${id}`);
  }

  public async addDriver(model: NewDriverRequestDto) {
    const result = await http.post(`${this.adminPrefix}/add-driver`, model);
    return result.data?.result;
  }

  public async deleteFiles(id: number, referenceType: number) {
    const result = await http.delete(
      `${this.adminPrefix}/files/${id}/${referenceType}`
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
      `${this.adminPrefix}/${id}/upload-driver-license`,
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
      `${this.adminPrefix}/${id}/upload-driver-card-front`,
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
      `${this.adminPrefix}/${id}/upload-driver-card-back`,
      form,
      config
    );
    return result.data?.result;
  }
  public async getAdminsById(id: number) {
    return await http.get(`${this.adminPrefix}/${id}`);
  }

  public async updateAdmin(id: number, model: any) {
    return await http.put(`${this.adminPrefix}/${id}`, model);
  }

  public async customerCancellingOrder(id: number) {
    return await http.put(
      `${this.adminPrefix}/orders/${id}/customer-cancelling`
    );
  }

  public async driverCancellingOrder(id: number) {
    return await http.put(`${this.adminPrefix}/orders/${id}/driver-cancelling`);
  }

  public async adminCancellingOrder(id: number) {
    return await http.put(`${this.adminPrefix}/orders/${id}/admin-cancelling`);
  }

  public async getDataReport(month: number, year: number) {
    const result = await http.get(
      `${this.adminPrefix}/orders/report/${prepareGetQuery({
        month,
        year,
      })}`
    );
    return result.data?.result;
  }

  public async getCustomerStatistics(model: any) {
    const result = await http.get(
      `${this.adminPrefix}/statistic/customer/${prepareGetQuery(model)}`
    );
    return result.data?.result;
  }

  public async getTruckOwnerStatistics(model: any) {
    const result = await http.get(
      `${this.adminPrefix}/statistic/truck-owner/${prepareGetQuery(model)}`
    );
    return result.data?.result;
  }

  async adminDeleteTruckOwner(id: number) {
    const result = await http.put(
      `${this.adminPrefix}/truck-owner/untake-order/${id}`
    );
    return result.data?.result;
  }

  async getAllTruckOWners() {
    const result = await http.get(`${this.adminPrefix}/truck-owners/all`);
    return result.data?.result;
  }

  async getTruckOwnerDrivers(id: number) {
    const result = await http.get(
      `${this.adminPrefix}/truck-owner/${id}/drivers/all`
    );
    return result.data?.result;
  }

  async getTruckOwnerTrucks(id: number) {
    const result = await http.get(
      `${this.adminPrefix}/truck-owner/${id}/trucks/all`
    );
    return result.data?.result;
  }

  async assignOrderTruckOwner(orderId: number, id: number) {
    const result = await http.post(
      `${this.adminPrefix}/order/${orderId}/truck-owner`,
      { id }
    );
    return result.data?.result;
  }

  async assignOrderDrivers(orderId: number, model: number[]) {
    const result = await http.post(
      `${this.adminPrefix}/order/${orderId}/drivers`,
      model
    );
    return result.data?.result;
  }

  async assignOrderTrucks(orderId: number, model: number[]) {
    const result = await http.post(
      `${this.adminPrefix}/order/${orderId}/trucks`,
      model
    );
    return result.data?.result;
  }

  async addPriceSetting() {
    await http.post(`${this.adminPrefix}/pricing`);
  }

  async getPriceSettings() {
    const result = await http.get(`${this.adminPrefix}/pricing`);
    return result.data?.result;
  }

  async deletePriceSetting(id: number) {
    const result = await http.delete(`${this.adminPrefix}/pricing/${id}`);
    return result;
  }

  async updatePriceSetting(values: any) {
    return await http.put(`${this.adminPrefix}/pricing`, values);
  }

  async updateTruckTypeFare(values: any, id: number) {
    return await http.put(`${this.adminPrefix}/truck-type-fare/${id}`, values);
  }

  async deleteTruckTypeFare(id: number) {
    return await http.delete(`${this.adminPrefix}/truck-type-fare/${id}`);
  }

  async addTruckTypeFare(priceSettingId: number) {
    return await http.post(
      `${this.adminPrefix}/truck-type-fare/pricing/${priceSettingId}`
    );
  }

  async handleAddPayloadFare(priceSettingId: number) {
    return await http.post(
      `${this.adminPrefix}/payload/pricing/${priceSettingId}`
    );
  }

  async deletePayloadFare(id: number) {
    return await http.delete(`${this.adminPrefix}/payload/${id}`);
  }

  async updatePayloadFare(values: any, id: number) {
    return await http.put(`${this.adminPrefix}/payload/${id}`, values);
  }

  async updatePayloadZone(values: any, id: number) {
    return await http.put(`${this.adminPrefix}/zone/${id}`, values);
  }

  async deletePayloadZone(id: number) {
    return await http.delete(`${this.adminPrefix}/zone/${id}`);
  }

  async addZonePrice(priceSettingId: number) {
    return await http.post(`${this.adminPrefix}/zone/${priceSettingId}`);
  }

  async updateDistancePrice(values: any, id: number) {
    return await http.put(`${this.adminPrefix}/distance-price/${id}`, values);
  }

  async deleteDistancePrice(id: number) {
    return await http.delete(`${this.adminPrefix}/distance-price/${id}`);
  }

  async deleteDynamicItem(id: number) {
    return await http.delete(`${this.adminPrefix}/dynamic-items/${id}`);
  }

  async createDynamicItem(id: number) {
    return await http.post(`${this.adminPrefix}/dynamic-items/${id}`);
  }

  async createMultipleStops(id: number) {
    return await http.post(`${this.adminPrefix}/multiple-stops/${id}`);
  }

  async deleteMultipleStops(id: number) {
    return await http.delete(`${this.adminPrefix}/multiple-stops/${id}`);
  }

  async updateMultipleStops(values: any, id: number) {
    return await http.put(`${this.adminPrefix}/multiple-stops/${id}`, values);
  }

  async getDistances(id: number) {
    const result = await http.get(
      `${this.adminPrefix}/distance-price/${id}/distances`
    );
    return result.data?.result;
  }

  async createDistanceFare(id: number) {
    return await http.post(`${this.adminPrefix}/distance-price/${id}`);
  }

  async createDistance(id: number) {
    return await http.post(
      `${this.adminPrefix}/distance-price/${id}/distances`
    );
  }

  async deleteDistance(id: number) {
    return await http.delete(`${this.adminPrefix}/distances/${id}`);
  }

  async getSetting(type: number) {
    const result = await http.get(`${this.adminPrefix}/setting/${type}`);
    return result.data?.result;
  }

  async getSettings() {
    const result = await http.get(`${this.adminPrefix}/settings`);
    return result.data?.result;
  }

  async updateSettings(values: any) {
    return await http.put(`${this.adminPrefix}/settings`, values);
  }

  async updateCreateOrderSettings(values: any) {
    return await http.put(`${this.adminPrefix}/settings/create-order`, values);
  }

  async updateTruckPoolSettings(values: any) {
    return await http.put(`${this.adminPrefix}/settings/truck-pool`, values);
  }

  async syncData() {
    return await http.post('api/sync-data');
  }

  async updateSetting(values: any) {
    return await http.put(`${this.adminPrefix}/setting`, values);
  }

  public async editPaymentDoneByCustomer(isDone: boolean, orderId: number) {
    const result = await http.put(
      `${this.adminPrefix}/payment-done/customer/${orderId}`,
      {
        isDone,
      }
    );
    return result.data?.result;
  }

  public async deleteFileByFileId(id: number, fileId: string, type: number) {
    const result = await http.delete(
      `${this.adminPrefix}/files/other-doc/${id}/${fileId}/${type}`
    );
    return result.data?.result;
  }

  public async deleteSystemFile(type: number) {
    const result = await http.delete(
      `${this.adminPrefix}/system-files/${type}`
    );
    return result.data?.result;
  }

  async getSystemFiles() {
    const result = await http.get(`${this.adminPrefix}/system-file`);
    return result.data?.result;
  }

  public async editPaymentDoneByTruckOwner(isDone: boolean, orderId: number) {
    const result = await http.put(
      `${this.adminPrefix}/payment-done/truck-owner/${orderId}`,
      {
        isDone,
      }
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
      `${this.adminPrefix}/${id}/upload-driver-doc`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadSystemImg(file: File, fileType: any) {
    const form = new FormData();
    form.append('image', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    if (fileType === REFERENCE_TYPE.CUSTOMER_LOGO) {
      const result = await http.post(
        `${this.adminPrefix}/update-logo`,
        form,
        config
      );
      return result.data?.result;
    } else {
      const result = await http.post(
        `${this.adminPrefix}/update-qr`,
        form,
        config
      );
      return result.data?.result;
    }
  }

  public async getPriceQuotations(criteria: PriceQuotationListDto) {
    return await http.get(
      `${this.quotationPrefix}${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getCustomerOptions(search = '') {
    return await http.get(
      `${this.quotationPrefix}/customer-options?search=${search}`
    );
  }

  public async createPriceQuotaion(model: PriceQuotationDto) {
    const result = await http.post(`${this.quotationPrefix}`, model);
    return result;
  }

  public async deletePriceQuotaion(id: number) {
    const result = await http.delete(`${this.quotationPrefix}/${id}`);
    return result;
  }

  public async publishPriceQuotaion(id: number) {
    const result = await http.patch(`${this.quotationPrefix}/${id}/published`);
    return result;
  }

  public async unPublishPriceQuotaion(id: number) {
    const result = await http.patch(
      `${this.quotationPrefix}/${id}/un-published`
    );
    return result;
  }

  public async getPriceQuotationById(id: number) {
    const result = await http.get(`${this.quotationPrefix}/${id}`);
    return result;
  }

  public async updatePriceQuotaion(model: PriceQuotationDto) {
    const result = await http.put(`${this.quotationPrefix}`, model);
    return result;
  }

  public async requestLicense(model: LicenseMail) {
    const result = await http.post(
      `${this.adminPrefix}/upgrade-license-request`,
      model
    );
    return result;
  }

  public async getTrackingSettings() {
    const result = await http.get(`${this.adminPrefix}/license-settings`);
    return result.data?.result;
  }

  public async updateLicenseSettings(model: any) {
    const result = await http.put(
      `${this.adminPrefix}/license-settings`,
      model
    );
    return result.data?.result;
  }

  public async getCustomerAPI(id: number) {
    return await http.get(`${this.adminPrefix}/customer-api/${id}`);
  }

  public async createCustomerAPI(id: number) {
    return await http.post(`${this.adminPrefix}/customer-api/${id}`);
  }

  public async deleteCustomerAPI(id: number) {
    return await http.delete(`${this.adminPrefix}/customer-api/${id}`);
  }

  public async getFavoriteTruckOwner(publicId: any) {
    return await http.get(
      `${this.adminPrefix}/customers/get-favorite-truck-owner/${publicId}`
    );
  }

  public async getCommission() {
    const result = await http.get(`${this.adminPrefix}/commission`);
    return result.data?.result;
  }

  public async updateCommission(model: any) {
    const result = await http.put(`${this.adminPrefix}/commission`, model);
    return result.data?.result;
  }

  public async getDeriversEarning(model: GetDriversEarningDto) {
    const result = await http.get(
      `${this.adminPrefix}/drivers-earning${prepareGetQuery({ ...model })}`
    );
    return result.data?.result;
  }

  public async payDriverEarning(id: number, model: any) {
    return await http.post(`${this.adminPrefix}/driver/${id}/payment`, model);
  }
}
export default new AdminService();
