import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

// import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';

import AdminAccountForm from '@/modules/customer/components/admin/AccountForm';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';

import { toast } from 'react-toastify';
import {
  customerDto,
  newCompanyInit,
} from '@/modules/customer/customer.constants';
import CompanyForm from '@/modules/customer/components/CompanyForm';
import { ACTION_MODE } from '@/libs/enums/action.enum';
// import { useParams } from 'react-router-dom';
import CustomerEmployee from '@/modules/customer/components/admin/CustomerEmployee';
import DriverFavoriteTruck from '@/modules/customer/components/admin/DriverFavoriteTruck';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { ACCOUNT_ROLE } from '@/modules/admin-user/admin.enum';
import CustomerAPI from '@/modules/customer/components/admin/CustomerAPI';

interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

const CustomerMyAccount = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const { className, children } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    MESSAGES_UPDATE_SUCCESS,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    CUSTOMER_EMPLOYEE_TITLE,
  } = I18N;

  const [customer, setCustomer] = React.useState(customerDto);

  const [cardFront, setCardFront] = React.useState({
    file: null,
  });

  const [cardBack, setCardBack] = React.useState({
    file: null,
  });

  const [avatar, setAvatar] = React.useState({
    file: null,
  });

  const [BusinessLicense, setBusinessLicense] = React.useState({
    file: null,
  });

  const [CompanyIco, setCompanyIco] = React.useState({
    file: null,
  });

  const [companyActionMode, setCompanyActionMode] = React.useState<ACTION_MODE>(
    ACTION_MODE.CREATE
  );

  const [companyType, setCompanyType] = React.useState(false);

  const [accountType, setAccountType] = React.useState<number>(-1);

  const companyFormRef = React.useRef(null);
  console.log(
    '🚀 ~ file: index.tsx ~ line 82 ~ CustomerMyAccount ~ companyFormRef',
    companyFormRef
  );

  const uploadDriverFiles = async () => {
    if (cardFront.file) {
      const result = await customerStore.uploadCardFrontByAdmin(
        cardFront.file,
        +customer.id
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
      const result = await customerStore.uploadCardBackByAdmin(
        cardBack.file,
        +customer.id
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
      const result = await customerStore.uploadAvatarByAdmin(
        avatar.file,
        +customer.id
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

  const uploadCompanyFiles = async () => {
    if (CompanyIco.file) {
      const result = await customerStore.uploadCompanyIcoByAdmin(
        CompanyIco.file,
        customerStore.customerAdmin.companyId
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
      const result = await customerStore.uploadBusinessLicenseByAdmin(
        BusinessLicense.file,
        customerStore.customerAdmin.companyId
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

  const handleUploadIcon = (event: any) => {
    const file = event.target.files[0];
    setCompanyIco({ file: file });
  };

  const handleUploadBusinessLicense = (event: any) => {
    setBusinessLicense({ file: event.target.files[0] });
  };

  const handleDeleteCompanyIcon = async () => {
    const result = await customerStore.deleteCompanyFileByAdmin(
      +customer.companyId,
      REFERENCE_TYPE.COMPANY_ICON
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  const handleDeleteCompanyBusinessLicense = async () => {
    const result = await customerStore.deleteCompanyFileByAdmin(
      +customer.companyId,
      REFERENCE_TYPE.BUSINESS_LICENSE
    );
    if (result) {
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
    }
  };

  const handleSubmitCompany = async (values: any) => {
    customerStore.setCompanyForm(values);
    if (companyActionMode === ACTION_MODE.CREATE) {
      const result = await customerStore.createCompanyByAdmin(+customer.id);
      if (result) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        customerStore.resetCompanyForm();
        customerStore.customerAdmin.companyId = result.id;
        const data = await uploadCompanyFiles();
        if (data) {
          customerStore.getCompanyByAdmin(result.id);
        }
        toast.dismiss();
        toast.success(t(MESSAGES_CREATED_SUCCESS));
      }
    }
    if (companyActionMode === ACTION_MODE.EDIT) {
      const result = await uploadCompanyFiles();
      if (result) {
        const data = await customerStore.updateCompanyByAdmin(+customer.id);
        if (data) {
          customerStore.resetCompanyForm();
          toast.dismiss();
          toast.success(t(MESSAGES_UPDATE_SUCCESS));
        }
      }
    }
  };
  //
  const handleSubmitAccount = async (values: any) => {
    if (!companyType) {
      values.companyId = null;
      customerStore.company = newCompanyInit;
    }
    values.accountType = accountType;
    customerStore.setCustomerUpdateForm(values);
    const result = await uploadDriverFiles();
    if (result) {
      const data = await customerStore.updateCustomerByAdmin(+customer.id);
      if (data) {
        customerStore.getCustomerByIdByAdmin(+customer.id);

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
    if (type === REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE) {
      const result = await customerStore.deleteAccountFileByAdmin(
        +customer.id,
        REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE
      );
      if (result) {
        customer.frontCardUrl = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
    if (type === REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE) {
      const result = await customerStore.deleteAccountFileByAdmin(
        +customer.id,
        REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE
      );
      if (result) {
        customer.backCardUrl = '';
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
      }
    }
  };

  const handleChangeType = async (value: boolean) => {
    setCompanyType(value);
  };

  const handleChangeAccountType = (value: number) => {
    setAccountType(value);
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
    if (customerStore.customerAdmin) {
      setCustomer(customerStore.customerAdmin);
      setAccountType(customerStore.customerAdmin?.accountType ?? -1);
      if (customerStore.customerAdmin.companyId) {
        setCompanyActionMode(ACTION_MODE.EDIT);
        setCompanyType(true);
      } else {
        setCompanyActionMode(ACTION_MODE.CREATE);
      }
    }
  }, [customerStore, customerStore.customerAdmin]);

  return (
    <>
      {customer && customer.email && customerStore.customerAdmin && (
        <AdminAccountForm
          className={className}
          children={children}
          handleSubmitForm={handleSubmitAccount}
          initialValues={customerStore.customerAdmin}
          handleUploadCardFront={handleUploadCardFront}
          handleUploadCardBack={handleUploadCardBack}
          handleUploadAvatar={handleUploadAvatar}
          handleDeleteFiles={handleDelete}
          handleChangeType={handleChangeType}
          handleChangeAccountType={handleChangeAccountType}
          companyType={companyType}
          accountType={accountType}
        />
      )}
      {companyType && customerStore.company !== null && (
        <CompanyForm
          mode={companyActionMode}
          handleSubmitForm={handleSubmitCompany}
          initialValues={customerStore.company}
          handleUploadIcon={handleUploadIcon}
          handleDeleteCompanyIcon={handleDeleteCompanyIcon}
          handleUploadBusinessLicense={handleUploadBusinessLicense}
          handleDeleteCompanyBusinessLicense={
            handleDeleteCompanyBusinessLicense
          }
        />
      )}
      {companyType && customerStore.company === null && (
        <CompanyForm
          mode={companyActionMode}
          handleSubmitForm={handleSubmitCompany}
          initialValues={newCompanyInit}
          handleUploadIcon={handleUploadIcon}
          handleDeleteCompanyIcon={handleDeleteCompanyIcon}
          handleUploadBusinessLicense={handleUploadBusinessLicense}
          handleDeleteCompanyBusinessLicense={
            handleDeleteCompanyBusinessLicense
          }
        />
      )}
      <CustomerEmployee
        title={t(CUSTOMER_EMPLOYEE_TITLE)}
        customer={customer}
      />
      <DriverFavoriteTruck customer={customer} />
      {authStore.loggedUser?.userType === ACCOUNT_ROLE.SUPERADMIN && (
        <CustomerAPI customer={customer} />
      )}
    </>
  );
};

export default observer(CustomerMyAccount);
