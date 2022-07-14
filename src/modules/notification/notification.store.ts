import { action, observable } from 'mobx';
import { createContext } from 'react';
import notificationService from './notification.service';
import { newNotificationFormInit } from '@/modules/notification/notification.constants';
import { SendSms } from '@/libs/dto/SendSms.dto';

export interface NotificationDto {
  title: string;
  body: string;
  titleEN?: string;
  bodyEN?: string;
  titleKR?: string;
  bodyKR?: string;
  titleID?: string;
  bodyID?: string;
  source: string;
}

export interface SmsSettingDto {
  orderAccepted: boolean;
  orderComplete: boolean;
  orderCancelled: boolean;
  totalAcceptedSms: number;
  totalCancelledSms: number;
  driverPickingUp: number;
  driverDelivering: number;
}

export interface NotificationInstanceDto {
  id: number;
  createdDate: string;
  notification: NotificationDto;
  isRead: boolean;
}

export interface NotificationTableDto {
  id: number;
  createdDate: string;
  title: string;
  body: string;
  titleEN?: string;
  bodyEN?: string;
  source: string;
  sendToCustomer: boolean;
  sendToTruck: boolean;
  sendToDriver: boolean;
  createdByEmail?: string;
}

export interface NewNotificationDto {
  title: string;
  body: string;
  sendToCustomer: boolean;
  sendToTruckOwner: boolean;
  sendToDriver: boolean;
}

export interface NotificationListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  searchBy?: string;
  searchKeyword?: string;
}

export default class NotificationStore {
  @observable notificationForm: NewNotificationDto = newNotificationFormInit;
  @observable notificationsTableList: NotificationTableDto[] = [];
  @observable totalCount: number = 0;
  @observable selectedNoti: any = null;

  @observable
  unreadCount: number = 0;

  @observable
  notifications: NotificationInstanceDto[] = [];

  @observable
  currentTake: number = 5;

  @observable
  total: number = 0;

  @observable
  smsSetting: any;

  @action
  async getNotiList() {
    const result = await notificationService.getList({
      skip: 0,
      take: this.currentTake,
    });
    this.notifications = result[0];
    this.total = result[1];
    this.unreadCount = result[2];
  }

  @action
  async setRead(id: number) {
    await notificationService.setRead(id);
    this.getNotiList();
  }

  @action
  async setStopWarning() {
    await notificationService.setStopWarning();
    this.getNotiList();
  }

  @action
  async setNotificationForm(data: any) {
    this.notificationForm.title = data.title;
    this.notificationForm.body = data.body;
    this.notificationForm.sendToCustomer = data.sendToCustomer;
    this.notificationForm.sendToTruckOwner = data.sendToTruckOwner;
    this.notificationForm.sendToDriver = data.sendToDriver;
  }

  @action
  async resetMotificationForm() {
    this.notificationForm = newNotificationFormInit;
  }

  @action
  async addNotification() {
    const data = await notificationService.addNotification(
      this.notificationForm
    );
    return data;
  }

  // getNotifications()
  // Get notification for grid
  // Notice: this isn't a function for button notification on top bar

  @action
  async getNotifications(criteria: NotificationListDto) {
    const result = await notificationService.getNotifications(criteria);
    if (result) {
      this.notificationsTableList = result.data?.result[0];
      this.totalCount = result.data?.result[1];
    }
  }

  @action
  async getNoti(id: number) {
    const result = await notificationService.getNoti(id);
    if (result) {
      this.selectedNoti = result;
      return result;
    }
  }

  getNotiSchedule() {
    this.getNotiList();
    setInterval(() => this.getNotiList(), 60000);
  }

  @action
  async getSmsSetting() {
    const result = await notificationService.getSmsSetting();
    this.smsSetting = result;
    return result;
  }

  @action
  async updateSmsSetting(model: SmsSettingDto) {
    await notificationService.updateSmsSetting(model);
  }

  @action
  async sendManualSMS(model: SendSms) {
    return await notificationService.sendManualSMS(model);
  }
}

export const NotificationStoreContext = createContext(new NotificationStore());
