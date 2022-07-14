import React from 'react';
import { observer } from 'mobx-react';
// import { useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { NOTIFICATION_ROUTERS } from '@/modules/notification/router.enum';

const CreateNotificationAdminPage = () => {
  const commonStore = React.useContext(CommonStoreContext);

  React.useEffect(() => {
    commonStore.setActiveMenu(NOTIFICATION_ROUTERS.ADMIN_MANAGE);
  }, [commonStore]);

  return (
    <>
      <AdminWrapper>
        <p>Create Notification</p>
      </AdminWrapper>
    </>
  );
};

export default observer(CreateNotificationAdminPage);
