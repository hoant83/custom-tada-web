import http from '@/libs/services';
import { LoginDto } from '@/modules/account/account.dto';

class AuthenticateService {
  prefix: string = 'api/truck-owner';

  public async login(model: LoginDto) {
    const result = await http.post(`${this.prefix}/login`, model);
    return result.data.result;
  }

  public async validateToken(token: string) {
    const result = await http.post(`${this.prefix}/check-token`, { token });
    return result.data.result;
  }
}

export default new AuthenticateService();
