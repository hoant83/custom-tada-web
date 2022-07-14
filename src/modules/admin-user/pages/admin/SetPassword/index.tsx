import React from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { AccountStoreContext } from '@/modules/account/account.store';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import OnePage from '@/modules/theme/components/OnePage';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import AdminResetForm from '@/modules/admin-user/components/ResetForm';
import { ResetPasswordDto } from '@/modules/account/account.dto';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

const SetPasswordAdminPage = () => {
  const history = useHistory();
  const { token } = useParams() as any;
  const accountStore = React.useContext(AccountStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_ADMIN_TITLE, ACCOUNT_SETPASSWORD_TITLE } = I18N;

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
      history.push(ADMIN_USER_ROUTERS.ADMIN_LOGIN);
    }
  };

  React.useEffect(() => {
    authStore.validateResetToken(token, history);
  }, [authStore, history, token]);

  return (
    <>
      <OnePage title={t(ONEPAGE_ADMIN_TITLE)}>
        <AdminResetForm
          handleConfirm={handleConfirm}
          formTitle={t(ACCOUNT_SETPASSWORD_TITLE)}
        />
      </OnePage>
    </>
  );
};

export default observer(SetPasswordAdminPage);
