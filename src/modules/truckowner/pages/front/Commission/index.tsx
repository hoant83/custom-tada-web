import React from 'react';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Container } from 'react-bootstrap';
import EarningSettlementGid from '@/modules/admin-user/components/EarningSettlementGrid';
import { OrderStoreContext } from '@/modules/order/order.store';
import { observer } from 'mobx-react';

function TruckOwnerCommisson() {
  const authStore = React.useContext(AuthenticationStoreContext);
  const orderStore = React.useContext(OrderStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { COMMISSION_SETUP } = I18N;

  return (
    <WrapperTheme pageTitle={t(COMMISSION_SETUP)}>
      {authStore.loggedUser && orderStore.isEnableCommissionFeature && (
        <Container fluid>
          <EarningSettlementGid />
        </Container>
      )}
    </WrapperTheme>
  );
}

export default observer(TruckOwnerCommisson);
