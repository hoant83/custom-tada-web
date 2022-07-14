import { paymentTypes } from '@/modules/customer/customer.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Row } from 'react-bootstrap';
import {
  isAdmin,
  isTruckOwner,
  OrderStatus,
  OrderStatusFilter,
} from '../../order.constants';
import { DropdownSelectSearch } from '../DropdownSelectSearch';
import { DropdownTextSearch } from '../DropdownTextSearch';
import { DropdownTimeRangeSearch } from '../DropdownTimeRangeSearch';
import './index.scss';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { customerAccountTypeFilterOptions } from '@/modules/customer/customer.constants';

interface ComponentProps {
  orderId: string;
  setOrderId: (value: string) => void;
  referenceNo: string;

  setReferenceNo: (value: string) => void;
  status: any[];

  setStatus: (value: any[]) => void;

  paymentType: any[];
  setPaymentType: (value: any[]) => void;
  createdFrom: string;
  setCreatedFrom: (value: string) => void;

  createdTo: string;
  setCreatedTo: (value: string) => void;

  pickupFrom: string;
  setPickupFrom: (value: string) => void;

  pickupTo: string;
  setPickupTo: (value: string) => void;

  pickupAddress: string;
  setPickupAddress: (value: string) => void;

  dropoffFrom: string;
  setDropoffFrom: (value: string) => void;

  dropoffTo: string;
  setDropoffTo: (value: string) => void;

  dropoffAddress: string;
  setDropoffAddress: (value: string) => void;
  orderManagerName: string;
  setOrderManagerName: (value: string) => void;

  customerName?: string;
  setCustomerName?: (value: string) => void;

  truckOwnerName: string;
  setTruckOwnerName: (value: string) => void;

  truckOwnerPartnerId: string;
  setTruckOwnerPartnerId: (value: string) => void;

  handleKeyPress: (e: any) => void;
  handleSearch: () => void;
  selectAllStatus: () => void;

  deselectAllStatus: () => void;

  selectAllPaymentType: () => void;

  deselectAllPaymentType: () => void;

  resetFilters: () => void;

  accountType?: any[];
  setAccountType?: (values: number[]) => void;
  selectAllAccountType?: any;
  deselectAllAccountType?: any;
}

const Component = (props: ComponentProps) => {
  const {
    orderId,
    setOrderId,
    referenceNo,
    setReferenceNo,
    status,
    setStatus,
    accountType,
    setAccountType,
    paymentType,
    setPaymentType,
    createdFrom,
    setCreatedFrom,
    createdTo,
    setCreatedTo,
    pickupFrom,
    setPickupFrom,
    pickupTo,
    setPickupTo,
    pickupAddress,
    setPickupAddress,
    dropoffFrom,
    setDropoffFrom,
    dropoffTo,
    setDropoffTo,
    dropoffAddress,
    setDropoffAddress,
    orderManagerName,
    setOrderManagerName,
    customerName,
    setCustomerName,
    truckOwnerName,
    setTruckOwnerName,
    truckOwnerPartnerId,
    setTruckOwnerPartnerId,
    handleKeyPress,
    handleSearch,
    selectAllStatus,
    deselectAllStatus,
    selectAllPaymentType,
    deselectAllPaymentType,
    resetFilters,
    selectAllAccountType,
    deselectAllAccountType,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_REFERENCE_NO,
    ORDER_STATUS_LABEL,
    ORDER_PAYMENT_TYPE,
    ORDER_CREATED_DATE,
    ORDER_PICKUP_TIME,
    ORDER_PICKUP_ADDRESS,
    ORDER_DROPOFF_TIME,
    ORDER_DROPOFF_ADDRESS,
    JOB_CUSTOMER_NAME,
    CUSTOMER_PARTNER_ID,
    ORDER_TRUCKOWNER_NAME,
    CUSTOMER_NEW_TYPE_LABEL,
    ORDER_ID,
    ORDER_MANAGER_NAME_NO,
    BUTTONS_RESET_FILTER,
  } = I18N;

  return (
    <>
      <Row className="mb-1 col-12">
        <DropdownTextSearch
          title={t(ORDER_ID)}
          value={orderId}
          handleValueChange={setOrderId}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        <DropdownTextSearch
          title={t(ORDER_REFERENCE_NO)}
          value={referenceNo}
          handleValueChange={setReferenceNo}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        <DropdownSelectSearch
          value={status}
          title={t(ORDER_STATUS_LABEL)}
          handleValueChange={setStatus}
          options={
            isTruckOwner
              ? OrderStatus
              : isAdmin
              ? OrderStatus
              : OrderStatusFilter.filter((u) => u.isCustomer)
          }
          selectAll={selectAllStatus}
          deselectAll={deselectAllStatus}
        />

        <DropdownSelectSearch
          value={paymentType}
          title={t(ORDER_PAYMENT_TYPE)}
          handleValueChange={setPaymentType}
          options={paymentTypes}
          selectAll={selectAllPaymentType}
          deselectAll={deselectAllPaymentType}
        />
        <DropdownTimeRangeSearch
          title={t(ORDER_CREATED_DATE)}
          valueFrom={createdFrom}
          valueTo={createdTo}
          handleValueFromChange={setCreatedFrom}
          handleValueToChange={setCreatedTo}
        />
        <DropdownTimeRangeSearch
          title={t(ORDER_PICKUP_TIME)}
          valueFrom={pickupFrom}
          valueTo={pickupTo}
          handleValueFromChange={setPickupFrom}
          handleValueToChange={setPickupTo}
        />
        <DropdownTextSearch
          title={t(ORDER_PICKUP_ADDRESS)}
          value={pickupAddress}
          handleValueChange={setPickupAddress}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        <DropdownTimeRangeSearch
          title={t(ORDER_DROPOFF_TIME)}
          valueFrom={dropoffFrom}
          valueTo={dropoffTo}
          handleValueFromChange={setDropoffFrom}
          handleValueToChange={setDropoffTo}
        />

        <DropdownTextSearch
          title={t(ORDER_DROPOFF_ADDRESS)}
          value={dropoffAddress}
          handleValueChange={setDropoffAddress}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        <DropdownTextSearch
          title={t(ORDER_MANAGER_NAME_NO)}
          value={orderManagerName}
          handleValueChange={setOrderManagerName}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        {customerName && setCustomerName && (
          <DropdownTextSearch
            title={t(JOB_CUSTOMER_NAME)}
            value={customerName}
            handleValueChange={setCustomerName}
            handleKeyboardPress={handleKeyPress}
            handleSearch={handleSearch}
          />
        )}

        <DropdownTextSearch
          title={t(CUSTOMER_PARTNER_ID)}
          value={truckOwnerPartnerId}
          handleValueChange={setTruckOwnerPartnerId}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        <DropdownTextSearch
          title={t(ORDER_TRUCKOWNER_NAME)}
          value={truckOwnerName}
          handleValueChange={setTruckOwnerName}
          handleKeyboardPress={handleKeyPress}
          handleSearch={handleSearch}
        />
        {accountType && setAccountType && (
          <DropdownSelectSearch
            value={accountType}
            title={t(CUSTOMER_NEW_TYPE_LABEL)}
            handleValueChange={setAccountType}
            options={customerAccountTypeFilterOptions}
            selectAll={selectAllAccountType}
            deselectAll={deselectAllAccountType}
          />
        )}

        <button
          className="Reset-filter filter-btn btn btn-primary"
          onClick={resetFilters}
        >
          {t(BUTTONS_RESET_FILTER)}
        </button>
      </Row>
    </>
  );
};

export const FilterBar = observer(Component);
