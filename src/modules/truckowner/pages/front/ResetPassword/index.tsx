import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import TruckOwnerResetForm from '@/modules/truckowner/components/ResetForm';
import { ResetPasswordDto } from '@/modules/account/account.dto';
import { useHistory, useParams } from 'react-router-dom';
import { AccountStoreContext } from '@/modules/account/account.store';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';
import OnePage from '@/modules/theme/components/OnePage';

const ResetPasswordTruckOwnerPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const { token } = useParams() as any;
  const authStore = React.useContext(AuthenticationStoreContext);
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_TRUCKOWNER_TITLE } = I18N;

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
    const result = await accountStore.resetPassword(resetPasswordFormValue);
    if (result) {
      history.push(TRUCKOWNER_ROUTERS.LOGIN);
    }
  };

  React.useEffect(() => {
    authStore.validateResetToken(token, history);
  }, [authStore, history, token]);

  return (
    <>
      <OnePage title={t(ONEPAGE_TRUCKOWNER_TITLE)}>
        <TruckOwnerResetForm
          handleConfirm={handleConfirm}
          userEmail={authStore.tmpUser?.email}
        />
      </OnePage>
    </>
  );
};

export default observer(ResetPasswordTruckOwnerPage);
