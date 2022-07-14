import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { useHistory } from 'react-router-dom';
import TruckOwnerLoginForm from '@/modules/truckowner/components/LoginForm';
import {
  TRUCKOWNER_ACTION_ROUTERS,
  TRUCKOWNER_ROUTERS,
} from '@/modules/truckowner/router.enum';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { LoginDto } from '@/modules/account/account.dto';
import OnePage from '@/modules/theme/components/OnePage';
import { PHONE_REGEXP } from '@/libs/constants/rules.constants';

const LoginTruckOwnerPage = () => {
  const history = useHistory();
  const authenticationStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_TRUCKOWNER_TITLE } = I18N;

  /*
   * Action of login button
   * @params: void
   * @return: void
   */
  const handleLogin = (values: any) => {
    const loginFormValue: LoginDto = {
      // Truck owner login using email or phonenumber
      email: values.email,
      phoneNumber: values.email,
      password: values.password,
    };

    if (PHONE_REGEXP.test(values.email)) {
      delete loginFormValue.email;
    } else {
      delete loginFormValue.phoneNumber;
    }

    authenticationStore.setLoginFormValue(loginFormValue);
    authenticationStore.login(history, TRUCKOWNER_ROUTERS.SETUP, () => {
      if (PHONE_REGEXP.test(values.email))
        history.push(
          TRUCKOWNER_ACTION_ROUTERS.VERIFY_OTP + loginFormValue.phoneNumber
        );
    });
    truckOwnerStore.company = null;
  };

  /*
   * Action of forgot password link
   * @params: void
   * @return: void
   */
  const handleForgotPassword = () => {
    history.push(TRUCKOWNER_ROUTERS.FORGOT_PASSWORD);
  };

  const [userEmail, setUserEmail] = React.useState('');

  const [initialValues, setInitValues] = React.useState<any>({
    email: authenticationStore?.tmpUser?.email ?? '',
    password: '',
  });

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = () => {
    history.push(TRUCKOWNER_ROUTERS.CREATE);
  };

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
      <OnePage title={t(ONEPAGE_TRUCKOWNER_TITLE)}>
        <TruckOwnerLoginForm
          handleLogin={handleLogin}
          handleForgotPassword={handleForgotPassword}
          handleSignUp={handleSignUp}
          initialValues={initialValues}
          userEmail={userEmail}
          isTruckOwnerPage={true}
        />
      </OnePage>
    </>
  );
};

export default observer(LoginTruckOwnerPage);
