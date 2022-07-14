import Loading from '@/libs/components/Loading';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { observer } from 'mobx-react';
import React from 'react';
import { Container } from 'react-bootstrap';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { useTranslation } from 'react-i18next';
import CommissionGeneralSetup from '@/modules/admin-user/components/CommissionGeneralSetup';
import EarningSettlementGid from '@/modules/admin-user/components/EarningSettlementGrid';

const CommissionSettings = () => {
  const { t } = useTranslation();
  const { COMMISSION_SETUP } = I18N;

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper pageTitle={t(COMMISSION_SETUP)}>
          <Container fluid>
            <CommissionGeneralSetup />

            <EarningSettlementGid />
          </Container>
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(CommissionSettings);
