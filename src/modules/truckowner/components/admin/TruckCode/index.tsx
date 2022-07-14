import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

/*
 * Props of Component
 */
interface ComponentProps {
  className?: string;
}

const TruckCode = (props: ComponentProps) => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { CUSTOMER_PARTNER_ID } = I18N;

  return (
    <>
      {truckOwnerStore.truckOwnerAdmin && (
        <div className="block-partner">
          <span className="label">{t(CUSTOMER_PARTNER_ID)}</span>
          <span className="value">
            {truckOwnerStore.truckOwnerAdmin?.publicId}
          </span>
        </div>
      )}
    </>
  );
};

export default observer(TruckCode);
