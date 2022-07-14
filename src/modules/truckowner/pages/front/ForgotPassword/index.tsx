import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { useHistory } from 'react-router-dom';
import TruckOwnerForgotForm from '@/modules/truckowner/components/ForgotForm';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import OnePage from '@/modules/theme/components/OnePage';
import { THANKYOU_ACTION } from '@/modules/truckowner/truckowner.enum';
import { TRUCKOWNER_ACTION_ROUTERS } from '@/modules/truckowner/router.enum';
import { LanguageStoreContext } from '@/modules/lang/lang.store';

const ForgotTruckOwnerPage = () => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const history = useHistory();
  const languageStore = React.useContext(LanguageStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ACCOUNT_FORGOT_TITLE,
    TRUCKOWNER_FORGOT_MESSAGE,
    ONEPAGE_TRUCKOWNER_TITLE,
  } = I18N;

  /*
   * Action of forgot password button
   * @params: void
   * @return: void
   */
  const handleForgotPassword = async (values: { email: string }) => {
    // const result = await truckOwnerStore.forgotPassword(values.email);
    const result = await truckOwnerStore.forgotPassword(
      values.email,
      languageStore.activeLanguage
    );
    if (result) {
      history.push(
        TRUCKOWNER_ACTION_ROUTERS.THANKYOU + THANKYOU_ACTION.RESET_PASSWORD
      );
    }
  };

  return (
    <>
      <OnePage title={t(ONEPAGE_TRUCKOWNER_TITLE)}>
        <TruckOwnerForgotForm
          handleForgotPassword={handleForgotPassword}
          handleBack={false}
          formTitle={t(ACCOUNT_FORGOT_TITLE)}
        >
          {TRUCKOWNER_FORGOT_MESSAGE && <p>{t(TRUCKOWNER_FORGOT_MESSAGE)}</p>}
        </TruckOwnerForgotForm>
      </OnePage>
    </>
  );
};

export default observer(ForgotTruckOwnerPage);
