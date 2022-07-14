import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';

// Action Bar
import ActionBar from '@/modules/theme/components/ActionBar';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

// Export
import CustomerFilterExport from '@/modules/customer/components/FilterExport';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import {
  VerifiedStatus,
  AccountRole,
  adminCustomerFormInit,
  customerAccountTypeFilterOptions,
} from '@/modules/customer/customer.constants';

// Grid
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { CustomerListDto } from '@/modules/customer/customer.dto';
import CustomerGridAdmin from '@/modules/customer/components/admin/Grid';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';

// Add New Customer
import AddCustomerModal from '@/modules/customer/components/admin/AddCustomerModal';

const ManageCustomerAdminPage = () => {
  const history = useHistory();
  const customerStore = React.useContext(CustomerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_ADD_NEW,
    BUTTONS_RESTORE,
    CUSTOMER_MANAGE_TITLE,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_TYPE_LABEL,
    CUSTOMER_NEW_TYPE_LABEL,
    CUSTOMER_STATUS_LABEL,
    MESSAGES_CREATED_SUCCESS,
    CUSTOMER_ADMIN_CARDNO,
    ACCOUNT_TYPE,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CONFIRM_VERIFY,
    MESSAGES_VERIFY_SUCCESS,
    COMPANY_NAME,
  } = I18N;

  // -----------------------------
  // Action Bar - Process
  // -----------------------------

  const [actionsBar] = React.useState<ActionBarDto[]>([
    {
      label: BUTTONS_RESTORE,
      type: 'primary',
      action: () => {
        handleRestore();
      },
    },
    {
      label: BUTTONS_ADD_NEW,
      type: 'primary',
      action: () => {
        handleCreate();
      },
    },
  ]);

  const handleCreate = () => {
    setShowPopup(true);
  };

  const handleRestore = () => {
    history.push(CUSTOMER_ROUTERS.ADMIN_MANAGE_DELETED);
  };
  // -----------------------------
  // Filter - Process
  // -----------------------------

  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<CustomerListDto>({
    skip: 0,
    take: +pageSizeOptions[1],
  });

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>([]);

  /**
   * Is select all items
   */
  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  /*
   * Seleted ids in grid
   */
  const [filtered, setFiltered] = React.useState<boolean>(false);

  /*
   * Setting filters
   */
  const filters: FilterByDto[] = [
    {
      key: 'email',
      label: t(CUSTOMER_EMAIL),
    },
    {
      key: 'phoneNumber',
      label: t(CUSTOMER_PHONE),
    },
    {
      key: 'verifiedStatus',
      label: t(CUSTOMER_STATUS_LABEL),
      type: FILTER_TYPE.SELECT,
      options: VerifiedStatus,
    },
    {
      key: 'companyId',
      label: t(CUSTOMER_TYPE_LABEL),
      type: FILTER_TYPE.SELECT,
      options: [
        {
          key: 'company',
          label: I18N.CUSTOMER_TYPE_COMPANY,
        },
        {
          key: 'individual',
          label: I18N.CUSTOMER_TYPE_INDIVIDUAL,
        },
      ],
    },
    {
      key: 'accountType',
      label: t(CUSTOMER_NEW_TYPE_LABEL),
      type: FILTER_TYPE.SELECT,
      options: customerAccountTypeFilterOptions,
    },
    {
      key: 'cardNo',
      label: t(CUSTOMER_ADMIN_CARDNO),
    },
    {
      key: 'accountRole',
      label: t(ACCOUNT_TYPE),
      type: FILTER_TYPE.SELECT,
      options: AccountRole,
    },
    {
      key: 'companyName',
      label: t(COMPANY_NAME),
    },
  ];

  /*
   * Action of search button
   * @param: any e
   * @param: FilterByDto filterType
   * @return: void
   */
  const handleFilter = (e: any, filterType: FilterByDto) => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
    });
    setFiltered(true);
  };

  const handleResetFilter = () => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[1],
    });
    setFiltered(false);
  };

  // -----------------------------
  // Grid Process
  // -----------------------------

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  const [verifyId, setVerifyId] = React.useState<number>(-1);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  const [confirmAction, setConfirmAction] = React.useState<string>('');

  const [confirmTitle, setConfirmTitle] = React.useState<string>('');

  const handleEdit = (id: string) => {
    const editUrl = CUSTOMER_ROUTERS.ADMIN_EDIT.replace(':userId', id);
    history.push(editUrl);
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (id: number) => {
    setShowConfirmPopup(true);
    setConfirmTitle(MESSAGES_CONFIRM_DELETE);
    setConfirmAction('delete');
    setDeleteID(id);
  };

  /*
   * Action of selecting all items
   * @param: string[] items
   * @return: void
   */
  const handleSelectedItems = (items: string[]) => {
    if (items[0] === '-1') setIsSelectedAll(true);
    else setIsSelectedAll(false);
    setIds(items);
  };

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Action of change page
   * @param: number page
   * @return: void
   */
  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[1] : 0,
      take: +pageSizeOptions[1],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

  const handleVerifyEmail = async (id: number) => {
    setVerifyId(id);
    setConfirmTitle(MESSAGES_CONFIRM_VERIFY);
    setConfirmAction('verify');
    setShowConfirmPopup(true);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (confirmAction === 'delete') {
      if (deleteID) {
        const result = await customerStore.deleteCustomerByIdByAdmin(deleteID);
        if (result) {
          setDeleteID(-1);
          toast.dismiss();
          toast.success(t(MESSAGES_DELETE_SUCCESS));
          customerStore.getCustomerByAdmin(criteriaDto);
        }
      }
    }
    if (verifyId) {
      const result = await customerStore.verifyCustomerByAdmin(verifyId);
      if (result) {
        setVerifyId(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_VERIFY_SUCCESS));
        customerStore.getCustomerByAdmin(criteriaDto);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  // -----------------------------
  // Create & Delete Customer
  // -----------------------------
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const handleCreateCustomer = async (values: any) => {
    customerStore.setAdminCustomerForm(values);
    const result = await customerStore.addCustomerByAdmin();

    if (result) {
      customerStore.resetAdminCustomerForm();
      customerStore.getCustomerByAdmin(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_CREATED_SUCCESS));
      setShowPopup(false);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  React.useEffect(() => {
    customerStore.getCustomerByAdmin(criteriaDto);
  }, [customerStore, criteriaDto]);

  return (
    <>
      <AdminWrapper pageTitle={t(CUSTOMER_MANAGE_TITLE)}>
        <ActionBar actions={actionsBar} />
        <CustomerFilterExport
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <CustomerGridAdmin
          totals={customerStore.totalCount}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleChangePageItem={handleChangePageItem}
          handleVerifyEmail={handleVerifyEmail}
          current={currentPage}
          isSelectedAll={isSelectedAll}
        />
        <AddCustomerModal
          initialValues={adminCustomerFormInit}
          handleSubmitForm={handleCreateCustomer}
          show={showPopup}
          handleClose={handleClose}
        />
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <p>{t(confirmTitle)}</p>
        </ConfirmModal>
      </AdminWrapper>
    </>
  );
};

export default observer(ManageCustomerAdminPage);
