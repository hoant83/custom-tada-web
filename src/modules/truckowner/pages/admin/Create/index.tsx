import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';

const CreateTruckOwnerAdminPage = () => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { TRUCKOWNER_EDIT_TITLE } = I18N;

  return (
    <>
      <AdminWrapper pageTitle={t(TRUCKOWNER_EDIT_TITLE)}></AdminWrapper>
    </>
  );
};

export default observer(CreateTruckOwnerAdminPage);
