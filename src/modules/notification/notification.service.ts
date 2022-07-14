import { SendSms } from '@/libs/dto/SendSms.dto';
import http from '@/libs/services';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import {
  NewNotificationDto,
  NotificationListDto,
} from '@/modules/notification/notification.store';
import { SmsSettingDto } from './notification.store';

class NotificationService {
  prefix = 'api/notification';
  smsPrefix = 'api/sms';
  public async getList(filter: Record<string, any>) {
    const result = await http.get(
      `${this.prefix}${prepareGetQuery({ ...filter })}`
    );
    return result?.data?.result;
  }

  public async getNotifications(criteria: NotificationListDto) {
    return await http.get(
      `${this.prefix}/all${prepareGetQuery({ ...criteria })}`
    );
  }

  public async getNoti(id: number) {
    const result = await http.get(`${this.prefix}/${id}`);
    return result.data.result;
  }

  public async setRead(id: number) {
    const result = await http.put(`${this.prefix}/read/${id}`);
    return result.data.result;
  }

  public async setStopWarning() {
    const result = await http.put(`${this.prefix}/stop-warning`);
    return result.data.result;
  }

  public async addNotification(model: NewNotificationDto) {
    const result = await http.post(`${this.prefix}`, model);
    return result.data?.result;
  }

  public async getSmsSetting() {
    const result = await http.get(`${this.smsPrefix}`);
    return result.data?.result;
  }

  public async updateSmsSetting(model: SmsSettingDto) {
    return await http.post(`${this.smsPrefix}`, model);
  }

  public async sendManualSMS(model: SendSms) {
    const result = await http.post(`${this.prefix}/send/sms`, model);
    return result.data?.result;
  }
}

export default new NotificationService();
