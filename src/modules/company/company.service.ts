import http from '@/libs/services';
import { removeConfirmationFields } from '@/libs/utils/apis.util';
import { CompanyDto } from '@/modules/company/company.dto';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import { ADMIN_API } from '@/modules/admin-user/router.enum';
import { TRUCKOWNER_API } from '@/modules/truckowner/router.enum';
import { CUSTOMER_API } from '@/modules/customer/router.enum';
import { THEMES } from '@/theme.enum';
import { CustomerDto, CustomerListDto } from '@/modules/customer/customer.dto';

class CompanyService {
  private _getPrefix = () => {
    if (process.env.REACT_APP_THEME === THEMES.ADMIN) return ADMIN_API.PREFIX;
    if (process.env.REACT_APP_THEME === THEMES.TADATRUCK)
      return CUSTOMER_API.PREFIX;

    return TRUCKOWNER_API.PREFIX;
  };

  companyPrefix: string = this._getPrefix() + '/company';
  servicePrefix: string = this._getPrefix();

  public async createCompany(model: CompanyDto) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.post(`${this.companyPrefix}`, excludedModel);
    return result.data?.result;
  }

  public async updateCompany(model: CompanyDto) {
    const excludedModel = removeConfirmationFields(model);
    const result = await http.put(`${this.companyPrefix}`, excludedModel);
    return result.data?.result;
  }

  public async getCompany() {
    const result = await http.get(`${this.companyPrefix}`);
    return result.data?.result;
  }

  //   async requestUpdateUserInfo(id: number, model: UpdateUserInfo) {
  //     const result = await http.put(`${this.userPrefix}/${id}`, model);
  //     return result.data.result;
  //   }

  public async getEmployees(criteria: CustomerListDto) {
    const result = await http.get(
      `${this.servicePrefix}/employees/${prepareGetQuery({ ...criteria })}`
    );
    return result.data?.result;
  }

  public async addEmployee(model: CustomerDto) {
    const result = await http.post(`${this.servicePrefix}/add-employee`, model);
    return result.data?.result;
  }

  async deleteEmployee(employeeId: number) {
    const result = await http.delete(
      `${this.servicePrefix}/employee/${employeeId}`
    );
    return result.data?.result;
  }
}

export default new CompanyService();
