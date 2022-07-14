import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { useHistory } from 'react-router-dom';
import AdminLoginForm from '@/modules/admin-user/components/LoginForm';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { LoginDto } from '@/modules/account/account.dto';
import OnePage from '@/modules/theme/components/OnePage';

const LoginAdminPage = () => {
  const history = useHistory();
  const authenticationStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_ADMIN_TITLE } = I18N;

  /*
   * Action of login button
   * @params: void
   * @return: void
   */
  const handleLogin = (values: any) => {
    const loginFormValue: LoginDto = {
      email: values.email,
      password: values.password,
    };
    authenticationStore.setLoginFormValue(loginFormValue);
    authenticationStore.login(history, ADMIN_USER_ROUTERS.ADMIN_ACCOUNT_MANAGE);
  };

  /*
   * Action of forgot password link
   * @params: void
   * @return: void
   */
  const handleForgotPassword = () => {
    history.push(ADMIN_USER_ROUTERS.ADMIN_FORGOT_PASSWORD);
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_ADMIN_TITLE)}>
        <AdminLoginForm
          handleLogin={handleLogin}
          handleForgotPassword={handleForgotPassword}
        />
      </OnePage>
    </>
  );
};

export default observer(LoginAdminPage);
