import React from 'react';
import { observer } from 'mobx-react';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import OrderTab from '@/modules/order/components/OrderTab';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

const OrderDetailPage = () => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_ID, ORDER_SUMMARY_TITLE_TOP } = I18N;

  const [currentOrderId, setCurrentOrderId] = React.useState<string>('');

  return (
    <>
      <WrapperTheme
        pageTitle={t(ORDER_SUMMARY_TITLE_TOP)}
        elementPageName={t(ORDER_ID)}
        elementPageId={currentOrderId}
      >
        <OrderTab setCurrentOrderId={setCurrentOrderId} />
      </WrapperTheme>
    </>
  );
};

export default observer(OrderDetailPage);
