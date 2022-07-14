import React from 'react';
import { observer } from 'mobx-react';
import CustomerResetForm from '@/modules/customer/components/ResetForm';
import { useHistory, useParams } from 'react-router-dom';
import { AccountStoreContext } from '@/modules/account/account.store';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import OnePage from '@/modules/theme/components/OnePage';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { SetPasswordDto } from '@/modules/account/account.dto';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

const SetPasswordCustomerPage = () => {
  const history = useHistory();
  const { token } = useParams() as any;
  const accountStore = React.useContext(AccountStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ACCOUNT_SETPASSWORD_TITLE, ONEPAGE_CUSTOMER_TITLE } = I18N;

  /*
   * Action of confirm button
   * @params: void
   * @return: void
   */
  const handleConfirm = async (values: any) => {
    const setPasswordFormValue: SetPasswordDto = {
      password: values.password,
      token,
    };

    const result = await accountStore.setPassword(setPasswordFormValue);

    if (result) {
      history.push(CUSTOMER_ROUTERS.LOGIN);
    }
  };

  React.useEffect(() => {
    authStore.validateResetToken(token, history);
  }, [authStore, history, token]);

  return (
    <>
      <OnePage title={t(ONEPAGE_CUSTOMER_TITLE)}>
        <CustomerResetForm
          handleConfirm={handleConfirm}
          formTitle={t(ACCOUNT_SETPASSWORD_TITLE)}
        />
      </OnePage>
    </>
  );
};

export default observer(SetPasswordCustomerPage);
