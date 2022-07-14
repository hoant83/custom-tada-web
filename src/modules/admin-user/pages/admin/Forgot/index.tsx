import React from 'react';
import { observer } from 'mobx-react';
import AdminForgotForm from '@/modules/admin-user/components/ForgotForm';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { AccountStoreContext } from '@/modules/account/account.store';
import { MessageStoreContext } from '@/modules/message/message.store';
import Message from '@/modules/message/components/Message';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageDto } from '@/modules/message/message.dto';
import OnePage from '@/modules/theme/components/OnePage';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

const ForgotAdminPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const languageStore = React.useContext(LanguageStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ONEPAGE_ADMIN_TITLE,
    ACCOUNT_FORGOT_TITLE,
    ADMIN_MENU_FORGOT_MESSAGE,
    MESSAGES_FORGOT_SUCCESS,
  } = I18N;

  /*
   * messages from store
   */
  const keyMessage = 'forgot-password';
  const messageStore = React.useContext(MessageStoreContext);

  /*
   * Action of forgot password button
   * @params: void
   * @return: void
   */
  const handleForgotPassword = async (values: any) => {
    const result = await accountStore.forgotPassword(
      values.email,
      languageStore.activeLanguage
    );
    if (result) {
      const message: MessageDto = {
        key: keyMessage,
        type: MESSAGE_TYPE.SUCCESS,
        content: t(MESSAGES_FORGOT_SUCCESS),
      };
      messageStore.setMessages([message]);
    }
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_ADMIN_TITLE)}>
        <Message keyName={keyMessage} />
        <AdminForgotForm
          handleForgotPassword={handleForgotPassword}
          handleBack={false}
          formTitle={t(ACCOUNT_FORGOT_TITLE)}
        >
          {ADMIN_MENU_FORGOT_MESSAGE && <p>{t(ADMIN_MENU_FORGOT_MESSAGE)}</p>}
        </AdminForgotForm>
      </OnePage>
    </>
  );
};

export default observer(ForgotAdminPage);
