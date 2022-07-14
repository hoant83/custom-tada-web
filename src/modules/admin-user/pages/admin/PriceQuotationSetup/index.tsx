import Loading from '@/libs/components/Loading';
import adminService from '@/modules/admin-user/admin.service';
import PriceQuotationSetupGrid from '@/modules/admin-user/components/PriceQuotationSetupGrid';
import { ADMIN_USER_ROUTERS } from '@/modules/admin-user/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const PriceQuotationSetup = () => {
  const { t } = useTranslation();
  const { PRICE_QUOTATION_TITLE } = I18N;
  const history = useHistory();
  const location: any = useLocation();

  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    if (location.state?.data?.id) {
      loadDataById(location.state?.data?.id);
    }
  }, []);

  const loadDataById = async (id: number) => {
    const data = await adminService.getPriceQuotationById(id);
    if (data.data?.result) {
      setData(data.data?.result);
    }
  };

  const handleSave = async (
    columns: any,
    rows: any,
    note: string,
    currency: string
  ) => {
    let id = null;
    let name = '';
    let toCustomers = [];
    let toAllCustomers = true;
    if (location.state?.data) {
      const data = location.state?.data;
      id = data.id;
      name = data.name;
      toCustomers = data.toCustomers.map((item: any) => item.value);
      toAllCustomers = toCustomers.length === 0;
    }
    if (id) {
      const result: any = await adminService.updatePriceQuotaion({
        id,
        name,
        toAllCustomers,
        quotation: {
          columns,
          rows,
        },
        note,
        toCustomers,
        currency,
      });
      if (result.data?.success) {
        toast.dismiss();
        toast.success('Update price quotation success');
        history.push(ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP);
      } else {
        toast.dismiss();
        toast.error('Update price quotation fail');
      }
    } else {
      const result: any = await adminService.createPriceQuotaion({
        name,
        toAllCustomers,
        quotation: {
          columns,
          rows,
        },
        note,
        toCustomers,
      });
      if (result.data?.success) {
        toast.dismiss();
        toast.success('Add price quotation success');
        history.push(ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP);
      } else {
        toast.dismiss();
        toast.error('Add price quotation fail');
      }
    }
  };

  const handleClose = () => {
    history.push(ADMIN_USER_ROUTERS.ADMIN_PRICE_QUOTATION_SETUP);
  };

  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper pageTitle={t(PRICE_QUOTATION_TITLE)}>
          <PriceQuotationSetupGrid
            handleClose={handleClose}
            handleSave={handleSave}
            data={data}
          />
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(PriceQuotationSetup);
