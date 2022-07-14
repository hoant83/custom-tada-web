import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom';
import OrderThankYouContent from '@/modules/order/components/ThankYouContent';
import OrderSummary from '@/modules/order/components/Summary';
import IconThankTadaTruck from '@/libs/assets/images/icon-thank-tadatruck.png';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { OrderStoreContext } from '@/modules/order/order.store';

const ThankyouCustomerPage = () => {
  const orderStore = React.useContext(OrderStoreContext);
  const { orderID } = useParams() as any;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_THANKYOU_TITLE,
    ORDER_THANKYOU_MESSAGE,
    ORDER_THANKYOU_MOREINFO,
  } = I18N;

  React.useEffect(() => {
    orderStore.getOrderById(orderID);
  }, [orderStore, orderID]);

  return (
    <>
      <WrapperTheme>
        <OrderThankYouContent
          title={t(ORDER_THANKYOU_TITLE)}
          subTitle={t(ORDER_THANKYOU_MESSAGE)}
          iconSuccess={IconThankTadaTruck}
        >
          {ReactHtmlParser(t(ORDER_THANKYOU_MOREINFO))}
        </OrderThankYouContent>
        <OrderSummary />
      </WrapperTheme>
    </>
  );
};

export default observer(ThankyouCustomerPage);
