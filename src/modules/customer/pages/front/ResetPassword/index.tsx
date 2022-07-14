import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import CustomerResetForm from '@/modules/customer/components/ResetForm';
import { useHistory, useParams } from 'react-router-dom';
import { AccountStoreContext } from '@/modules/account/account.store';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import OnePage from '@/modules/theme/components/OnePage';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { ResetPasswordDto } from '@/modules/account/account.dto';

const ResetPasswordCustomerPage = () => {
  const history = useHistory();
  const { token } = useParams() as any;
  const accountStore = React.useContext(AccountStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_CUSTOMER_TITLE } = I18N;

  /*
   * Action of confirm button
   * @params: void
   * @return: void
   */
  const handleConfirm = async (values: any) => {
    const resetPasswordFormValue: ResetPasswordDto = {
      password: values.password,
      token,
    };
    await authStore.clearTmpUser();
    const result = await accountStore.resetPassword(resetPasswordFormValue);

    if (result) {
      history.push(CUSTOMER_ROUTERS.LOGIN);
    }
  };

  const callbackValidate = React.useCallback(async () => {
    return await authStore.validateResetToken(token, history);
  }, [authStore, history, token]);

  React.useEffect(() => {
    callbackValidate();
  }, [callbackValidate]);

  return (
    <>
      <OnePage title={t(ONEPAGE_CUSTOMER_TITLE)}>
        <CustomerResetForm
          handleConfirm={handleConfirm}
          userEmail={authStore.tmpUser?.email}
        />
      </OnePage>
    </>
  );
};

export default observer(ResetPasswordCustomerPage);
