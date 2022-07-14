import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminRegisterForm from '@/modules/admin-user/components/RegisterForm';
import { AccountStoreContext } from '@/modules/account/account.store';
import { CreateUserDto } from '@/modules/account/account.dto';
import { MessageStoreContext } from '@/modules/message/message.store';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageDto } from '@/modules/message/message.dto';
import Message from '@/modules/message/components/Message';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

const CreateAccountAdminPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const languageStore = React.useContext(LanguageStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ACCOUNT_THANKYOU_CREATED, ACCOUNT_CREATE_TITLE } = I18N;

  /*
   * Setting required fields of register form
   * @params: void
   * @return: json
   */
  const requiredFields = {
    email: true,
    password: true,
    confirmPassword: true,
    phone: true,
  };

  /*
   * messages from store
   */
  const keyMessage = 'admin-create';
  const messageStore = React.useContext(MessageStoreContext);

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = async (values: any) => {
    const createUserData: CreateUserDto = {
      email: values.email,
      password: values.password,
      phoneNumber: values.phone,
      accountType: values.accountType,
    };

    accountStore.setCreateUserForm(createUserData);
    const result = await accountStore.register(languageStore.activeLanguage);
    if (result) {
      accountStore.resetCreateUserForm();
      const message: MessageDto = {
        key: 'order.export',
        type: MESSAGE_TYPE.SUCCESS,
        content: t(ACCOUNT_THANKYOU_CREATED),
      };
      messageStore.setMessages([message]);
    }
  };

  return (
    <>
      <WrapperTheme pageTitle={t(ACCOUNT_CREATE_TITLE)}>
        <Message keyName={keyMessage} />
        <AdminRegisterForm
          handleRegister={handleSignUp}
          required={requiredFields}
          isCustomerPage={false}
        />
      </WrapperTheme>
    </>
  );
};

export default observer(CreateAccountAdminPage);
