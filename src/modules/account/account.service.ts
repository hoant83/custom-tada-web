import http from '@/libs/services';
import { removeConfirmationFields } from '@/libs/utils/apis.util';
import {
  CreateUserDto,
  ResetPasswordDto,
  UpdateAccountDto,
  CreateEmployeeDto,
  SetPasswordDto,
} from '@/modules/account/account.dto';
import { ADMIN_API } from '@/modules/admin-user/router.enum';
import { TRUCKOWNER_API } from '@/modules/truckowner/router.enum';
import { CUSTOMER_API } from '@/modules/customer/router.enum';
import { THEMES } from '@/theme.enum';

class AccountService {
  private _getPrefix = () => {
    if (process.env.REACT_APP_THEME === THEMES.ADMIN) return ADMIN_API.PREFIX;
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK)
      return CUSTOMER_API.PREFIX;

    return TRUCKOWNER_API.PREFIX;
  };

  accountPrefix: string = this._getPrefix();

  public async forgotPassword(email: string, lang: string) {
    const result = await http.get(
      `${this.accountPrefix}/forgot-password/${lang}?email=${email}`
    );
    return result.data?.result;
  }

  public async changePassword(id: number, model: ResetPasswordDto) {
    const result = await http.post(
      `${this.accountPrefix}/${id}/change-password`,
      model
    );
    return result.data?.result;
  }

  public async resetPassword(model: ResetPasswordDto) {
    const result = await http.post(
      `${this.accountPrefix}/reset-password`,
      model
    );
    return result.data?.result;
  }

  public async setPassword(model: SetPasswordDto) {
    const result = await http.post(`${this.accountPrefix}/set-password`, model);
    return result.data?.result;
  }

  public async register(model: CreateUserDto, lang: string) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.post(
      `${this.accountPrefix}/${lang}`,
      excludedModel
    );
    return result.data?.result;
  }

  public async addEmployee(model: CreateEmployeeDto) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.post(
      `${this.accountPrefix}/add-employee`,
      excludedModel
    );
    return result.data?.result;
  }

  public async updateAccount(id: number, model: UpdateAccountDto) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.put(`${this.accountPrefix}/${id}`, excludedModel);
    return result.data?.result;
  }

  public async changeLanguage(id: number, token: string, language: string) {
    const result = await http.put(`api/user/lang/${language}`, {
      token,
    });
    return result.data?.result;
  }
}

export default new AccountService();
