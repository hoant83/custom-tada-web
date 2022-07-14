import React from 'react';
import { observer } from 'mobx-react';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import PendingOrderPage from '@/modules/order/pages/front/PendingOrder';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

const WrapperPendingOrderPage = () => {
  const { t } = useTranslation();
  const { ORDER_MANAGE_TITLE } = I18N;

  return (
    <>
      <WrapperTheme pageTitle={t(ORDER_MANAGE_TITLE)}>
        <PendingOrderPage />
      </WrapperTheme>
    </>
  );
};

export default observer(WrapperPendingOrderPage);
