import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { useHistory } from 'react-router-dom';
import CustomerLoginForm from '@/modules/customer/components/LoginForm';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { LoginDto } from '@/modules/account/account.dto';
import OnePage from '@/modules/theme/components/OnePage';

const LoginCustomerPage = () => {
  const history = useHistory();
  const authenticationStore = React.useContext(AuthenticationStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_CUSTOMER_TITLE } = I18N;

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
    authenticationStore.login(history, CUSTOMER_ROUTERS.SETUP);
    customerStore.company = null;
    customerStore.employees = [];
  };

  /*
   * Action of forgot password link
   * @params: void
   * @return: void
   */
  const handleForgotPassword = () => {
    history.push(CUSTOMER_ROUTERS.FORGOT_PASSWORD);
  };

  const [userEmail, setUserEmail] = React.useState('');

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = () => {
    history.push(CUSTOMER_ROUTERS.CREATE);
  };

  const [initialValues, setInitValues] = React.useState<any>({
    email: authenticationStore?.tmpUser?.email ?? '',
    password: '',
  });

  React.useEffect(() => {
    if (authenticationStore.tmpUser) {
      setUserEmail(authenticationStore.tmpUser.email);
      setInitValues({
        email: authenticationStore?.tmpUser?.email ?? '',
        password: '',
      });
      authenticationStore.clearTmpUser();
    }
  }, [authenticationStore, authenticationStore.tmpUser]);

  return (
    <>
      <OnePage title={t(ONEPAGE_CUSTOMER_TITLE)}>
        <CustomerLoginForm
          handleLogin={handleLogin}
          handleForgotPassword={handleForgotPassword}
          handleSignUp={handleSignUp}
          userEmail={userEmail}
          initialValues={initialValues}
          isCustomerPage={true}
        />
      </OnePage>
    </>
  );
};

export default observer(LoginCustomerPage);
