import React from 'react';
import { observer } from 'mobx-react';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

const CreateCustomerAdminPage = () => {
  const commonStore = React.useContext(CommonStoreContext);

  React.useEffect(() => {
    commonStore.setActiveMenu(CUSTOMER_ROUTERS.ADMIN_MANAGE);
  }, [commonStore]);

  return (
    <>
      <AdminWrapper>
        <p>Create an customer</p>
      </AdminWrapper>
    </>
  );
};

export default observer(CreateCustomerAdminPage);
