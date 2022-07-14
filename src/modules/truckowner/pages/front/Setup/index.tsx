import React from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import WrapperTheme from '@/modules/theme/components/Wrapper';
import PageTitle from '@/modules/truckowner/components/PageTitle';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';

// Account Information Section
import MyAccount from '@/modules/truckowner/components/MyAccount';

// Company Section
import TruckOwnerMyCompany from '@/modules/truckowner/components/MyCompany';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import {
  newBankAccountInit,
  newCompanyInit,
} from '@/modules/truckowner/truckowner.constants';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';

import MyService from '@/modules/truckowner/components/MyService';
import MyTruck from '@/modules/truckowner/components/MyTruck';
import MyDriver from '@/modules/truckowner/components/MyDriver';
import TruckOwnerBankAccount from '@/modules/truckowner/components/MyBankAccount';
import MyPassword from '@/modules/truckowner/components/MyPassword';
import truckOwnerService from '@/modules/truckowner/truckowner.service';
import { useHistory } from 'react-router-dom';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

const SetupTruckOwnerPage = () => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const history = useHistory();
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_ACCOUNT_SETUP,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
    DRIVER_TITLE,
    DRIVER_STATUS_NOTE,
    TRUCKOWNER_SERVICE_TITLE,
    TRUCK_TITLE,
    TRUCK_STATUS_NOTE,
    VALIDATE_CURRENT_PASSWORD,
  } = I18N;

  // -----------------------------
  // Account Section
  // -----------------------------
  const [companyType, setCompanyType] = React.useState(false);

  const handleChangeType = (value: boolean) => {
    setCompanyType(value);
  };

  // -----------------------------
  // Company Section
  // -----------------------------

  const [companyActionMode, setCompanyActionMode] = React.useState<ACTION_MODE>(
    typeof authStore.loggedUser?.companyId === 'number'
      ? ACTION_MODE.EDIT
      : ACTION_MODE.CREATE
  );

  const [bankAccountActionMode, setBankAccountActionMode] = React.useState<
    ACTION_MODE
  >(
    typeof authStore.loggedUser?.bankAccountId === 'number'
      ? ACTION_MODE.EDIT
      : ACTION_MODE.CREATE
  );

  const [BusinessLicense, setBusinessLicense] = React.useState({
    file: null,
  });

  const [CompanyIco, setCompanyIco] = React.useState({
    file: null,
  });

  const uploadCompanyFiles = async () => {
    if (CompanyIco.file) {
      const result = await truckOwnerStore.uploadCompanyIco(
        CompanyIco.file,
        authStore.loggedUser.companyId
      );
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
        setCompanyIco({
          file: null,
        });
      }
    }

    if (BusinessLicense.file) {
      const result = await truckOwnerStore.uploadBusinessLicense(
        BusinessLicense.file,
        authStore.loggedUser.companyId
      );
      if (result) {
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
        setBusinessLicense({
          file: null,
        });
      }
    }

    return true;
  };

  const handleSubmit = async (values: any) => {
    truckOwnerStore.setCompanyForm(values);

    if (companyActionMode === ACTION_MODE.CREATE) {
      const result = await truckOwnerStore.createCompany();

      if (result) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        truckOwnerStore.resetCompanyForm();
        authStore.loggedUser.companyId = result.id;
        const data = await uploadCompanyFiles();
        if (data) {
          truckOwnerStore.getCompany();
        }
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
      }
    }

    if (companyActionMode === ACTION_MODE.EDIT) {
      const result = await uploadCompanyFiles();
      if (result) {
        const data = await truckOwnerStore.updateCompany();
        if (data) {
          truckOwnerStore.resetCompanyForm();
          toast.dismiss();
          toast.success(t(MESSAGES_UPDATE_SUCCESS));
        }
      }
    }
  };

  const handleSubmitBankAccount = async (values: any) => {
    truckOwnerStore.setBankAccountForm({
      ...values,
      businessLicenseNo: +values.businessLicenseNo,
    });

    if (bankAccountActionMode === ACTION_MODE.CREATE) {
      const result = await truckOwnerStore.createBankAccount();

      if (result) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        truckOwnerStore.resetBankAccountForm();
        authStore.loggedUser.bankAccountId = result.id;
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
      }
    }

    if (bankAccountActionMode === ACTION_MODE.EDIT) {
      const data = await truckOwnerStore.updateBankAccount();
      if (data) {
        truckOwnerStore.resetBankAccountForm();
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
      }
    }
  };
  const handleUploadBusinessLicense = (event: any) => {
    setBusinessLicense({ file: event.target.files[0] });
  };

  const handleUploadIcon = (event: any) => {
    const file = event.target.files[0];
    setCompanyIco({ file: file });
  };

  const handleDeleteCompanyIcon = async () => {
    const result: any = await truckOwnerStore.deleteCompanyFile(
      authStore.loggedUser.companyId,
      REFERENCE_TYPE.COMPANY_ICON
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  const handleDeleteCompanyBusinessLicense = async () => {
    const result: any = await truckOwnerStore.deleteCompanyFile(
      authStore.loggedUser.companyId,
      REFERENCE_TYPE.BUSINESS_LICENSE
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  React.useEffect(() => {
    if (typeof authStore.loggedUser?.companyId === 'number') {
      truckOwnerStore.getCompany();
    }
    truckOwnerStore.getBankAccount();
    truckOwnerStore.getProvince();
  }, [truckOwnerStore, authStore.loggedUser]);

  React.useEffect(() => {
    setCompanyType(
      typeof authStore.loggedUser?.companyId === 'number' ? true : false
    );
    if (typeof authStore.loggedUser?.companyId === 'number') {
      setCompanyActionMode(ACTION_MODE.EDIT);
    }
  }, [truckOwnerStore.company, authStore.loggedUser]);

  React.useEffect(() => {
    if (truckOwnerStore.bankAccount) {
      setBankAccountActionMode(ACTION_MODE.EDIT);
    }
  }, [truckOwnerStore.bankAccount]);

  const handleChangeUserPassword = async (
    values: any,
    setErrors: any,
    resetForm: any
  ) => {
    const result = await truckOwnerService.changeUserPassword(
      authStore.loggedUser.id,
      values
    );
    if (result.data?.detailError) {
      setErrors({ current: t(VALIDATE_CURRENT_PASSWORD) });
    }
    if (result.data?.success) {
      resetForm();
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      authStore.logout(history, TRUCKOWNER_ROUTERS.LOGIN);
    }
  };

  return (
    <>
      <WrapperTheme>
        {authStore.loggedUser && (
          <>
            <PageTitle
              title={t(CUSTOMER_ACCOUNT_SETUP)}
              showCurrentDate={true}
              className="truckowner-title"
            />
            <MyAccount
              handleChangeType={handleChangeType}
              companyType={companyType}
            />
            <MyPassword handleSubmitForm={handleChangeUserPassword} />
            {companyType && truckOwnerStore.company !== null && (
              <TruckOwnerMyCompany
                mode={companyActionMode}
                handleSubmitForm={handleSubmit}
                initialValues={truckOwnerStore.company}
                handleUploadIcon={handleUploadIcon}
                handleDeleteCompanyIcon={handleDeleteCompanyIcon}
                handleUploadBusinessLicense={handleUploadBusinessLicense}
                handleDeleteCompanyBusinessLicense={
                  handleDeleteCompanyBusinessLicense
                }
              />
            )}
            {companyType && truckOwnerStore.company === null && (
              <TruckOwnerMyCompany
                mode={companyActionMode}
                handleSubmitForm={handleSubmit}
                initialValues={newCompanyInit}
                handleUploadIcon={handleUploadIcon}
                handleDeleteCompanyIcon={handleDeleteCompanyIcon}
                handleUploadBusinessLicense={handleUploadBusinessLicense}
                handleDeleteCompanyBusinessLicense={
                  handleDeleteCompanyBusinessLicense
                }
              />
            )}
            <MyService title={t(TRUCKOWNER_SERVICE_TITLE)} />
            {truckOwnerStore.bankAccount !== null && (
              <TruckOwnerBankAccount
                mode={bankAccountActionMode}
                handleSubmitForm={handleSubmitBankAccount}
                initialValues={
                  truckOwnerStore.bankAccount !== null
                    ? truckOwnerStore.bankAccount
                    : newBankAccountInit
                }
              />
            )}
            <MyTruck title={t(TRUCK_TITLE)} tooltip={t(TRUCK_STATUS_NOTE)} />
            <MyDriver title={t(DRIVER_TITLE)} tooltip={t(DRIVER_STATUS_NOTE)} />
          </>
        )}
      </WrapperTheme>
    </>
  );
};

export default observer(SetupTruckOwnerPage);
