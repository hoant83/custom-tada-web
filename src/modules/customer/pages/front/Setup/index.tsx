import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import { scrollToElement } from '@/libs/utils/normalize.ulti';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import AddressBookGrid from '@/modules/customer/components/AddressBook/Grid';
import DefaultSettingGrid from '@/modules/customer/components/DefaultReference/Grid';
import CustomerMyAccount from '@/modules/customer/components/MyAccount';
// Company Section
import CustomerMyCompany from '@/modules/customer/components/MyCompany';
import MyEmployee from '@/modules/customer/components/MyEmployee';
import MyFavoriteTruck from '@/modules/customer/components/MyFavoriteTruck';
import Payment from '@/modules/customer/components/Payment';
import { newCompanyInit } from '@/modules/customer/customer.constants';
import { PAYMENT_TYPE } from '@/modules/customer/customer.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import { observer } from 'mobx-react';
import queryString from 'query-string';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import MyPassword from '@/modules/truckowner/components/MyPassword';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import customerService from '@/modules/customer/customer.service';
import { useHistory } from 'react-router-dom';

const SetupCustomerPage = () => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);
  const history = useHistory();
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    MENU_ACCOUNT_SETUP,
    CUSTOMER_EMPLOYEE_TITLE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_UPDATE_SUCCESS,
    VALIDATE_CURRENT_PASSWORD,
  } = I18N;

  /*
   * Getting parameter from the route
   */
  const values = queryString.parse(window.location.search);

  // -----------------------------
  // Account Section
  // -----------------------------
  const [companyType, setCompanyType] = React.useState(false);

  const [accountType, setAccountType] = React.useState<number>(
    authStore.loggedUser?.accountType ?? -1
  );

  const companyFormRef = React.useRef(null);
  console.log(
    '🚀 ~ file: index.tsx ~ line 97 ~ SetupCustomerPage ~ companyFormRef',
    companyFormRef
  );
  const handleChangeType = async (value: boolean) => {
    if (value) {
      (companyFormRef.current as any).scrollIntoView();
    }
    setCompanyType(value);
  };

  const handleChangeAccountType = async (value: number) => {
    setAccountType(value);
  };

  // -----------------------------
  // Company Section
  // -----------------------------

  const [companyActionMode, setCompanyActionMode] = React.useState<ACTION_MODE>(
    typeof authStore.loggedUser?.companyId === 'number'
      ? ACTION_MODE.EDIT
      : ACTION_MODE.CREATE
  );

  const [paymentType, setPaymentType] = React.useState<PAYMENT_TYPE | null>(
    null
  );
  /*
   * set init values
   */
  const [initValues, setInitValues] = React.useState<any>(null);

  const [BusinessLicense, setBusinessLicense] = React.useState({
    file: null,
  });

  const [vatInvoice, setVATInvoice] = React.useState(false);

  const [CompanyIco, setCompanyIco] = React.useState({
    file: null,
  });

  const uploadCompanyFiles = async () => {
    if (CompanyIco.file) {
      const result = await customerStore.uploadCompanyIco(
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
      const result = await customerStore.uploadBusinessLicense(
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
    customerStore.setCompanyForm(values);
    if (companyActionMode === ACTION_MODE.CREATE) {
      const result = await customerStore.createCompany();
      if (result) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        customerStore.resetCompanyForm();
        authStore.loggedUser.companyId = result.id;
        const data = await uploadCompanyFiles();
        if (data) {
          customerStore.getCompany();
        }
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
      }
    }
    if (companyActionMode === ACTION_MODE.EDIT) {
      const result = await uploadCompanyFiles();
      if (result) {
        const data = await customerStore.updateCompany();
        if (data) {
          customerStore.resetCompanyForm();
          toast.dismiss();
          toast.success(t(MESSAGES_UPDATE_SUCCESS));
        }
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
    const result = await customerStore.deleteCompanyFile(
      authStore.loggedUser.companyId,
      REFERENCE_TYPE.COMPANY_ICON
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  const handleDeleteCompanyBusinessLicense = async () => {
    const result = await customerStore.deleteCompanyFile(
      authStore.loggedUser.companyId,
      REFERENCE_TYPE.BUSINESS_LICENSE
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  const handleUpdatePayment = async (values: any) => {
    values.needVATInvoice = vatInvoice;

    values.paymentType = paymentType;
    if (values.paymentType === '') {
      values.paymentType = null;
    }
    const data = await customerStore.updateDefaultPayment(values);
    if (data) {
      getDefaultPaymentData();
      toast.dismiss();
      toast.success('success');
    }
  };

  const hadleChangeVATInvoice = (value: boolean) => {
    setVATInvoice(value);
  };

  const handleSetPaymentType = (value: any) => {
    setPaymentType(value);
  };

  const getDefaultPaymentData = React.useCallback(async () => {
    const data = await customerStore.getDefaultPayment();
    if (data) {
      setInitValues({
        address: data.address,
        bussinessLicenseNO: data.bussinessLicenseNO,
        companyName: data.companyName,
        email: data.email,
        needVATInvoice: data.needVATInvoice,
        otherPayment: data.otherPayment,
        paymentType: data.paymentType,
      });
      hadleChangeVATInvoice(data.needVATInvoice);
      handleSetPaymentType(data.paymentType);
    }
  }, [customerStore]);

  React.useEffect(() => {
    if (typeof authStore.loggedUser?.companyId === 'number') {
      customerStore.getCompany();
      if (customerStore.employees === null) {
        customerStore.getEmployees({
          skip: 0,
          take: +pageSizeOptions[1],
        });
      }
    }
    if (authStore.loggedUser?.accountRole !== 0) {
      customerStore.getCompany();
    }
  }, [customerStore, authStore.loggedUser]);

  React.useEffect(() => {
    setCompanyType(
      typeof authStore.loggedUser?.companyId === 'number' ? true : false
    );
    if (typeof authStore.loggedUser?.companyId === 'number') {
      setCompanyActionMode(ACTION_MODE.EDIT);
    }
    getDefaultPaymentData();
  }, [
    customerStore.company,
    authStore.loggedUser,
    customerStore,
    getDefaultPaymentData,
  ]);

  React.useEffect(() => {}, [
    customerStore.employees,
    customerStore.company,
    authStore.loggedUser,
  ]);

  React.useEffect(() => {
    if (values.scroll) {
      setTimeout(() => {
        scrollToElement(`${values.scroll}`);
      }, 1000);
    }
  }, [values]);

  const handleChangeUserPassword = async (
    values: any,
    setErrors: any,
    resetForm: any
  ) => {
    const result = await customerService.changeUserPassword(
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
      authStore.logout(history, CUSTOMER_ROUTERS.LOGIN);
    }
  };

  return (
    <>
      <WrapperTheme pageTitle={t(MENU_ACCOUNT_SETUP)}>
        {authStore.loggedUser && (
          <>
            <CustomerMyAccount
              handleChangeType={handleChangeType}
              companyType={companyType}
              handleChangeAccountType={handleChangeAccountType}
              accountType={accountType}
            />
            <MyPassword handleSubmitForm={handleChangeUserPassword} />
            <div ref={companyFormRef}>
              {companyType && customerStore.company !== null && (
                <CustomerMyCompany
                  mode={companyActionMode}
                  handleSubmitForm={handleSubmit}
                  initialValues={customerStore.company}
                  handleUploadIcon={handleUploadIcon}
                  handleDeleteCompanyIcon={handleDeleteCompanyIcon}
                  handleUploadBusinessLicense={handleUploadBusinessLicense}
                  handleDeleteCompanyBusinessLicense={
                    handleDeleteCompanyBusinessLicense
                  }
                />
              )}
            </div>
            <div ref={companyFormRef}>
              {companyType && customerStore.company === null && (
                <CustomerMyCompany
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
            </div>
            <DefaultSettingGrid />
            {initValues && (
              <Payment
                initValues={initValues}
                handleUpdate={handleUpdatePayment}
                handleChangeType={hadleChangeVATInvoice}
                needVAT={vatInvoice}
                handleSetPaymentType={handleSetPaymentType}
              />
            )}
            <AddressBookGrid />
            <MyEmployee
              title={t(CUSTOMER_EMPLOYEE_TITLE)}
              ownerAccountType={accountType}
            />
            <MyFavoriteTruck />
          </>
        )}
      </WrapperTheme>
    </>
  );
};

export default observer(SetupCustomerPage);
