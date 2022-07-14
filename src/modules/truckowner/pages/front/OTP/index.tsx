import { I18N } from '@/modules/lang/i18n.enum';
import OnePage from '@/modules/theme/components/OnePage';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TruckOwnerRegisterOTPForm from '../../../components/RegisterOTPForm/index';

const TruckOwnerRegisterOTPPage = () => {
  const { t } = useTranslation();
  const { ONEPAGE_TRUCKOWNER_TITLE } = I18N;
  return (
    <OnePage
      className="verify-truckowner-otp-page"
      title={t(ONEPAGE_TRUCKOWNER_TITLE)}
    >
      <TruckOwnerRegisterOTPForm />
    </OnePage>
  );
};

export default observer(TruckOwnerRegisterOTPPage);
