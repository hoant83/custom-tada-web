import React from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

import { CommonStoreContext } from '@/libs/stores/common.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';

// Account Form
import AdminAccountSection from '@/modules/customer/components/admin/AccountSection';

const EditCustomerAdminPage = () => {
  const customerStore = React.useContext(CustomerStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  const { userId } = useParams() as any;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { CUSTOMER_EDIT_TITLE } = I18N;

  // -----------------------------
  // Account Section
  // -----------------------------

  commonStore.setActiveMenu(CUSTOMER_ROUTERS.ADMIN_MANAGE);

  React.useEffect(() => {
    customerStore.customerAdmin = null;
    customerStore.getCustomerByIdByAdmin(userId);
  }, [commonStore, customerStore, userId, commonStore.setActiveMenu]);

  React.useEffect(() => {
    if (typeof customerStore.customerAdmin?.companyId === 'number') {
      customerStore.getCompanyByAdmin(customerStore.customerAdmin?.companyId);
    }
  }, [customerStore, customerStore.customerAdmin]);

  return (
    <>
      <AdminWrapper pageTitle={t(CUSTOMER_EDIT_TITLE)}>
        <>
          <AdminAccountSection />
        </>
      </AdminWrapper>
    </>
  );
};

export default observer(EditCustomerAdminPage);
