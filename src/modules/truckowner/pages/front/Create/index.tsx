import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { useHistory } from 'react-router-dom';
import { AccountStoreContext } from '@/modules/account/account.store';
import { CreateUserDto } from '@/modules/account/account.dto';
import {
  TRUCKOWNER_ACTION_ROUTERS,
  TRUCKOWNER_ROUTERS,
} from '@/modules/truckowner/router.enum';
import { THANKYOU_ACTION } from '@/modules/truckowner/truckowner.enum';
import TruckOwnerRegisterForm from '@/modules/truckowner/components/RegisterForm';
import OnePage from '@/modules/theme/components/OnePage';
import { LanguageStoreContext } from '@/modules/lang/lang.store';
import { THEMES } from '@/theme.enum';

const CreateTruckOwnerPage = () => {
  const accountStore = React.useContext(AccountStoreContext);
  const history = useHistory();
  const languageStore = React.useContext(LanguageStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ONEPAGE_TRUCKOWNER_TITLE } = I18N;

  /*
   * Action of Sign up button
   * @params: void
   * @return: void
   */
  const handleSignUp = async (values: any) => {
    const createUserData: CreateUserDto =
      process.env.REACT_APP_THEME === THEMES.TADATRUCK
        ? {
            email: values.email.trim(),
            password: values.password,
            phoneNumber: values.phone,
            accountType: values.accountType,
          }
        : {
            email: values.email.trim(),
            password: values.password,
            phoneNumber: values.phone,
            referalCode: values.referalCode,
          };

    accountStore.setCreateUserForm(createUserData);
    const result = await accountStore.register(languageStore.activeLanguage);
    if (result) {
      accountStore.resetCreateUserForm();
      history.push(TRUCKOWNER_ACTION_ROUTERS.VERIFY_OTP + values.phone);
      // history.push(
      //   TRUCKOWNER_ACTION_ROUTERS.THANKYOU + THANKYOU_ACTION.REGISTER
      // );
    }
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_TRUCKOWNER_TITLE)}>
        <TruckOwnerRegisterForm
          handleRegister={handleSignUp}
          required={{
            email: true,
            password: true,
            confirmPassword: true,
            phone: true,
          }}
          isCustomerPage={false}
        />
      </OnePage>
    </>
  );
};

export default observer(CreateTruckOwnerPage);
