import { DYNAMIC_DEFAULT_OPTION } from '@/modules/admin-user/admin.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  getCargoType,
  getOrderStatus,
  getOrderType,
  getPaymentType,
} from '@/modules/order/order.constants';
import { ADDITIONAL_PRICE, SERVICE_TYPE } from '@/modules/order/order.enum';
import {
  concatenatedGoodsType,
  contractCarType,
  defaultContainerSize,
  defaultContainerType,
  nonMotorizedType,
  truckPayload,
  truckType,
} from '@/modules/truck/truck.enum';
import * as XLSX from 'xlsx';
import { TYPE_EXPORT } from '../constants/type-export.constants';
import { getLabelFromKey } from './apis.util';
import { toTimeFormat } from './time.util';

const headingOrder = [
  [
    'Created Date',
    'Order ID',
    'Reference No.',
    'Order Type',
    'Status',
    'Service Type',
    'Container Size',
    'Container Style',
    'Container Quantity',
    'Truck Type',
    'Truck Quantity',
    'Truck Load',
    'Cargo Type',
    'Cargo Name',
    'Cargo Weight',
    'Pickup Address',
    'Pickup Time',
    'Dropoff Address',
    'Dropoff Time',
    'Pickup Empty Container',
    'Pickup Empty Address',
    'Dropoff Empty Container',
    'Dropoff Empty Address',
    'Person In Charge',
    'In Charge Contact No.',
    'Pickup Code',
    'Delivery Code',
    'Truck Owner ID',
    'Truck Owner Name',
    'Company Name',
    'Truck Owner Email',
  ],
];

const headingTruckOwner = [
  [
    'Created Date',
    'Order ID',
    'Status',
    'Pickup Address',
    'Pickup Time',
    'Dropoff Address',
    'Dropoff Time',
    'Driver In Charge',
    'Truck Plate No.',
    'Customer Name',
    'Customer Email',
    'VAT',
    'VAT information',
  ],
];

export const exportAsCSV = (json: any, excelFileName: string): void => {
  const ws = XLSX.utils.json_to_sheet(json);
  if (excelFileName === 'order') {
    XLSX.utils.sheet_add_json(ws, headingOrder, { skipHeader: true });
  } else {
    XLSX.utils.sheet_add_json(ws, headingTruckOwner, { skipHeader: true });
  }
  const csv = XLSX.utils.sheet_to_csv(ws);
  const new_csv = '\uFEFF' + csv;
  const blob = new Blob([new_csv], { type: 'text/csv;charset=UTF-8' });
  const download = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  download.href = url;
  download.download = excelFileName + '.csv';
  download.click();
  window.URL.revokeObjectURL(url);
  // check if need to remove download
  download.remove();
};

export const exportAsXLS = (json: any, excelFileName: string): void => {
  const ws = XLSX.utils.json_to_sheet(json);
  if (excelFileName === 'order') {
    XLSX.utils.sheet_add_json(ws, headingOrder, { skipHeader: true });
  } else {
    XLSX.utils.sheet_add_json(ws, headingTruckOwner, { skipHeader: true });
  }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, excelFileName);
  XLSX.writeFile(wb, excelFileName + '.xls');
};

const headingOrderCustomer = [
  { header: 'Created Date', key: 'createdDateText' },
  { header: 'Order ID', key: 'orderId' },
  { header: 'Reference No.', key: 'referenceNo' },
  { header: 'Reference Note', key: 'referenceNote' },
  { header: 'Order Type', key: 'orderTypeText' },
  { header: 'Status', key: 'statusText' },
  { header: 'Vehicle Type', key: 'vehicleType' },
  { header: 'Vehicel Quantity', key: 'truckQuantity' },
  { header: 'Cargo Type', key: 'cargoTypeText' },
  { header: 'Cargo Name', key: 'cargoName' },
  { header: 'Cargo Weight', key: 'cargoWeight' },
  { header: 'Pickup Address', key: 'pickupAddressText' },
  { header: 'Pickup Time', key: 'pickupTimeText' },
  { header: 'Dropoff Address', key: 'dropoffAddressText' },
  { header: 'Dropoff Time', key: 'dropoffTimeText' },
  { header: 'Pickup Empty Container', key: 'pickupEmptyContainerText' },
  { header: 'Pickup Empty Address', key: 'pickupEmptyAddress' },
  { header: 'Dropoff Empty Container', key: 'dropoffEmptyContainerText' },
  { header: 'Dropoff Empty Address', key: 'dropoffEmptyAddress' },
  { header: 'Pickup Code', key: 'pickupCode' },
  { header: 'Delivery Code', key: 'deliveryCode' },
  { header: 'Proposed price', key: 'proposedPriceText' },
  { header: 'VAT', key: 'vatText' },
  { header: 'Payment Type', key: 'paymentTypeText' },
  { header: 'Truck Owner ID', key: 'truckOwnerId' },
  { header: 'Company Name', key: 'ownerCompanyName' },
  { header: 'Truck Owner Email', key: 'truckOwnerEmail' },
  { header: 'Person In Charge', key: 'inChargeName' },
  { header: 'Order created by', key: 'orderCreatedBy' },
];

export const exportAsCSVorXLSCustomerOrder = (
  json: any[],
  excelFileName: string,
  type: TYPE_EXPORT
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, headingOrderCustomer);
  const headers: string[] = _getHeaders(headingOrderCustomer);

  if (type === TYPE_EXPORT.CSV) {
    _exportAsCSVBasic(jsonSort, excelFileName, headers);
  }

  if (type === TYPE_EXPORT.XLS) {
    _exportAsXLSBasic(jsonSort, excelFileName, headers);
  }
};

export const formatExportAsCSVCustomerOrder = (
  t: any,
  newDateFormat: string,
  json: any[]
): any[] => {
  json.forEach((order) => {
    order.createdDateText = formatDate(order.createdDate, newDateFormat);
    order.statusText = getOrderStatus(t, order.status);
    order.pickupTimeText = formatDate(order.pickupTime, newDateFormat);
    order.vatText = getYesOrNo(order.vat);
    order.paymentTypeText = getPaymentType(t, order.paymentType);
    order.vehicleType = getVehicleType(t, order);

    if (order.dropOffFields) {
      let dropoffAddressText = '';
      let dropoffTimeText = '';
      const size = (order.dropOffFields as any[]).length;
      (order.dropOffFields as any[]).forEach((d, index) => {
        const obj = JSON.parse(d);
        dropoffAddressText += `${obj.dropoffAddressText}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
        dropoffTimeText += `${formatDate(obj.dropoffTime, newDateFormat)}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
      });

      order.dropoffAddressText = dropoffAddressText;
      order.dropoffTimeText = dropoffTimeText;
    }

    order.proposedPrice = order.useSuggestedPrice
      ? order.suggestedPrice
      : order.priceRequest;
    order.orderTypeText = getOrderType(t, order.orderType);
    order.cargoTypeText = getCargoType(t, order.cargoType);
    order.pickupEmptyContainerText = getYesOrNo(order.pickupEmptyContainer);
    order.dropoffEmptyContainerText = getYesOrNo(order.dropoffEmptyContainer);
    order.proposedPriceText = formatNumber(order.proposedPrice);
  });

  return json;
};

const headingOrderTruckOwner = [
  { header: 'Created Date', key: 'createdDateText' },
  { header: 'Order ID', key: 'orderId' },
  { header: 'Status', key: 'statusText' },
  { header: 'Vehicle Type', key: 'vehicleType' },
  { header: 'Vehicel Quantity', key: 'truckQuantity' },
  { header: 'Cargo Name', key: 'cargoName' },
  { header: 'Other Special Request', key: 'specialRequestsText' },
  { header: 'Pickup Address', key: 'pickupAddressText' },
  { header: 'Pickup Time', key: 'pickupTimeText' },
  { header: 'Dropoff Address', key: 'dropoffAddressText' },
  { header: 'Dropoff Time', key: 'dropoffTimeText' },
  { header: 'Driver In charge', key: 'driverInCharge' },
  { header: 'Truck Plate No.', key: 'truckNo' },
  { header: 'Customer Name', key: 'customerName' },
  { header: 'Customer Email', key: 'customerEmail' },
  { header: 'VAT', key: 'vatText' },
  { header: 'VAT Information', key: 'vatInfo' },
  { header: 'Amount Payment', key: 'totalPriceText' },
  { header: 'Payment Type', key: 'paymentTypeText' },
  { header: 'Payment Status', key: 'paymentStatusText' },
  { header: 'Due Date', key: 'paymentDueDateText' },
];

export const exportAsCSVorXLSTruckOwnerOrder = (
  json: any[],
  excelFileName: string,
  type: TYPE_EXPORT
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, headingOrderTruckOwner);
  const headers: string[] = _getHeaders(headingOrderTruckOwner);

  if (type === TYPE_EXPORT.CSV) {
    _exportAsCSVBasic(jsonSort, excelFileName, headers);
  }

  if (type === TYPE_EXPORT.XLS) {
    _exportAsXLSBasic(jsonSort, excelFileName, headers);
  }
};

export const formatExportAsCSVTruckOwnerOrder = (
  t: any,
  newDateFormat: string,
  json: any[]
): any[] => {
  json.forEach((order) => {
    order.createdDateText = formatDate(order.createdDate, newDateFormat);
    order.statusText = getOrderStatus(t, order.status);
    order.pickupTimeText = formatDate(order.pickupTime, newDateFormat);
    order.vatText = getYesOrNo(order.vat);
    order.paymentTypeText = getPaymentType(t, order.paymentType);
    order.vehicleType = getVehicleType(t, order);

    if (order.dropOffFields) {
      let dropoffAddressText = '';
      let dropoffTimeText = '';
      const size = (order.dropOffFields as any[]).length;
      (order.dropOffFields as any[]).forEach((d, index) => {
        const obj = JSON.parse(d);
        dropoffAddressText += `${obj.dropoffAddressText}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
        dropoffTimeText += `${formatDate(obj.dropoffTime, newDateFormat)}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
      });

      order.dropoffAddressText = dropoffAddressText;
      order.dropoffTimeText = dropoffTimeText;
    }

    order.specialRequestsText = getSpecialRequests(order.specialRequests);
    order.paymentDueDateText = formatDate(order.paymentDueDate, newDateFormat);
    order.paymentStatusText = getPaymentStatus(order.isPaymentDoneByCustomer);
    order.totalPriceText = formatNumber(order.totalPrice);
  });

  return json;
};

const headingOrderCustomerPayment = [
  { header: 'Created Date', key: 'createdDateText' },
  { header: 'Order ID', key: 'orderId' },
  { header: 'Reference No.', key: 'referenceNo' },
  { header: 'Reference Note', key: 'referenceNote' },
  { header: 'Pickup Time', key: 'pickupTimeText' },
  { header: 'Dropoff Address', key: 'dropoffAddressText' },
  { header: 'Order Status', key: 'statusText' },
  { header: 'Payment Status', key: 'paymentStatusText' },
  { header: 'Payment Type', key: 'paymentTypeText' },
  { header: 'Proposed price', key: 'proposedPriceText' },
  { header: 'Additional Price', key: 'additionalPriceText' },
  { header: 'Payment Amount', key: 'totalPriceText' },
  { header: 'Due Date', key: 'paymentDueDateText' },
  { header: 'Truck Operator', key: 'ownerCompanyName' },
  { header: 'Truck Owner Email', key: 'truckOwnerEmail' },
  { header: 'Bank name', key: 'bankName' },
  { header: 'Bank Branch', key: 'bankBranch' },
  { header: 'Bank Account Holder Name', key: 'bankAccountHolderName' },
  { header: 'Bank Account Bank Number', key: 'bankAccountNumber' },
  { header: 'Person In Charge', key: 'inChargeName' },
  { header: 'Order created by', key: 'orderCreatedBy' },
];

export const exportAsCSVorXLSCustomerOrderPayment = (
  json: any[],
  excelFileName: string,
  type: TYPE_EXPORT
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, headingOrderCustomerPayment);
  const headers: string[] = _getHeaders(headingOrderCustomerPayment);

  if (type === TYPE_EXPORT.CSV) {
    _exportAsCSVBasic(jsonSort, excelFileName, headers);
  }

  if (type === TYPE_EXPORT.XLS) {
    _exportAsXLSBasic(jsonSort, excelFileName, headers);
  }
};

export const formatExportAsCSVCustomerOrderPayment = (
  t: any,
  newDateFormat: string,
  json: any[]
): any[] => {
  json.forEach((order) => {
    order.createdDateText = formatDate(order.createdDate, newDateFormat);
    order.statusText = getOrderStatus(t, order.status);
    order.pickupTimeText = formatDate(order.pickupTime, newDateFormat);
    order.vatText = getYesOrNo(order.vat);
    order.paymentTypeText = getPaymentType(t, order.paymentType);

    if (order.dropOffFields) {
      let dropoffAddressText = '';
      const size = (order.dropOffFields as any[]).length;
      (order.dropOffFields as any[]).forEach((d, index) => {
        const obj = JSON.parse(d);
        dropoffAddressText += `${obj.dropoffAddressText}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
      });

      order.dropoffAddressText = dropoffAddressText;
    }

    order.proposedPrice = order.useSuggestedPrice
      ? order.suggestedPrice
      : order.priceRequest;
    order.orderTypeText = getOrderType(t, order.orderType);
    order.cargoTypeText = getCargoType(t, order.cargoType);
    order.pickupEmptyContainerText = getYesOrNo(order.pickupEmptyContainer);
    order.dropoffEmptyContainerText = getYesOrNo(order.dropoffEmptyContainer);
    order.proposedPriceText = formatNumber(order.proposedPrice);
    order.paymentStatusText = getPaymentStatus(order.isPaymentDoneByCustomer);

    if (order.additionalPriceKey) {
      let additionalPriceText = '';
      const additionalPriceKey = order.additionalPriceKey;
      const keys = Object.keys(additionalPriceKey);
      const size = keys.length;

      keys.forEach((key, index) => {
        const value = additionalPriceKey[key];
        switch (key) {
          case ADDITIONAL_PRICE.ADJUSTMENT_AMOUNT:
            additionalPriceText += `${t(
              I18N.ORDER_ADJUSTMENT_AMOUNT
            )}: ${value}\n`;
            break;
          case ADDITIONAL_PRICE.FORKLIFT_COST:
            additionalPriceText += `${t(I18N.ORDER_FORKLIFT_COST)}: ${value}${
              size > 1 && index + 1 < size ? '\n' : ''
            }`;
            break;
          case ADDITIONAL_PRICE.LABOUR_COST:
            additionalPriceText += `${t(I18N.ORDER_LABOUR_COST)}: ${value}${
              size > 1 && index + 1 < size ? '\n' : ''
            }`;
            break;
          case ADDITIONAL_PRICE.ROAD_FEE:
            additionalPriceText += `${t(I18N.ORDER_ROAD_FEE)}: ${value}${
              size > 1 && index + 1 < size ? '\n' : ''
            }`;
            break;
          case ADDITIONAL_PRICE.WAITING_FEE:
            additionalPriceText += `${t(I18N.ORDER_WAITING_FEE)}: ${value}${
              size > 1 && index + 1 < size ? '\n' : ''
            }`;
            break;
          case ADDITIONAL_PRICE.INCENTIVES:
            additionalPriceText += `${t(I18N.ORDER_INCENTIVES)}: ${value}${
              size > 1 && index + 1 < size ? '\n' : ''
            }`;
            break;
          default:
            additionalPriceText += `${t(I18N.ORDER_OTHERS)}: ${value}${
              size > 1 && index + 1 < size ? '\n' : ''
            }`;
        }
      });
      order.additionalPriceText = additionalPriceText;
    }

    order.paymentDueDateText = formatDate(order.paymentDueDate, newDateFormat);
    order.totalPriceText = formatNumber(order.totalPrice);
  });

  return json;
};

const headingOrderAdmin = [
  { header: 'Created Date', key: 'createdDateText' },
  { header: 'Order ID', key: 'orderId' },
  { header: 'Reference No.', key: 'referenceNo' },
  { header: 'Reference Note', key: 'referenceNote' },
  { header: 'Order Type', key: 'orderTypeText' },
  { header: 'Status', key: 'statusText' },
  { header: 'Vehicle Type', key: 'vehicleType' },
  { header: 'Vehicel Quantity', key: 'truckQuantity' },
  { header: 'Cargo Type', key: 'cargoTypeText' },
  { header: 'Cargo Name', key: 'cargoName' },
  { header: 'Cargo Weight', key: 'cargoWeight' },
  { header: 'Pickup Address', key: 'pickupAddressText' },
  { header: 'Pickup Time', key: 'pickupTimeText' },
  { header: 'Dropoff Address', key: 'dropoffAddressText' },
  { header: 'Dropoff Time', key: 'dropoffTimeText' },
  { header: 'Pickup Empty Container', key: 'pickupEmptyContainerText' },
  { header: 'Pickup Empty Address', key: 'pickupEmptyAddress' },
  { header: 'Dropoff Empty Container', key: 'dropoffEmptyContainerText' },
  { header: 'Dropoff Empty Address', key: 'dropoffEmptyAddress' },
  { header: 'Pickup Code', key: 'pickupCode' },
  { header: 'Delivery Code', key: 'deliveryCode' },
  { header: 'Proposed price', key: 'proposedPriceText' },
  { header: 'VAT', key: 'vatText' },
  { header: 'Payment Due Date', key: 'paymentDueDateText' },
  { header: 'Payment Type', key: 'paymentTypeText' },
  { header: 'Truck Owner ID', key: 'truckOwnerId' },
  { header: 'Company Name', key: 'ownerCompanyName' },
  { header: 'Truck Owner Email', key: 'truckOwnerEmail' },
  { header: 'Person In Charge', key: 'inChargeName' },
  { header: 'Order created by', key: 'orderCreatedBy' },
];

export const exportAsCSVorXLSAdminOrder = (
  json: any[],
  excelFileName: string,
  type: TYPE_EXPORT
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, headingOrderAdmin);
  const headers: string[] = _getHeaders(headingOrderAdmin);

  if (type === TYPE_EXPORT.CSV) {
    _exportAsCSVBasic(jsonSort, excelFileName, headers);
  }

  if (type === TYPE_EXPORT.XLS) {
    _exportAsXLSBasic(jsonSort, excelFileName, headers);
  }
};

export const formatExportAsCSVAdminOrder = (
  t: any,
  newDateFormat: string,
  json: any[]
): any[] => {
  json.forEach((order) => {
    order.createdDateText = formatDate(order.createdDate, newDateFormat);
    order.statusText = getOrderStatus(t, order.status);
    order.pickupTimeText = formatDate(order.pickupTime, newDateFormat);
    order.vatText = getYesOrNo(order.vat);
    order.paymentTypeText = getPaymentType(t, order.paymentType);
    order.vehicleType = getVehicleType(t, order);

    if (order.dropOffFields) {
      let dropoffAddressText = '';
      let dropoffTimeText = '';
      const size = (order.dropOffFields as any[]).length;
      (order.dropOffFields as any[]).forEach((d, index) => {
        const obj = JSON.parse(d);
        dropoffAddressText += `${obj.dropoffAddressText}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
        dropoffTimeText += `${formatDate(obj.dropoffTime, newDateFormat)}${
          size > 1 && index + 1 < size ? '\n' : ''
        }`;
      });

      order.dropoffAddressText = dropoffAddressText;
      order.dropoffTimeText = dropoffTimeText;
    }

    order.proposedPrice = order.useSuggestedPrice
      ? order.suggestedPrice
      : order.priceRequest;
    order.orderTypeText = getOrderType(t, order.orderType);
    order.cargoTypeText = getCargoType(t, order.cargoType);
    order.pickupEmptyContainerText = getYesOrNo(order.pickupEmptyContainer);
    order.dropoffEmptyContainerText = getYesOrNo(order.dropoffEmptyContainer);
    order.proposedPriceText = formatNumber(order.proposedPrice);
    order.paymentDueDateText = formatDate(order.paymentDueDate, newDateFormat);
  });

  return json;
};

const headingOrderAdminPayment = [
  { header: 'Created Date', key: 'createdDateText' },
  { header: 'Order ID', key: 'orderId' },
  { header: 'Reference No.', key: 'referenceNo' },
  { header: 'Reference Note', key: 'referenceNote' },
  { header: 'Pickup Time', key: 'pickupTimeText' },
  { header: 'Dropoff Address', key: 'dropoffAddressText' },
  { header: 'Order Status', key: 'statusText' },
  { header: 'Payment Status', key: 'paymentStatusText' },
  { header: 'Payment Type', key: 'paymentTypeText' },
  { header: 'Proposed price', key: 'proposedPriceText' },
  { header: 'Additional Price', key: 'additionalPriceText' },
  { header: 'Payment Amount', key: 'totalPriceText' },
  { header: 'Payment Due Date', key: 'paymentDueDateText' },
  { header: 'Truck Operator', key: 'ownerCompanyName' },
  { header: 'Truck Owner Email', key: 'truckOwnerEmail' },
  { header: 'Bank name', key: 'bankName' },
  { header: 'Bank Branch', key: 'bankBranch' },
  { header: 'Bank Account Holder Name', key: 'bankAccountHolderName' },
  { header: 'Bank Account Bank Number', key: 'bankAccountNumber' },
  { header: 'Person In Charge', key: 'inChargeName' },
  { header: 'Order created by', key: 'orderCreatedBy' },
];

export const exportAsCSVorXLSAdminOrderPayment = (
  json: any[],
  excelFileName: string,
  type: TYPE_EXPORT
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, headingOrderAdminPayment);
  const headers: string[] = _getHeaders(headingOrderAdminPayment);

  if (type === TYPE_EXPORT.CSV) {
    _exportAsCSVBasic(jsonSort, excelFileName, headers);
  }

  if (type === TYPE_EXPORT.XLS) {
    _exportAsXLSBasic(jsonSort, excelFileName, headers);
  }
};

const headingTrackingHistory = [
  { header: '#', key: 'orderNum' },
  { header: 'Date/Time', key: 'tracking_time' },
  { header: 'Km/h', key: 'speed' },
  { header: 'Location', key: 'address' },
];

export const exportTrackingHistory = (
  json: any[],
  excelFileName: string
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, headingTrackingHistory);
  const headers: string[] = _getHeaders(headingTrackingHistory);
  _exportAsXLSBasic(jsonSort, excelFileName, headers);
};

export const exportExcel = (
  header: any,
  json: any[],
  excelFileName: string
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, header);
  const headers: string[] = _getHeaders(header);
  _exportAsXLSBasic(jsonSort, excelFileName, headers);
};

export const exportCSV = (
  header: any,
  json: any[],
  excelFileName: string
): void => {
  const jsonSort: any[] = _sortPropertyJson(json, header);
  const headers: string[] = _getHeaders(header);
  _exportAsCSVBasic(jsonSort, excelFileName, headers);
};

const _exportAsCSVBasic = (
  json: any[],
  excelFileName: string,
  headers: string[]
): void => {
  const ws = XLSX.utils.json_to_sheet(json);
  XLSX.utils.sheet_add_json(ws, [headers], { skipHeader: true });
  const csv = XLSX.utils.sheet_to_csv(ws);
  const new_csv = '\uFEFF' + csv;
  const blob = new Blob([new_csv], { type: 'text/csv;charset=UTF-8' });
  const download = document.createElement('a');
  const url = window.URL.createObjectURL(blob);
  download.href = url;
  download.download = excelFileName + '.csv';
  download.click();
  window.URL.revokeObjectURL(url);
  // check if need to remove download
  download.remove();
};

const _exportAsXLSBasic = (
  json: any[],
  excelFileName: string,
  headers: string[]
): void => {
  const ws = XLSX.utils.json_to_sheet(json);
  XLSX.utils.sheet_add_json(ws, [headers], { skipHeader: true });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, excelFileName);
  XLSX.writeFile(wb, excelFileName + '.xls');
};

const _sortPropertyJson = (
  json: any[],
  header: Record<string, string>[]
): any[] => {
  const jsonSort: any[] = [];
  json.forEach((j) => {
    const jsonRow: any = {};
    header.forEach((h) => {
      jsonRow[h.key] = j[h.key];
    });
    jsonSort.push(jsonRow);
  });

  return jsonSort;
};

const _getHeaders = (headers: Record<string, string>[]): string[] => {
  return headers.map((h) => h.header);
};

export const getVehicleType = (t: any, item: any): string => {
  if (item.serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN) {
    return `${t(getLabelFromKey(truckType, item.truckType))} - ${t(
      getLabelFromKey(truckPayload, item.truckPayload)
    )}`;
  }

  if (item.serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK) {
    return `${t(
      getLabelFromKey(defaultContainerType, item.containerType)
    )} - ${t(getLabelFromKey(defaultContainerSize, item.containerSize))}`;
  }

  if (item.serviceType === SERVICE_TYPE.NON_MOTORIZED) {
    return `${t(getLabelFromKey(nonMotorizedType, item.nonMotorizedType))}`;
  }

  if (item.serviceType === SERVICE_TYPE.CONCATENATED_GOODS) {
    return `${t(
      getLabelFromKey(concatenatedGoodsType, item.concatenatedGoodsType)
    )}`;
  }

  if (item.serviceType === SERVICE_TYPE.CONTRACT_CAR) {
    return `${t(getLabelFromKey(contractCarType, item.contractCarType))}`;
  }

  return '';
};

export const formatDate = (field: string, format: string): string => {
  return field && format ? toTimeFormat(field, format) : '-';
};

export const getYesOrNo = (field: boolean): string => {
  return field && field === true ? 'Yes' : 'No';
};

export const formatNumber = (field: number): string => {
  return field ? field.toLocaleString() : '';
};

export const getSpecialRequests = (specialRequests: number[]): string => {
  let specialRequestText = '';
  if (!specialRequests) {
    return specialRequestText;
  }

  const size = specialRequests.length;
  specialRequests.forEach((s, index) => {
    if (+s === 1) {
      specialRequestText += `${DYNAMIC_DEFAULT_OPTION.FORKLIFT}${
        size > 1 && index + 1 < size ? '\n' : ''
      }`;
    }

    if (+s === 2) {
      specialRequestText += `${DYNAMIC_DEFAULT_OPTION.MIXED}${
        size > 1 && index + 1 < size ? '\n' : ''
      }`;
    }
  });

  return specialRequestText;
};

export const getPaymentStatus = (isPaymentDone: boolean): string => {
  return isPaymentDone ? 'Done' : 'Not Done';
};
