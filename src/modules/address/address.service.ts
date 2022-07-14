import http from '@/libs/services';
import { prepareGetQuery } from '@/libs/utils/routes.util';
import { Address, AddressPaginationRequest } from './address.dto';

class AddressService {
  prefix = 'api/addresses';

  public async list(model: AddressPaginationRequest) {
    const result = await http.get(
      `${this.prefix}${prepareGetQuery({ ...model })}`
    );
    if (result) {
      return result.data.result;
    } else {
      return [];
    }
  }

  public async create(model: Address) {
    const result = await http.post(`${this.prefix}`, model);
    return result.data.result;
  }

  public async delete(addressId: number) {
    const result = await http.delete(`${this.prefix}/${addressId}`);
    return result.data.result;
  }

  public async update(model: Address) {
    const result = await http.put(`${this.prefix}`, model);
    return result.data.result;
  }

  public async getById(id: number) {
    const result = await http.get(`${this.prefix}/${id}`);
    return result.data.result;
  }
}
export default new AddressService();
