import { removeUnusedProps } from '@/libs/utils/apis.util';
import {
  dynamicDropOffInit,
  orderRequestInit,
} from '@/modules/order/order.constants';
import {
  DynamicDropOffDto,
  ExportOrderListDto,
  OrderListDto,
  OrderListDtoV2,
  OrderRequestDto,
} from '@/modules/order/order.dto';
import { ADDITIONAL_PRICE, ORDER_TYPE } from '@/modules/order/order.enum';
import orderService from '@/modules/order/order.service';
import { action, observable } from 'mobx';
import React from 'react';

class OrderStore {
  @observable orderRequestDto: OrderRequestDto = orderRequestInit;
  @observable orderRequestByCustomer: OrderRequestDto = orderRequestInit;
  @observable orderRequestByAdmin: OrderRequestDto = orderRequestInit;
  @observable orders: any[] = [];
  @observable newOrders: any[] = [];
  @observable totalCountNewOrders: number = 0;
  @observable myOrders: any[] = [];
  @observable pastOrders: any[] = [];
  @observable onGoingOrders: any[] = [];
  @observable totalCount: number = 0;
  @observable totalCountMyOrders: number = 0;
  @observable totalCountPastOrders: number = 0;
  @observable totalCountOnGoingOrders: number = 0;
  @observable currentUserDetail: any = null;
  @observable selectedOrder: any = null;
  @observable dataCloneOrder: any = null;
  @observable customerData: any = null;
  @observable dynamicDropoff: DynamicDropOffDto[] = dynamicDropOffInit;
  @observable generalSettingCommission: any = null;
  @observable isEnableCommissionFeature: boolean = false;

  // Edit from Customer Site
  @observable editingOrder: any = null;

  // Edit from Admin Site
  @observable editingAdminOrder: any = null;

  @action
  async setOrderRequestDto(data: OrderRequestDto) {
    this.orderRequestDto = data;
  }

  @action
  async setOrderRequestByCustomer(data: OrderRequestDto) {
    this.orderRequestByCustomer = data;
  }

  @action
  async setOrderRequestByAdmin(data: OrderRequestDto) {
    this.orderRequestByAdmin = data;
  }

  @action
  async setDataCloneOrder(data: OrderRequestDto) {
    this.dataCloneOrder = data;
  }

  @action
  async cleanDataCloneOrder() {
    this.dataCloneOrder = null;
  }

  @action
  async cleanCustomerData() {
    this.customerData = null;
  }

  @action
  async createOrder() {
    const result = await orderService.createOrder(this.orderRequestDto);
    this.selectedOrder = result;
    return result;
  }

  @action
  async createOrderByCustomer() {
    const result = await orderService.createOrderByCustomer(
      this.orderRequestByCustomer
    );
    this.selectedOrder = result;
    return result;
  }

  @action
  async getPricing() {
    const result = await orderService.getPricing(this.orderRequestDto);
    return result;
  }

  @action
  async getDynamicCharges() {
    return await orderService.getDynamicCharges();
  }

  @action
  async getDynamicChargesWithDeleted() {
    return await orderService.getDynamicChargesWithDeleted();
  }

  @action
  async getOrderListByCustomer(criteria: OrderListDto) {
    const result = await orderService.getOrderListByCustomer(criteria);
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getOrderListByCustomerV2(criteria: OrderListDtoV2) {
    const result = await orderService.getOrderListByCustomerV2(criteria);
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getOrderPaymentListByCustomer(criteria: OrderListDto) {
    const result = await orderService.getOrderPaymentListByCustomer(criteria);
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getPendingOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getPendingOrderListByCustomer(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCompletedOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getCompletedOrderListByCustomer(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCancelledOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getCancelledOrderListByCustomer(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getTruckOwnerOrderListByCustomer(
    criteria: OrderListDto,
    month: number,
    year: number,
    nameTruckOwner: string
  ) {
    const result = await orderService.getTruckOwnerOrderListByCustomer(
      criteria,
      month,
      year,
      nameTruckOwner
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getPendingOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getPendingOrderListByTruckOwner(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCompletedOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getCompletedOrderListByTruckOwner(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCancelledOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getCancelledOrderListByTruckOwner(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCustomerOrderListByTruckOwner(
    criteria: OrderListDto,
    month: number,
    year: number,
    nameCustomer: string
  ) {
    const result = await orderService.getCustomerOrderListByTruckOwner(
      criteria,
      month,
      year,
      nameCustomer
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getPendingOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getPendingOrderListByAdmin(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCompletedOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getCompletedOrderListByAdmin(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getCancelledOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number
  ) {
    const result = await orderService.getCancelledOrderListByAdmin(
      criteria,
      month,
      year
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getTruckOwnerOrderListByAdmin(
    criteria: OrderListDto,
    month: number,
    year: number,
    nameTruckOwner: string
  ) {
    const result = await orderService.getTruckOwnerOrderListByAdmin(
      criteria,
      month,
      year,
      nameTruckOwner
    );
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getNewOrders(criteria: OrderListDto) {
    const result = await orderService.getNewOrders(criteria);
    if (result) {
      if (result.data?.result[0])
        this.newOrders = result.data?.result[0].map((item: any) => {
          item.dropOffFields = item.dropOffFields.map((dropOff: string) =>
            JSON.parse(dropOff)
          );
          return removeUnusedProps(item);
        });
      this.totalCountNewOrders = result.data?.result[1];
    }
  }

  @action
  async getOrderListByTruckOwner(criteria: OrderListDto, id: number) {
    const result = await orderService.getOrderListByTruckOwner(criteria, id);
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getPastOrderListByTruckOwner(criteria: OrderListDto, id: number) {
    const result = await orderService.getPastOrderListByTruckOwner(
      criteria,
      id
    );
    if (result) {
      if (result.data?.result[0])
        this.pastOrders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCountPastOrders = result.data?.result[1];
    }
  }

  @action
  async createOrderByAdmin() {
    const result = await orderService.createOrderByAdmin(
      this.orderRequestByAdmin
    );
    this.selectedOrder = result;
    return result;
  }

  @action
  async getOrderListByAdmin(criteria: OrderListDtoV2) {
    const result = await orderService.getOrderListByAdmin(criteria);
    console.log('result', result);
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getOrderListByAdminV2(criteria: OrderListDtoV2) {
    const result = await orderService.getOrderListByAdminV2(criteria);
    if (result) {
      if (result.data?.result[0])
        this.orders = result.data?.result[0].map((item: any) =>
          removeUnusedProps(item)
        );
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async updateOrder(model: OrderRequestDto, id: number) {
    const result = await orderService.updateOrder(model, id);
    this.selectedOrder = result;
    return result;
  }

  @action
  async exportManageOrderListByCustomer(criteria: ExportOrderListDto) {
    return await orderService.exportManageOrderListByCustomer(criteria);
  }

  @action
  async exportPaymentOrderListByCustomer(criteria: ExportOrderListDto) {
    return await orderService.exportPaymentOrderListByCustomer(criteria);
  }

  @action
  async exportManageOrderListByAdmin(
    criteria: ExportOrderListDto,
    dataConditionFilter: any
  ) {
    return await orderService.exportManageOrderListByAdmin(
      criteria,
      dataConditionFilter
    );
  }

  @action
  async exportPaymentOrderListByAdmin(
    criteria: ExportOrderListDto,
    dataFilter: any
  ) {
    return await orderService.exportPaymentOrderListByAdmin(
      criteria,
      dataFilter
    );
  }

  @action
  async exportPendingOrderListByTruckOwner(criteria: ExportOrderListDto) {
    return await orderService.exportPendingOrderListByTruckOwner(criteria);
  }

  @action
  async exportOrderListByTruckOwner(criteria: ExportOrderListDto) {
    return await orderService.exportOrderListByTruckOwner(criteria);
  }

  @action
  async exportPastOrderListByTruckOwner(criteria: ExportOrderListDto) {
    return await orderService.exportPastOrderListByTruckOwner(criteria);
  }

  @action
  async exportReportOrderListByCustomer(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    return await orderService.exportReportOrderListByCustomer(
      criteria,
      thisMonth,
      thisYear,
      typeOrder
    );
  }

  @action
  async exportReportOrderListByTruckOwner(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    return await orderService.exportReportOrderListByTruckOwner(
      criteria,
      thisMonth,
      thisYear,
      typeOrder
    );
  }

  @action
  async exportReportTruckOwnerListByCustomer(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    return await orderService.exportReportTruckOwnerListByCustomer(
      criteria,
      thisMonth,
      thisYear,
      typeOrder
    );
  }

  @action
  async exportReportCustomerListByTruckOwner(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    return await orderService.exportReportCustomerListByTruckOwner(
      criteria,
      thisMonth,
      thisYear,
      typeOrder
    );
  }

  @action
  async exportReportOrderListByAdmin(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    return await orderService.exportReportOrderListByAdmin(
      criteria,
      thisMonth,
      thisYear,
      typeOrder
    );
  }

  @action
  async exportReportTruckOwnerListByAdmin(
    criteria: ExportOrderListDto,
    thisMonth: number,
    thisYear: number,
    typeOrder: string
  ) {
    return await orderService.exportReportTruckOwnerListByAdmin(
      criteria,
      thisMonth,
      thisYear,
      typeOrder
    );
  }

  @action
  async adminDeleteOrder(id: number) {
    const data = await orderService.adminDeleteOrder(id);
    return data;
  }

  @action
  async getOrderById(id: number) {
    let data = await orderService.getOrderByID(id);
    data = this._parseData(data);

    // console.log({ data });

    this.selectedOrder = data;
    return data;
  }

  @action
  async cloneOrder(orderId: string) {
    const data = await orderService.cloneOrder(orderId);
    const convertedData = await this._convertOrderData(data);
    this.setDataCloneOrder(convertedData);
    return convertedData;
  }

  @action
  async acceptOrder(orderId: string) {
    const data = await orderService.acceptOrder(orderId);
    return data;
  }

  @action
  async getCustomerInfo(customerId: number) {
    const result = await orderService.getCustomerInfo(customerId);
    if (result) {
      this.customerData = result.data?.result;
    }
  }

  @action
  async getAdminInfo(customerId: number) {
    const result = await orderService.getAdminInfo(customerId);
    if (result) {
      this.customerData = result.data?.result;
    }
  }

  @action
  async getOnGoingJobs(criteria: OrderListDto, id: number) {
    const result = await orderService.getOnGoingJobs(criteria, id);
    if (result) {
      this.onGoingOrders = result.data?.result[0].map((item: any) => {
        item.dropOffFields = item.dropOffFields.map((dropOff: string) =>
          JSON.parse(dropOff)
        );

        return removeUnusedProps(item);
      });
      this.totalCountOnGoingOrders = result.data?.result[1];
    }
  }

  @action
  async getMyOrders(criteria: OrderListDto, id: number) {
    const result = await orderService.getMyOrders(criteria, id);
    if (result) {
      this.myOrders = result.data?.result[0].map((item: any) => {
        item.dropOffFields = item.dropOffFields.map((dropOff: string) =>
          JSON.parse(dropOff)
        );

        return removeUnusedProps(item);
      });
      this.totalCountMyOrders = result.data?.result[1];
    }
  }

  @action
  async truckOwnerCancel(id: number) {
    const result = await orderService.truckOwnerCancel(id);
    return result.data?.result;
  }

  @action
  async findNewTruck(id: number) {
    const data = await orderService.findNewTruck(id);
    return data;
  }

  @action
  async addDriverToOrder(orderId: number, driverId: number) {
    const data = await orderService.addDriverToOrder(orderId, driverId);
    return data;
  }

  @action
  async addTruckToOrder(orderId: number, truckId: number) {
    const data = await orderService.addTruckToOrder(orderId, truckId);
    return data;
  }

  @action
  async uploadDocument(formData: any, orderId: number) {
    return await orderService.uploadDocument(formData, orderId);
  }

  @action
  async deleteDocument(fileId: string) {
    return await orderService.deleteDocument(fileId);
  }

  @action
  async uploadDocumentWhenCreated(formData: any, orderId: number) {
    return await orderService.uploadDocumentWhenCreated(formData, orderId);
  }

  @action
  async changeStatus(orderId: any, orderStatus: string) {
    return await orderService.changeStatus(orderId, orderStatus);
  }

  @action
  async updateCommission(orderId: any, data: any) {
    return await orderService.updateCommission(orderId, data);
  }

  //
  // Customer
  //

  @action
  async getOrderByIdByCustomer(orderId: number) {
    const data = await orderService.getOrderByIdByCustomer(orderId);
    this.editingOrder = this._convertOrderData(data);
    return data;
  }

  //
  // Admin
  //
  @action
  async resetUpdateAdminOrder() {
    this.editingAdminOrder = null;
  }

  @action
  async getOrderByIdByAdmin(orderId: number) {
    const data = await orderService.getOrderByIdByAdmin(orderId);
    this.editingAdminOrder = this._convertOrderDataAdmin(data);
    return data;
  }

  @action
  async getTruckOwnerInfo(orderId: number) {
    const data: any = await orderService.getTruckOwnerInfo(orderId);
    return data;
  }

  @action
  async getReports(orderId: number, reportId: number) {
    const data: any = await orderService.getReports(orderId, reportId);
    return data;
  }

  private _parseData = (data: any) => {
    if (typeof data?.dropOffFields[0] === 'string') {
      for (let i = 0; i < data.dropOffFields.length; i++) {
        data.dropOffFields[i] = JSON.parse(data.dropOffFields[i]);
        if (data.dropOffFields[i].dropoffTime !== null) {
          data.dropOffFields[i].dropoffTime = new Date(
            data.dropOffFields[i].dropoffTime
          );
        } else {
          data.dropOffFields[i].dropoffTime = '';
        }
      }
    }
    return data;
  };

  private _convertOrderData(data: any) {
    let editData: any = null;
    data = this._parseData(data);
    switch (data.orderType) {
      case ORDER_TYPE.QUICK: {
        editData = {
          dropOffFields: data.dropOffFields,
          orderType: data.orderType,
          serviceType: data.serviceType,
          detailRequest: data.detailRequest ?? '',
          pickupAddress: data.pickupAddress,
          pickupAddressText: data.pickupAddressText,
          pickupCity: data.pickupCity,
          pickupCode: data.pickupCode,
          inChargeName: data.inChargeName ?? '',
          inChargeContactNo: data.inChargeContactNo ?? '',
          otherGeneralNotes: data.otherGeneralNotes ?? '',
          status: data.status ?? '',
          assignToFav: data.assignToFav ?? null,
          assignToFavSelect: data.assignToFavSelect ?? null,
        };
        break;
      }
      case ORDER_TYPE.STANDARD: {
        editData = {
          dropOffFields: data.dropOffFields,
          truckType: data.truckType,
          truckPayload: data.truckPayload,
          paymentType: data.paymentType,
          orderType: data.orderType,
          serviceType: data.serviceType,
          nonMotorizedQuantity: data.nonMotorizedQuantity ?? '',
          nonMotorizedType: data.nonMotorizedType ?? '',
          nonMotorizedPayload: data.nonMotorizedPayload ?? '',
          concatenatedGoodsQuantity: data.concatenatedGoodsQuantity ?? '',
          concatenatedGoodsType: data.concatenatedGoodsType ?? '',
          concatenatedGoodsPayload: data.concatenatedGoodsPayload ?? '',
          contractCarQuantity: data.contractCarQuantity ?? '',
          contractCarType: data.contractCarType ?? '',
          contractCarPayload: data.contractCarPayload ?? '',
          address: data.address ?? '',
          referenceNote: data.referenceNote ?? '',
          bussinessLicenseNO: data.bussinessLicenseNO ?? '',
          companyName: data.companyName ?? '',
          email: data.email ?? '',
          referenceNo: data.referenceNo ?? '',
          cargoName: data.cargoName ?? '',
          cargoType: data.cargoType ?? '',
          cargoWeight: data.cargoWeight ?? '',
          packageSize: data.packageSize ?? '',
          packageSizeText: data.packageSizeText ?? '',
          dropoffAddress: data.dropoffAddress,
          dropoffAddressText: data.dropoffAddressText,
          pickupAddress: data.pickupAddress,
          pickupAddressText: data.pickupAddressText,
          pickupCity: data.pickupCity,
          pickupCode: data.pickupCode,
          inChargeName: data.inChargeName ?? '',
          inChargeContactNo: data.inChargeContactNo ?? '',
          otherGeneralNotes: data.otherGeneralNotes ?? '',
          dropoffContactNo: data.dropoffContactNo ?? '',
          dropoffTime: data.dropoffTime ?? '',
          noteToDriver: data.noteToDriver ?? '',
          pickupContactNo: data.pickupContactNo ?? '',
          pickupTime: data.pickupTime ?? '',
          price: data.price ?? false,
          priceRequest: data.priceRequest ?? '',
          suggestedPrice: data.suggestedPrice ?? '',
          useSuggestedPrice: data.useSuggestedPrice ?? false,
          useQuotePrice: data.useQuotePrice ?? false,
          vat: data.vat ?? false,
          vatInfo: data.vatInfo ?? '',
          truckLoad: data.truckLoad ?? '',
          truckQuantity: data.truckQuantity ?? '',
          truckSpecialType: data.truckSpecialType ?? '',
          containerSize: data.containerSize ?? '',
          containerQuantity: data.containerQuantity ?? '',
          containerType: data.containerType ?? '',
          dropoffEmptyAddress: data.dropoffEmptyAddress ?? '',
          dropoffEmptyContainer: data.dropoffEmptyContainer ?? false,
          pickupEmptyAddress: data.pickupEmptyAddress ?? '',
          pickupEmptyContainer: data.pickupEmptyContainer ?? false,
          metadata: data.metadata ?? [],
          status: data.status ?? '',
          specialRequests: data.specialRequests ?? [],
          otherPaymentType: data.otherPaymentType ?? '',
          assignToFav: data.assignToFav ?? null,
          assignToFavSelect: data.assignToFavSelect ?? null,
        };
        break;
      }
      default: {
        break;
      }
    }

    return editData;
  }

  private _convertOrderDataAdmin(data: any) {
    data = this._parseData(data);
    const editData: any = {
      paymentType: data.paymentType,
      truckPayload: data.truckPayload ?? '',
      dropOffFields: data.dropOffFields,
      truckType: data.truckType,
      packageSize: data.packageSize,
      packageSizeText: data.packageSizeText ?? '',
      orderType: data.orderType,
      serviceType: data.serviceType,
      referenceNo: data.referenceNo ?? '',
      cargoName: data.cargoName ?? '',
      cargoType: data.cargoType ?? '',
      cargoWeight: data.cargoWeight ?? '',
      nonMotorizedQuantity: data.nonMotorizedQuantity ?? '',
      nonMotorizedType: data.nonMotorizedType ?? '',
      nonMotorizedPayload: data.nonMotorizedPayload ?? '',
      concatenatedGoodsQuantity: data.concatenatedGoodsQuantity ?? '',
      concatenatedGoodsType: data.concatenatedGoodsType ?? '',
      concatenatedGoodsPayload: data.concatenatedGoodsPayload ?? '',
      contractCarQuantity: data.contractCarQuantity ?? '',
      contractCarType: data.contractCarType ?? '',
      contractCarPayload: data.contractCarPayload ?? '',
      dropoffAddress: data.dropoffAddress,
      dropoffAddressText: data.dropoffAddressText,
      pickupAddress: data.pickupAddress,
      pickupAddressText: data.pickupAddressText,
      pickupCity: data.pickupCity,
      pickupCode: data.pickupCode,
      detailRequest: data.detailRequest ?? '',
      inChargeName: data.inChargeName ?? '',
      inChargeContactNo: data.inChargeContactNo ?? '',
      otherGeneralNotes: data.otherGeneralNotes ?? '',
      dropoffContactNo: data.dropoffContactNo ?? '',
      dropoffTime: data.dropoffTime ?? '',
      noteToDriver: data.noteToDriver ?? '',
      pickupContactNo: data.pickupContactNo ?? '',
      pickupTime: data.pickupTime ? new Date(data.pickupTime) : '',
      price: data.price ?? false,
      priceRequest: data.priceRequest ?? '',
      suggestedPrice: data.suggestedPrice ?? '',
      useSuggestedPrice: data.useSuggestedPrice ?? false,
      useQuotePrice: data.useQuotePrice ?? false,
      vat: data.vat ?? false,
      vatInfo: data.vatInfo ?? '',
      staffNote: data.staffNote ?? '',
      staffAnotherNote: data.staffAnotherNote ?? '',
      status: data.status,
      truckLoad: data.truckLoad ?? '',
      truckQuantity: data.truckQuantity ?? '',
      truckSpecialType: data.truckSpecialType ?? '',
      containerSize: data.containerSize ?? '',
      containerQuantity: data.containerQuantity ?? '',
      containerType: data.containerType ?? '',
      metadata: data.metadata ?? [],
      specialRequests: data.specialRequests ?? [],
      address: data.address ?? '',
      referenceNote: data.referenceNote ?? '',
      bussinessLicenseNO: data.bussinessLicenseNO ?? '',
      companyName: data.companyName ?? '',
      email: data.email ?? '',
      assignToFav: data.assignToFav ?? null,
      assignToFavSelect: data.assignToFavSelect ?? null,
      createdByCustomerId: data.createdByCustomerId ?? null,
    };
    return editData;
  }

  @action
  async updatePrice(price: number, orderId: number) {
    let model: any = {
      priceRequest: 0,
    };
    model.useSuggestedPrice = false;
    model.suggestedPrice = null;
    model.price = true;
    model.priceRequest = price;
    return await orderService.updateOrder(model, orderId);
  }

  @action
  async updateAdditionalPrices(
    additionalType: (ADDITIONAL_PRICE | null)[],
    additionalPrice: (number | null)[],
    totalPrice: number,
    orderId: number
  ) {
    return await orderService.updateAdditionalPrices(
      additionalType,
      additionalPrice,
      totalPrice,
      orderId
    );
  }

  @action
  async deleteAdditionalPrice(
    additionalType: ADDITIONAL_PRICE | null,
    totalPrice: number,
    orderId: number
  ) {
    return await orderService.deleteAdditionalPrice(
      additionalType,
      totalPrice,
      orderId
    );
  }

  @action
  async getTruckOwnerBank(truckId: number) {
    const data = await orderService.getTruckOwnerBank(truckId);
    return data;
  }

  @action
  async uploadxlsx(formData: any) {
    const data = await orderService.uploadxlsx(formData);
    return data;
  }

  @action
  async getGeneralSettingCommission() {
    const data = await orderService.getGeneralSettingCommission();
    this.generalSettingCommission = data;
    this.isEnableCommissionFeature = data?.isEnableCommissionFeature || false;
    return data;
  }
}

export default new OrderStore();

export const OrderStoreContext = React.createContext(new OrderStore());
