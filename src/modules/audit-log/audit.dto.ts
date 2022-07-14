import moment from 'moment';
import { USER_ROLE } from '../account/account.enum';

export interface AuditLogTableDto {
  id: number;
  email: string;
  createdDate: string;
  action: string;
  role: string;
  phoneNumber: string;
  content: object;
}

export interface AuditLogListDto {
  skip?: number;
  take?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  action?: string;
  module?: string;
  email?: string;
  key?: string;
  role?: USER_ROLE;
  before?: moment.Moment;
  after?: moment.Moment;
}
