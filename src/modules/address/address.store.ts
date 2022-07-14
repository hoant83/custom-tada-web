import { Address, AddressPaginationRequest } from './address.dto';
import { action, observable } from 'mobx';
import addressService from './address.service';
import React from 'react';
import { LOCATION_TYPE } from '@/libs/constants/location-type.constant';

export default class AddressStore {
  @observable addresses: Address[];
  @observable totalCount: number;
  @observable pickupAddresses: Address[];
  @observable totalPickupCount: number;
  @observable dropoffAddresses: Address[];
  @observable totalDropoffCount: number;

  @observable currentAddress: Address;
  @observable isLoading: boolean = false;

  initModel: Address = {
    company: '',
    locationType: 'pickup',
    locationName: '',
    locationAddress: '',
    inChargeName: '',
    inChargeNo: '',
    pickupAddress: [],
    pickupAddressText: '',
    dropoffAddress: [],
    pickupCity: '',
    dropoffAddressText: '',
  };

  constructor() {
    this.addresses = [];
    this.totalCount = 0;
    this.currentAddress = this.initModel;
    this.pickupAddresses = [];
    this.totalPickupCount = 0;
    this.dropoffAddresses = [];
    this.totalDropoffCount = 0;
  }

  @action
  setAddresses(data: Address[]) {
    this.addresses = data;
  }

  @action
  async setTotalCount(count: any) {
    this.totalCount = count;
  }

  @action
  setPickupAddresses(data: Address[]) {
    this.pickupAddresses = data;
  }

  @action
  async setPickupTotalCount(count: any) {
    this.totalCount = count;
  }

  @action
  setDropoffAddresses(data: Address[]) {
    this.dropoffAddresses = data;
  }

  @action
  async setDropoffTotalCount(count: any) {
    this.totalCount = count;
  }

  @action
  async list(model: AddressPaginationRequest) {
    const { data, count } = await addressService.list(model);
    this.setAddresses(data);
    this.setTotalCount(count);
  }

  @action
  async addressBookList(model: AddressPaginationRequest) {
    const { data, count } = await addressService.list(model);
    if (model.locationType === LOCATION_TYPE.PICKUP) {
      this.setPickupAddresses(data);
      this.setPickupTotalCount(count);
    }
    if (model.locationType === LOCATION_TYPE.DROPOFF) {
      this.setDropoffAddresses(data);
      this.setDropoffTotalCount(count);
    }
  }

  @action
  async create(model: Address) {
    return await addressService.create(model);
  }

  @action
  async delete(addressId: number) {
    return await addressService.delete(addressId);
  }

  @action
  async update(model: Address) {
    return await addressService.update(model);
  }

  @action
  public setLoadingStatus(status: boolean) {
    this.isLoading = status;
  }

  @action
  async getById(id: number) {
    const data = await addressService.getById(id);
    this.currentAddress = data;
    return data;
  }
}

export const AddressStoreContext = React.createContext(new AddressStore());
