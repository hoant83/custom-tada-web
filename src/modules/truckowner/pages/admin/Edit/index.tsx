import React from 'react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';

import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import PageTitle from '@/modules/truckowner/components/admin/PageTitle';

import { CommonStoreContext } from '@/libs/stores/common.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

// Account Form
import TruckOwnerAccountSection from '@/modules/truckowner/components/admin/AccountSection';

// Company Section
import TruckOwnerCompanySection from '@/modules/truckowner/components/admin/CompanySection';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import {
  newBankAccountInit,
  newCompanyInit,
} from '@/modules/truckowner/truckowner.constants';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';

import ServiceSection from '@/modules/truckowner/components/admin/ServiceSection';
import TruckSection from '@/modules/truckowner/components/admin/TruckSection';
import DriverSection from '@/modules/truckowner/components/admin/DriverSection';
import TruckOwnerBankAccountSection from '@/modules/truckowner/components/admin/BankAccountSection';

const EditTruckOwnerAdminPage = () => {
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  const { userId } = useParams() as any;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    TRUCKOWNER_EDIT_TITLE,
    TRUCKOWNER_SERVICE_TITLE,
    TRUCK_TITLE,
    TRUCK_STATUS_NOTE,
    DRIVER_TITLE,
    DRIVER_STATUS_NOTE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
  } = I18N;

  // -----------------------------
  // Account Section
  // -----------------------------
  const [companyType, setCompanyType] = React.useState(false);

  const [bankAccountActionMode, setBankAccountActionMode] = React.useState<
    ACTION_MODE
  >(
    typeof truckOwnerStore.truckOwnerAdmin?.bankAccountId === 'number'
      ? ACTION_MODE.EDIT
      : ACTION_MODE.CREATE
  );

  const handleChangeType = async (value: boolean) => {
    setCompanyType(value);
  };

  commonStore.setActiveMenu(TRUCKOWNER_ROUTERS.ADMIN_MANAGE);

  // -----------------------------
  // Company Section
  // -----------------------------

  const [companyActionMode, setCompanyActionMode] = React.useState<ACTION_MODE>(
    typeof truckOwnerStore.truckOwnerAdmin?.companyId === 'number'
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
      const result = await truckOwnerStore.uploadCompanyIcoByAdmin(
        CompanyIco.file,
        truckOwnerStore.truckOwnerAdmin?.companyId
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
      const result = await truckOwnerStore.uploadBusinessLicenseByAdmin(
        BusinessLicense.file,
        truckOwnerStore.truckOwnerAdmin?.companyId
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
    truckOwnerStore.setCompanyAdminForm(values);

    if (companyActionMode === ACTION_MODE.CREATE) {
      const result = await truckOwnerStore.updateCompanyByAdmin(
        truckOwnerStore.truckOwnerAdmin?.id
      );
      if (result) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        truckOwnerStore.resetCompanyAdminForm();
        truckOwnerStore.truckOwnerAdmin.companyId = result.id;
        const data = await uploadCompanyFiles();
        if (data) {
          truckOwnerStore.getCompanyByAdmin(
            truckOwnerStore.truckOwnerAdmin?.id
          );
        }
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
      }
    }

    if (companyActionMode === ACTION_MODE.EDIT) {
      const result = await uploadCompanyFiles();
      if (result) {
        const data = await truckOwnerStore.updateCompanyByAdmin(
          truckOwnerStore.truckOwnerAdmin?.id
        );
        if (data) {
          truckOwnerStore.resetCompanyForm();
          toast.dismiss();
          toast.success(t(MESSAGES_UPDATE_SUCCESS));
        }
      }
    }
  };

  const handleSubmitBankAccount = async (values: any) => {
    truckOwnerStore.setBankAccountAdminForm({
      ...values,
      businessLicenseNo: +values.businessLicenseNo,
    });

    if (bankAccountActionMode === ACTION_MODE.CREATE) {
      const result = await truckOwnerStore.createBankAccountByAdmin(
        truckOwnerStore.truckOwnerAdmin.id
      );

      if (result) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        truckOwnerStore.resetBankAccountAdminForm();
        truckOwnerStore.truckOwnerAdmin.bankAccountId = result.id;
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
      }
    }

    if (bankAccountActionMode === ACTION_MODE.EDIT) {
      const data = await truckOwnerStore.updateBankAccountByAdmin(
        truckOwnerStore.truckOwnerAdmin.id
      );
      if (data) {
        truckOwnerStore.resetBankAccountAdminForm();
        toast.dismiss();
        toast.success(t(MESSAGES_UPDATE_SUCCESS));
      }
    }
  };

  const handleUploadBusinessLicense = (event: any) => {
    setBusinessLicense({ file: event.target.files[0] });
  };

  const handleUploadIcon = (event: any) => {
    setCompanyIco({ file: event.target.files[0] });
  };

  const handleDeleteCompanyIcon = () => {
    const result = truckOwnerStore.deleteCompanyFileByAdmin(
      truckOwnerStore.truckOwnerAdmin?.companyId,
      REFERENCE_TYPE.COMPANY_ICON
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  const handleDeleteCompanyBusinessLicense = () => {
    const result = truckOwnerStore.deleteCompanyFileByAdmin(
      truckOwnerStore.truckOwnerAdmin?.companyId,
      REFERENCE_TYPE.BUSINESS_LICENSE
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  React.useEffect(() => {
    truckOwnerStore.getTruckOwnerByIdByAdmin(userId);
  }, [commonStore, truckOwnerStore, userId]);

  React.useEffect(() => {
    if (typeof truckOwnerStore.truckOwnerAdmin?.companyId === 'number') {
      truckOwnerStore.getCompanyByAdmin(truckOwnerStore.truckOwnerAdmin.id);
    }
    truckOwnerStore.getBankAccountByAdmin(userId);
    truckOwnerStore.getProvince();
  }, [truckOwnerStore, truckOwnerStore.truckOwnerAdmin, userId]);

  React.useEffect(() => {
    setCompanyType(
      typeof truckOwnerStore.truckOwnerAdmin?.companyId === 'number'
        ? true
        : false
    );
    if (typeof truckOwnerStore.truckOwnerAdmin?.companyId === 'number') {
      setCompanyActionMode(ACTION_MODE.EDIT);
    }
  }, [truckOwnerStore.companyAdmin, truckOwnerStore.truckOwnerAdmin]);

  React.useEffect(() => {
    setCompanyType(
      typeof truckOwnerStore.truckOwnerAdmin?.bankAccountId === 'number'
        ? true
        : false
    );
    if (typeof truckOwnerStore.truckOwnerAdmin?.bankAccountId === 'number') {
      setCompanyActionMode(ACTION_MODE.EDIT);
    }
  }, [truckOwnerStore.companyAdmin, truckOwnerStore.truckOwnerAdmin]);

  React.useEffect(() => {
    if (truckOwnerStore.bankAccountAdmin) {
      setBankAccountActionMode(ACTION_MODE.EDIT);
    }
  }, [truckOwnerStore.bankAccountAdmin]);

  return (
    <>
      <AdminWrapper>
        <>
          <PageTitle
            title={t(TRUCKOWNER_EDIT_TITLE)}
            showCurrentDate={true}
            className="truckowner-title"
          />
          <TruckOwnerAccountSection
            handleChangeType={handleChangeType}
            companyType={companyType}
          />
          {companyType && truckOwnerStore.companyAdmin !== null && (
            <TruckOwnerCompanySection
              mode={companyActionMode}
              handleSubmitForm={handleSubmit}
              initialValues={truckOwnerStore.companyAdmin}
              handleUploadIcon={handleUploadIcon}
              handleDeleteCompanyIcon={handleDeleteCompanyIcon}
              handleUploadBusinessLicense={handleUploadBusinessLicense}
              handleDeleteCompanyBusinessLicense={
                handleDeleteCompanyBusinessLicense
              }
            />
          )}
          {companyType && truckOwnerStore.companyAdmin === null && (
            <TruckOwnerCompanySection
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
          {truckOwnerStore.bankAccountAdmin !== null && (
            <TruckOwnerBankAccountSection
              mode={bankAccountActionMode}
              handleSubmitForm={handleSubmitBankAccount}
              initialValues={
                truckOwnerStore.bankAccountAdmin !== null
                  ? truckOwnerStore.bankAccountAdmin
                  : newBankAccountInit
              }
            />
          )}
          <ServiceSection title={t(TRUCKOWNER_SERVICE_TITLE)} />
          <TruckSection title={t(TRUCK_TITLE)} tooltip={t(TRUCK_STATUS_NOTE)} />
          <DriverSection
            title={t(DRIVER_TITLE)}
            tooltip={t(DRIVER_STATUS_NOTE)}
          />
        </>
      </AdminWrapper>
    </>
  );
};

export default observer(EditTruckOwnerAdminPage);
