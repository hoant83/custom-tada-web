import React from 'react';
import { observer } from 'mobx-react';
import CustomerForgotForm from '@/modules/customer/components/ForgotForm';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import OnePage from '@/modules/theme/components/OnePage';
import { useHistory } from 'react-router-dom';
import { AccountStoreContext } from '@/modules/account/account.store';
import { THANKYOU_ACTION } from '@/modules/customer/customer.enum';
import { CUSTOMER_ACTION_ROUTERS } from '@/modules/customer/router.enum';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
const ForgotCustomerPage = () => {
  const history = useHistory();
  const accountStore = React.useContext(AccountStoreContext);
  const languageStore = React.useContext(LanguageStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ACCOUNT_FORGOT_TITLE,
    CUSTOMER_FORGOT_MESSAGE,
    ONEPAGE_CUSTOMER_TITLE,
  } = I18N;

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
      history.push(
        CUSTOMER_ACTION_ROUTERS.THANKYOU + THANKYOU_ACTION.RESET_PASSWORD
      );
    }
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_CUSTOMER_TITLE)}>
        <CustomerForgotForm
          handleForgotPassword={handleForgotPassword}
          handleBack={false}
          formTitle={t(ACCOUNT_FORGOT_TITLE)}
        >
          {CUSTOMER_FORGOT_MESSAGE && <p>{t(CUSTOMER_FORGOT_MESSAGE)}</p>}
        </CustomerForgotForm>
      </OnePage>
    </>
  );
};

export default observer(ForgotCustomerPage);
