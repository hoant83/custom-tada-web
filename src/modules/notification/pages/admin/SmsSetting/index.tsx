import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import SmsSettingForm from '@/modules/notification/components/SmsSettingForm';
import { NotificationStoreContext } from '@/modules/notification/notification.store';
import { toast } from 'react-toastify';
import { SendSms } from '@/libs/dto/SendSms.dto';
import ActionBar from '@/modules/theme/components/ActionBar';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import { initialSendSms } from '@/modules/customer/customer.constants';
import SendManualSMS from '@/modules/customer/components/admin/SendManualSMS';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}
const SmsSettingAdminPage = (props: ComponentProps) => {
  const notificationStore = React.useContext(NotificationStoreContext);
  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ADMIN_MENU_SMSSETTINGTITLE, BUTTONS_SEND_SMS_MANUAL } = I18N;

  const { className, children } = props;

  const handleSubmit = async (values: any) => {
    await notificationStore.updateSmsSetting(values);

    toast.dismiss();
    toast.success(t('Success'));
  };

  const [initData, setInitData] = React.useState<any>(null);

  const getSetting = React.useCallback(async () => {
    await notificationStore.getSmsSetting();
    setInitData(notificationStore.smsSetting);
  }, [notificationStore]);

  React.useEffect(() => {
    getSetting();
  }, [getSetting]);

  const [actionsBar] = React.useState<ActionBarDto[]>([
    {
      label: BUTTONS_SEND_SMS_MANUAL,
      type: 'primary',
      action: () => {
        handleOpenPopup();
      },
    },
  ]);

  const [show, setShow] = React.useState<boolean>(false);

  const handleOpenPopup = () => {
    setShow(true);
  };

  const handleClosePopup = () => {
    setShow(false);
  };

  const handleSendManualSMS = async (values: SendSms) => {
    const result = await notificationStore.sendManualSMS(values);
    if (result) {
      toast.success(t('Success'));
      handleClosePopup();
    }
  };

  return (
    <>
      <AdminWrapper pageTitle={t(ADMIN_MENU_SMSSETTINGTITLE)}>
        <ActionBar actions={actionsBar} />
        {initData && (
          <SmsSettingForm
            className={className}
            children={children}
            handleSubmitForm={handleSubmit}
            initialValues={initData}
          />
        )}

        <SendManualSMS
          show={show}
          handleClosePopup={handleClosePopup}
          handleSendManualSMS={handleSendManualSMS}
          initialValues={initialSendSms}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(SmsSettingAdminPage);
