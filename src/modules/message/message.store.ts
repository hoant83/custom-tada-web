import { observable, action } from 'mobx';
import { createContext } from 'react';
import { MessageDto } from '@/modules/message/message.dto';

export default class MessageStore {
  @observable messages: MessageDto[] = [];

  /*
   * Get messages
   *
   * @param void
   * @return MessageDto[]
   */
  @action
  public async getMessages() {
    return this.messages;
  }

  /*
   * Set data to messages
   *
   * @param MessageDto[] data
   * @return void
   */
  @action
  public async setMessages(data: MessageDto[]) {
    this.messages = data;
  }

  /*
   * Remove message by key
   *
   * @param string key
   * @return void
   */
  @action
  public async removeMessage(key: string) {
    this.setMessages([...this.messages.filter((item) => item.key !== key)]);
  }
}

export const MessageStoreContext = createContext(new MessageStore());
