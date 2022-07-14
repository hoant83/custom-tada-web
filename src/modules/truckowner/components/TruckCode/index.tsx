import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const TruckCode = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { CUSTOMER_PARTNER_ID } = I18N;

  return (
    <>
      {authStore.loggedUser && (
        <div className="block-partner">
          <span className="label">{t(CUSTOMER_PARTNER_ID)}</span>
          <span className="value">{authStore.loggedUser?.publicId}</span>
        </div>
      )}
    </>
  );
};

export default observer(TruckCode);
