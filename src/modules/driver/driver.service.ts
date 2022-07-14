import http from '@/libs/services';
// import { OrderRequestDto, OrderListDto } from '@/modules/order/order.dto';
import { DRIVER_API } from '@/modules/driver/router.enum';
// import { prepareGetQuery } from '@/libs/utils/routes.util';
// import { NewDriverDto } from '@/modules/driver/driver.dto';

class DriverService {
  prefix: string = DRIVER_API.PREFIX;
  truckOwnerPrefix: string = DRIVER_API.TRUCKOWNER_PREFIX;
  adminPrefix: string = DRIVER_API.ADMIN_PREFIX;

  public async getDriversByTruckOwner(id: number) {
    const result = await http.get(`${this.truckOwnerPrefix}/${id}`);
    return result.data.result;
  }

  public async deleteDriverFile(id: number, type: number) {
    const result = await http.delete(`${this.prefix}/files/${id}/${type}`);
    return result.data?.result;
  }

  public async uploadDriverCardFront(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-card-front`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadDriverCardBack(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-card-back`,
      form,
      config
    );
    return result.data?.result;
  }

  public async uploadDriverLicenseCard(data: any, id: number) {
    const form = new FormData();
    form.append('image', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const result = await http.post(
      `${this.prefix}/${id}/upload-license-card`,
      form,
      config
    );
    return result.data?.result;
  }

  // public async adminUpdateUser(model: NewDriverDto, id: number) {
  //   const result = await http.put(`${this.adminPrefix}/${id}`, model);
  //   return result.data.result;
  // }

  //   public async createOrder(model: OrderRequestDto) {
  //     const result = await http.post(`${this.orderPrefix}`, model);
  //     return result.data?.result;
  //   }

  //   public async getOrderListByCustomer(criteria: OrderListDto) {
  //     return await http.get(
  //       `${this.orderCustomerPrefix}${prepareGetQuery({ ...criteria })}`
  //     );
  //   }

  //   public async createOrderByCustomer(model: OrderRequestDto) {
  //     const result = await http.post(`${this.orderCustomerPrefix}`, model);
  //     return result.data?.result;
  //   }

  //   public async getOrderListByAdmin(criteria: OrderListDto) {
  //     return await http.get(
  //       `${this.orderAdminPrefix}${prepareGetQuery({ ...criteria })}`
  //     );
  //   }

  //   public async createOrderByAdmin(model: OrderRequestDto) {
  //     const result = await http.post(`${this.orderAdminPrefix}`, model);
  //     return result.data?.result;
  //   }

  //   public async updateOrder(model: OrderRequestDto, id: number) {
  //     const result = await http.put(`${this.orderPrefix}/${id}`, model);
  //     return result.data?.result;
  //   }
}

export default new DriverService();
