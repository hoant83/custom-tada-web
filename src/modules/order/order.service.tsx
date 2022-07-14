import http from '@/libs/services';
import {
  OrderRequestDto,
  OrderListDto,
  ExportOrderListDto,
  OrderListDtoV2,
} from '@/modules/order/order.dto';
import { BLACK_BOX_API, ORDER_API } from '@/modules/order/router.enum';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import { ADDITIONAL_PRICE } from './order.enum';
import { TrackingListDto } from '@/libs/dto/TrackingList.dto';

class OrderService {
  orderPrefix: string = ORDER_API.PREFIX;
  ordersCustomerPrefix: string = ORDER_API.CUSTOMER_PREFIX;
  orderCustomerPrefix: string = ORDER_API.ORDER_CUSTOMER_PREFIX;
  ordersAdminPrefix: string = ORDER_API.ADMIN_PREFIX;
  orderAdminPrefix: string = ORDER_API.ORDER_ADMIN_PREFIX;

  ordersAdminPrefixV2: string = 'api/admin/orders-v2';
  ordersCustomerPrefixV2: string = 'api/customer/orders-v2';

  orderTruckOwnerPrefix: string = ORDER_API.TRUCK_OWNER_PREFIX;

  blackBoxPrefix: string = BLACK_BOX_API.PREFIX;

  public async createOrder(model: OrderRequestDto) {
    const result = await http.post(`${this.orderPrefix}`, model);
    return result.data?.result;
  }

  public async getOrderListByCustomer(criteria: OrderListDto) {
    return await http.get(
      `${this.ordersCustomerPrefix}${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getOrderListByCustomerV2(criteria: OrderListDtoV2) {
    return await http.get(
      `${this.ordersCustomerPrefixV2}${
        criteria.all
          ? prepareGetQuery({ all: criteria.all })
          : prepareGetQuery({ ...criteria })
      }`
    );
  }

  public async getOrderPaymentListByCustomer(criteria: OrderListDto) {
    return await http.get(
      `${this.ordersCustomerPrefix}/payment/${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getCompletedOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.ordersCustomerPrefix}/completed/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getPendingOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.ordersCustomerPrefix}/pending/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getCancelledOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.ordersCustomerPrefix}/cancelled/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getTruckOwnerOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number,
    nameTruckOwner: string
  ) {
    return await http.get(
      `${this.ordersCustomerPrefix}/truckowner/${prepareGetQuery({
        ...criteria,
        month,
        year,
        nameTruckOwner,
      })}`
    );
  }

  public async getCompletedOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/orders/completed/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getPendingOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/orders/pending/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getCancelledOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/orders/cancelled/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getCustomerOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number,
    nameCustomer: string
  ) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/orders/customer/${prepareGetQuery({
        ...criteria,
        month,
        year,
        nameCustomer,
      })}`
    );
  }

  public async getCompletedOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.ordersAdminPrefix}/completed/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getPendingOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.ordersAdminPrefix}/pending/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getCancelledOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    return await http.get(
      `${this.ordersAdminPrefix}/cancelled/${prepareGetQuery({
        ...criteria,
        month,
        year,
      })}`
    );
  }

  public async getTruckOwnerOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number,
    nameTruckOwner: string
  ) {
    return await http.get(
      `${this.ordersAdminPrefix}/truckowner/${prepareGetQuery({
        ...criteria,
        month,
        year,
        nameTruckOwner,
      })}`
    );
  }

  public async getOrderListByTruckOwner(criteria: OrderListDto, id: number) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/${id}/new-orders/${prepareGetQuery({
        ...criteria,
      })}`
    );
  }

  public async getNewOrders(criteria: OrderListDto) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/new-orders${prepareGetQuery({
        ...criteria,
      })}`
    );
  }

  public async getPastOrderListByTruckOwner(
    criteria: OrderListDto,
    id: number
  ) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/${id}/get-past-jobs/${prepareGetQuery({
        ...criteria,
      })}`
    );
  }

  public async createOrderByCustomer(model: OrderRequestDto) {
    const result = await http.post(`${this.ordersCustomerPrefix}`, model);
    return result.data?.result;
  }

  public async getPricing(model: OrderRequestDto) {
    const result = await http.post(`${this.orderPrefix}/pricing`, model);
    return result.data?.result;
  }

  public async getDynamicCharges() {
    const result = await http.get(
      `${this.orderPrefix}/pricing/dynamic-charges`
    );
    return result.data?.result;
  }

  public async getDynamicChargesWithDeleted() {
    const result = await http.get(
      `${this.orderPrefix}/pricing/deleted-dynamic-charges`
    );
    return result.data?.result;
  }
  public async getOrderListByAdmin(criteria: OrderListDto) {
    return await http.get(
      `${this.ordersAdminPrefix}${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getOrderListByAdminV2(criteria: OrderListDtoV2) {
    return await http.get(
      `${this.ordersAdminPrefixV2}${
        criteria.all
          ? prepareGetQuery({
              all: criteria.all,
              skip: criteria.skip,
              take: criteria.take,
            })
          : prepareGetQuery({ ...criteria })
      }`
    );
  }

  public async createOrderByAdmin(model: OrderRequestDto) {
    const result = await http.post(`${this.ordersAdminPrefix}`, model);
    return result.data?.result;
  }

  public async updateOrder(model: OrderRequestDto, id: number) {
    const result = await http.put(`${this.orderPrefix}/${id}`, model);
    return result.data?.result;
  }

  public async exportManageOrderListByCustomer(criteria: ExportOrderListDto) {
    const result = await http.post(
      `${this.ordersCustomerPrefix}/manage/export`,
      criteria
    );
    return result.data?.result;
  }

  public async exportPaymentOrderListByCustomer(criteria: ExportOrderListDto) {
    const result = await http.post(
      `${this.ordersCustomerPrefix}/payment/export`,
      criteria
    );
    return result.data?.result;
  }

  public async exportManageOrderListByAdmin(
    criteria: ExportOrderListDto,
    dataConditionFilter: any
  ) {
    const bodyData = {
      criteria: criteria,
      dataConditionFilter: dataConditionFilter,
    };
    const result = await http.post(
      `${this.ordersAdminPrefix}/manage/export`,
      bodyData
    );
    return result.data?.result;
  }

  public async exportPaymentOrderListByAdmin(
    criteria: ExportOrderListDto,
    dataFilter: any
  ) {
    console.log(dataFilter);
    const data = {
      criteriaPayment: criteria,
      dataFilterPayment: dataFilter,
    };
    const result = await http.post(
      `${this.ordersAdminPrefix}/payment/export`,
      data
    );
    return result.data?.result;
  }

  public async exportReportOrderListByCustomer(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    const result = await http.post(
      `${this.ordersCustomerPrefix}/report-orders/export`,
      { criteria, thisMonth, thisYear, typeOrder }
    );
    return result.data?.result;
  }

  public async exportReportOrderListByTruckOwner(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    const result = await http.post(
      `${this.orderTruckOwnerPrefix}/report-orders/export`,
      { criteria, thisMonth, thisYear, typeOrder }
    );
    return result.data?.result;
  }

  public async exportReportTruckOwnerListByCustomer(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    const result = await http.post(
      `${this.ordersCustomerPrefix}/report-truckowners/export`,
      { criteria, thisMonth, thisYear, typeOrder }
    );
    return result.data?.result;
  }

  public async exportReportCustomerListByTruckOwner(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    const result = await http.post(
      `${this.orderTruckOwnerPrefix}/report-customers/export`,
      { criteria, thisMonth, thisYear, typeOrder }
    );
    return result.data?.result;
  }

  public async exportReportOrderListByAdmin(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    const result = await http.post(
      `${this.ordersAdminPrefix}/report-orders/export`,
      { criteria, thisMonth, thisYear, typeOrder }
    );
    return result.data?.result;
  }

  public async exportReportTruckOwnerListByAdmin(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    const result = await http.post(
      `${this.ordersAdminPrefix}/report-truckowners/export`,
      { criteria, thisMonth, thisYear, typeOrder }
    );
    return result.data?.result;
  }

  public async exportPendingOrderListByTruckOwner(
    criteria: ExportOrderListDto
  ) {
    const result = await http.post(
      `${this.orderTruckOwnerPrefix}/orders-pending/export`,
      criteria
    );
    return result.data?.result;
  }

  public async exportOrderListByTruckOwner(criteria: ExportOrderListDto) {
    const result = await http.post(
      `${this.orderTruckOwnerPrefix}/orders/export`,
      criteria
    );
    return result.data?.result;
  }

  public async exportPastOrderListByTruckOwner(criteria: ExportOrderListDto) {
    const result = await http.post(
      `${this.orderTruckOwnerPrefix}/orders-past/export`,
      criteria
    );
    return result.data?.result;
  }

  //
  // Admin
  //

  public async getOrderByIdByAdmin(orderId: number) {
    const result = await http.get(`${this.orderAdminPrefix}/${orderId}`);
    return result.data?.result;
  }

  async adminDeleteOrder(id: number) {
    const result = await http.delete(`${this.orderPrefix}/${id}`);
    return result.data?.result;
  }

  //
  // Other
  //

  async getOrderByID(id: number) {
    const result = await http.get(`${this.orderPrefix}/${id}`);
    return result.data?.result;
  }

  async cloneOrder(orderId: string) {
    const result = await http.get(`${this.orderPrefix}/${orderId}/clone`);
    return result.data?.result;
  }

  async acceptOrder(orderId: string) {
    const result = await http.post(
      `${this.orderTruckOwnerPrefix}/take-order/${orderId}`
    );
    return result.data?.result;
  }

  async getOnGoingJobs(criteria: OrderListDto, id: number) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/${id}/my-jobs/${prepareGetQuery({
        ...criteria,
      })}`
    );
  }

  async getCustomerInfo(id: number) {
    return await http.get(`${this.orderTruckOwnerPrefix}/customer/${id}`);
  }

  async getAdminInfo(id: number) {
    return await http.get(`${this.orderTruckOwnerPrefix}/admin/${id}`);
  }

  async getMyOrders(criteria: OrderListDto, id: number) {
    return await http.get(
      `${this.orderTruckOwnerPrefix}/${id}/orders/${prepareGetQuery({
        ...criteria,
      })}`
    );
  }

  async truckOwnerCancel(id: number) {
    return await http.put(`${this.orderTruckOwnerPrefix}/untake-order/${id}`);
  }

  public async findNewTruck(id: number) {
    const result = await http.put(`${this.orderPrefix}/${id}/find-new-truck`);
    return result;
  }

  public async addDriverToOrder(orderId: number, driverId: number) {
    return await http.post(`${this.orderPrefix}/${orderId}/driver/${driverId}`);
  }

  public async addTruckToOrder(orderId: number, truckId: number) {
    return await http.post(`${this.orderPrefix}/${orderId}/truck/${truckId}`);
  }

  public async changeStatus(orderId: number, orderStatus: string) {
    return await http.put(
      `${this.orderPrefix}/${orderId}/status/${orderStatus}`
    );
  }

  public async updateCommission(orderId: number, data: any) {
    return await http.put(
      `${this.orderPrefix}/${orderId}/update-commission`,
      data
    );
  }

  public async uploadDocument(data: any, orderId: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.orderPrefix}/${orderId}/upload-document`,
      form,
      config
    );
    return result.data?.result;
  }

  public async deleteDocument(fileId: string) {
    return await http.delete(`${this.orderPrefix}/file/${fileId}`);
  }

  public async uploadDocumentWhenCreated(data: any, orderId: number) {
    const form = new FormData();
    form.append('image', data);
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.orderPrefix}/${orderId}/upload-document`,
      form,
      config
    );
    return result.data?.result;
  }

  async getTruckOwnerInfo(id: number) {
    const result = await http.get(`${this.orderPrefix}/${id}/truck-owner`);
    return result.data?.result;
  }

  async getReports(orderId: number, reportId: number) {
    const result = await http.get(
      `${this.orderPrefix}/folder/${orderId}/${reportId}`
    );
    return result.data?.result;
  }

  //
  // Customer
  //

  public async getOrderByIdByCustomer(orderId: number) {
    const result = await http.get(`${this.orderCustomerPrefix}/${orderId}`);
    return result.data?.result;
  }

  public async updateAdditionalPrices(
    additionalType: (ADDITIONAL_PRICE | null)[],
    additionalPrice: (number | null)[],
    totalPrice: number,
    orderId: number
  ) {
    const result = await http.post(
      `${this.orderPrefix}/additional-price/${orderId}`,
      {
        additionalType,
        additionalPrice,
        totalPrice,
      }
    );
    return result.data?.result;
  }

  public async deleteAdditionalPrice(
    additionalType: ADDITIONAL_PRICE | null,
    totalPrice: number,
    orderId: number
  ) {
    const result = await http.put(
      `${this.orderPrefix}/additional-price/delete/${orderId}`,
      {
        additionalType,
        totalPrice,
      }
    );
    return result.data?.result;
  }

  public async getTruckOwnerBank(truckId: number) {
    const result = await http.get(
      `${this.orderPrefix}/truck-bank-info/${truckId}`
    );
    return result.data?.result;
  }

  public async uploadxlsx(data: any) {
    const form = new FormData();
    form.append('csv', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await http.post(`${this.orderPrefix}/import`, form, config);
    return result.data?.result;
  }

  public async trackingTruck(orderId: number) {
    const result = await http.get(
      `${this.blackBoxPrefix}/tracking-truck?orderId=${orderId}`
    );
    return result.data?.result;
  }

  public async trackingHistory(criteria: TrackingListDto) {
    const result = await http.get(
      `${this.blackBoxPrefix}/tracking-history/${prepareGetQuery({
        ...criteria,
      })}`
    );
    return result.data?.result;
  }

  public async getGeneralSettingCommission() {
    const result = await http.get(
      `${this.orderPrefix}/general-setting-commission`
    );
    return result.data?.result;
  }
}

export default new OrderService();
