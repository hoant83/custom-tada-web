import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';

import CustomerAccountForm from '@/modules/customer/components/AccountForm';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';

import { toast } from 'react-toastify';
import bsCustomFileInput from 'bs-custom-file-input';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
  handleChangeType?: any;
  companyType: boolean;
  handleChangeAccountType?: any;
  accountType?: number;
}

const CustomerMyAccount = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);

  /*
   * Props of Component
   */
  const {
    className,
    children,
    handleChangeType,
    companyType,
    handleChangeAccountType,
    accountType,
  } = props;

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

  const [avatar, setAvatar] = React.useState({
    file: null,
  });

  const [initData, setInitData] = React.useState<any>(null);

  const uploadDriverFiles = async () => {
    if (cardFront.file) {
      const result = await customerStore.uploadCardFront(
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
      const result = await customerStore.uploadCardBack(
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
    if (avatar.file) {
      const result = await customerStore.uploadAvatar(
        avatar.file,
        authStore.loggedUser.id
      );
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
        setAvatar({
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
    values.accountType = accountType;
    customerStore.setAccountForm(values);
    const result = await uploadDriverFiles();
    if (result) {
      const data = await customerStore.updateAccount(authStore.loggedUser.id);
      if (data) {
        const user = await customerStore.getAccountInfo();
        authStore.setLoggedUser(user ?? authStore.loggedUser);
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
        values.password = '';
        values.confirmPassword = '';
        customerStore.setAccountForm(values);
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
    if (type === REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE) {
      const result = await customerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE
      );
      if (result) {
        authStore.loggedUser.frontCardUrl = '';
        toast.dismiss();
        bsCustomFileInput.init();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE) {
      const result = await customerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE
      );
      if (result) {
        authStore.loggedUser.backCardUrl = '';
        toast.dismiss();
        bsCustomFileInput.init();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === REFERENCE_TYPE.CUSTOMER_PROFILE_IMG) {
      const result = await customerStore.deleteAccountFile(
        authStore.loggedUser.id,
        REFERENCE_TYPE.CUSTOMER_PROFILE_IMG
      );
      if (result) {
        authStore.loggedUser.avatarUrl = '';
        toast.dismiss();
        bsCustomFileInput.init();
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

  const handleUploadAvatar = (event: any) => {
    setAvatar({ file: event.target.files[0] });
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
        <CustomerAccountForm
          className={className}
          children={children}
          handleSubmitForm={handleSubmit}
          initialValues={initData}
          handleUploadCardFront={handleUploadCardFront}
          handleUploadCardBack={handleUploadCardBack}
          handleUploadAvatar={handleUploadAvatar}
          handleDeleteFiles={handleDelete}
          handleChangeType={handleChangeType}
          companyType={companyType}
          handleChangeAccountType={handleChangeAccountType}
          accountType={accountType}
        />
      )}
    </>
  );
};

export default observer(CustomerMyAccount);
