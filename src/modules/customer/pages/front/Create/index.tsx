import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import CustomerRegisterForm from '@/modules/customer/components/RegisterForm';
import { AccountStoreContext } from '@/modules/account/account.store';
import { useHistory } from 'react-router-dom';
import { CUSTOMER_ACTION_ROUTERS } from '@/modules/customer/router.enum';
import { CreateUserDto } from '@/modules/account/account.dto';
import { THANKYOU_ACTION } from '@/modules/customer/customer.enum';
import OnePage from '@/modules/theme/components/OnePage';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
const CreateCustomerPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const history = useHistory();
  const languageStore = React.useContext(LanguageStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_CUSTOMER_TITLE } = I18N;

  /*
   * Setting required fields of register form
   * @params: void
   * @return: json
   */
  const requiredFields = {
    email: true,
    password: true,
    confirmPassword: true,
    phone: false,
    accountType: true,
  };

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = async (values: any) => {
    const createUserData: CreateUserDto = {
      email: values.email.trim(),
      password: values.password,
      phoneNumber: values.phone,
      accountType: values.accountType,
    };

    accountStore.setCreateUserForm(createUserData);
    const result = await accountStore.register(languageStore.activeLanguage);
    if (result) {
      accountStore.resetCreateUserForm();
      history.push(CUSTOMER_ACTION_ROUTERS.THANKYOU + THANKYOU_ACTION.REGISTER);
    }
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_CUSTOMER_TITLE)}>
        <CustomerRegisterForm
          handleRegister={handleSignUp}
          required={requiredFields}
          isCustomerPage={true}
        />
      </OnePage>
    </>
  );
};

export default observer(CreateCustomerPage);
