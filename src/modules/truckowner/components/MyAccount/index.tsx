import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

import AccountInfoSetupForm from '@/modules/truckowner/components/AccountForm';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';

import { toast } from 'react-toastify';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  handleChangeType?: any;
  companyType: boolean;
}

const MyAccount = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Props of Component
   */
  const { className, children, handleChangeType, companyType } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { MESSAGES_UPDATE_SUCCESS, MESSAGES_DELETE_SUCCESS } = I18N;

  const [cardFront, setCardFront] = React.useState({
    file: null,
  });

  const [cardBack, setCardBack] = React.useState({
    file: null,
  });

  const [initData, setInitData] = React.useState<any>(null);

  const uploadDriverFiles = async () => {
    if (cardFront.file) {
      const result = await truckOwnerStore.uploadCardFront(
        cardFront.file,
        authStore.loggedUser.id
      );
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
        setCardFront({
          file: null,
        });
      }
    }
    if (cardBack.file) {
      const result = await truckOwnerStore.uploadCardBack(
        cardBack.file,
        authStore.loggedUser.id
      );
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
        setCardBack({
          file: null,
        });
      }
    }
    return true;
  };

  const handleSubmit = async (values: any) => {
    if (!companyType) {
      values.companyId = null;
    }
    truckOwnerStore.setAccountForm(values);
    const result = await uploadDriverFiles();
    if (result) {
      const data = await truckOwnerStore.updateAccount(authStore.loggedUser.id);
      if (data) {
        const user = await truckOwnerStore.getAccountInfo();
        authStore.setLoggedUser(user ?? authStore.loggedUser);
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
      }
    }
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (type: REFERENCE_TYPE) => {
    if (type === REFERENCE_TYPE.TRUCK_OWNER_ID_CARD_FRONT_IMAGE) {
      const result = truckOwnerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.TRUCK_OWNER_ID_CARD_FRONT_IMAGE
      );
      if (result) {
        authStore.loggedUser.frontCardUrl = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === REFERENCE_TYPE.TRUCK_OWNER_ID_CARD_BACK_IMAGE) {
      const result = truckOwnerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.TRUCK_OWNER_ID_CARD_BACK_IMAGE
      );
      if (result) {
        authStore.loggedUser.backCardUrl = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
  };

  const handleUploadCardFront = (event: any) => {
    setCardFront({ file: event.target.files[0] });
  };

  const handleUploadCardBack = (event: any) => {
    setCardBack({ file: event.target.files[0] });
  };

  React.useEffect(() => {
    if (authStore.loggedUser) {
      authStore.loggedUser.cardNo = authStore.loggedUser.cardNo ?? '';
      authStore.loggedUser.phoneNumber = authStore.loggedUser.phoneNumber ?? '';
      authStore.loggedUser.email = authStore.loggedUser.email ?? '';
      authStore.loggedUser.firstName = authStore.loggedUser.firstName ?? '';
      setInitData(authStore.loggedUser);
    }
  }, [authStore.loggedUser]);

  return (
    <>
      {initData && (
        <AccountInfoSetupForm
          className={className}
          children={children}
          handleSubmitForm={handleSubmit}
          initialValues={initData}
          handleUploadCardFront={handleUploadCardFront}
          handleUploadCardBack={handleUploadCardBack}
          handleDeleteFiles={handleDelete}
          handleChangeType={handleChangeType}
          companyType={companyType}
        />
      )}
    </>
  );
};

export default observer(MyAccount);
