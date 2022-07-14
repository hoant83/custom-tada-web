import { MESSAGE_TYPE } from '@/modules/message/message.enum';

export interface MessageDto {
  key: string;
  type: MESSAGE_TYPE;
  content: string;
}

export interface ErrorDto {
  key: string;
  label: string;
}
