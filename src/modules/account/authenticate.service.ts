import http from '@/libs/services';
import { LoginDto } from '@/modules/account/account.dto';
import { ADMIN_API } from '@/modules/admin-user/router.enum';
import {
  NOTIFICATION_API,
  TRUCKOWNER_API,
} from '@/modules/truckowner/router.enum';
import { CUSTOMER_API } from '@/modules/customer/router.enum';
import { THEMES } from '@/theme.enum';
import { ERRORS } from '../message/message.enum';

class AuthenticateService {
  private _getPrefix = () => {
    if (process.env.REACT_APP_THEME === THEMES.ADMIN) return ADMIN_API.PREFIX;
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK)
      return CUSTOMER_API.PREFIX;

    return TRUCKOWNER_API.PREFIX;
  };

  accountPrefix: string = this._getPrefix();

  public async login(model: LoginDto, callbackOTP?: any) {
    try {
      const result = await http.post(`${this.accountPrefix}/login`, model);
      return result.data?.result;
    } catch (err: any) {
      if (
        err.response?.data?.detailError?.errorCode ===
        ERRORS.EMAIL_OR_PHONE_NOT_VERIFY
      )
        callbackOTP();
    }
  }

  public async validateToken(token: string) {
    const result = await http.post(`${this.accountPrefix}/check-token`, {
      token,
    });
    return result.data?.result;
  }

  public async validateResetToken(token: string) {
    const result = await http.post(`${this.accountPrefix}/check-reset-token`, {
      token,
    });
    return result.data?.result;
  }

  public async registerToken(token: string) {
    const result = await http.post(
      `${NOTIFICATION_API.PREFIX}/${NOTIFICATION_API.REGISTER}`,
      {
        token,
        platform: 'web',
      }
    );
    return result.data?.result;
  }

  public async validateEmailToken(token: string) {
    const commonUserPrefix = 'api/user';
    const result = await http.get(`${commonUserPrefix}/verify-email/${token}`);
    return result.data?.result;
  }

  async getSetting(type: number) {
    const commonUserPrefix = 'api/user';
    const result = await http.get(`${commonUserPrefix}/setting/${type}`);
    return result.data?.result;
  }

  async getSettings() {
    const commonUserPrefix = 'api/user';
    const result = await http.get(`${commonUserPrefix}/settings`);
    return result.data?.result;
  }

  async getSystemFiles() {
    const commonUserPrefix = 'api/user';
    const result = await http.get(`${commonUserPrefix}/system-file`);
    return result.data?.result;
  }

  public async getTrackingSettings() {
    const commonUserPrefix = 'api/user';
    const result = await http.get(`${commonUserPrefix}/license-settings`);
    return result.data?.result;
  }
}

export default new AuthenticateService();
