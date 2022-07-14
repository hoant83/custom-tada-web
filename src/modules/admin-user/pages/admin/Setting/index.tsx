import Loading from '@/libs/components/Loading';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import SettingForm from '@/modules/admin-user/components/SettingForm';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AutoVerifyOrder from '@/modules/admin-user/components/SettingForm/AutoVerifyOrder';
import TruckPool from '@/modules/admin-user/components/SettingForm/TruckPool';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { ACCOUNT_ROLE } from '@/modules/admin-user/admin.enum';

const Setting = () => {
  const { t } = useTranslation();
  const {
    MESSAGES_UPDATE_SUCCESS,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_SYNC_DATA_IS_PROCESSING,
    MESSAGES_SYNC_DATA_IS_STARTED,
    MESSAGES_ERROR,
  } = I18N;
  const adminStore = React.useContext(AdminStoreContext);

  const { DEFAULT_TITLE } = I18N;

  const updateSettings = async (data: any) => {
    const result = await adminStore.updateSettings(data);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const updateCreateOrderSettings = async (data: any) => {
    const result = await adminStore.updateCreateOrderSettings(data);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const updateTruckPoolSettings = async (data: any) => {
    const result = await adminStore.updateTruckPoolSettings(data);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const syncData = async (data: any) => {
    const result = await adminStore.syncData();
    if (result?.data?.result) {
      if (result?.data?.result?.status) {
        toast.dismiss();
        toast.success(t(MESSAGES_SYNC_DATA_IS_STARTED));
      } else if (result?.data?.result?.code === 'SYNC_DATA_IS_PROCESSING') {
        toast.dismiss();
        toast.error(t(MESSAGES_SYNC_DATA_IS_PROCESSING));
      }
    } else {
      toast.dismiss();
      toast.error(t(MESSAGES_ERROR));
    }
  };

  const handleUploadLogo = async (event: any) => {
    const result = await adminStore.uploadSystemImg(
      event.target.files[0],
      REFERENCE_TYPE.CUSTOMER_LOGO
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleUploadQR = async (event: any) => {
    const result = await adminStore.uploadSystemImg(
      event.target.files[0],
      REFERENCE_TYPE.FOOTER_QR
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleDeleteFile = async (referenceType: number) => {
    const result = await adminStore.deleteSystemFile(referenceType);
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  React.useEffect(() => {
    adminStore.getSettings();
  }, [adminStore]);
  return (
    <>
      <React.Suspense fallback={<Loading />}>
        <AdminWrapper pageTitle={t(DEFAULT_TITLE)}>
          <SettingForm
            initialValues={adminStore.settings}
            handleSubmitForm={updateSettings}
            handleUploadLogo={handleUploadLogo}
            handleUploadQR={handleUploadQR}
            systemFile={adminStore.systemFiles}
            handleDeleteFiles={handleDeleteFile}
          />
          <AutoVerifyOrder
            initialValues={adminStore.settings}
            handleSubmitForm={updateCreateOrderSettings}
          />
          <TruckPool
            initialValues={adminStore.settings}
            handleSubmitForm={updateTruckPoolSettings}
            handleSyncData={syncData}
          />
        </AdminWrapper>
      </React.Suspense>
    </>
  );
};

export default observer(Setting);
