import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import AdminOrderTab from '@/modules/order/components/admin/OrderTab';

const AdminOrderDetailPage = () => {
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_ID, ORDER_SUMMARY_TITLE_TOP } = I18N;

  const [currentOrderId, setCurrentOrderId] = React.useState<string>('');

  return (
    <>
      <AdminWrapper
        pageTitle={t(ORDER_SUMMARY_TITLE_TOP)}
        elementPageName={t(ORDER_ID)}
        elementPageId={currentOrderId}
      >
        <AdminOrderTab setCurrentOrderId={setCurrentOrderId} />
      </AdminWrapper>
    </>
  );
};

export default observer(AdminOrderDetailPage);
