import React from 'react';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';

// Action Bar
import ActionBar from '@/modules/theme/components/ActionBar';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import { TRUCKOWNER_ROUTERS } from '@/modules/truckowner/router.enum';

// Export
import TruckownerFilterExport from '@/modules/truckowner/components/FilterExport';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';

// Grid
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { AdminFilterDto } from '@/modules/truckowner/truckowner.dto';
import TruckownerGridAdmin from '@/modules/truckowner/components/admin/Grid';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';

// Add New Account
import AddTruckOwnerModal from '@/modules/truckowner/components/admin/AddTruckOwnerModal';
import {
  adminTruckOwnerFormInit,
  VerifiedStatus,
} from '@/modules/truckowner/truckowner.constants';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';

const ManageTruckOwnerAdminPage = () => {
  const history = useHistory();
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_ADD_NEW,
    BUTTONS_RESTORE,
    TRUCKOWNER_MANAGE_TITLE,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    MESSAGES_CREATED_SUCCESS,
    TRUCKOWNER_PUBLIC_ID,
    CUSTOMER_STATUS_LABEL,
    CUSTOMER_TYPE_LABEL,
    COMPANY_NAME,
    MESSAGES_CONFIRM_VERIFY,
    MESSAGES_VERIFY_SUCCESS,
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
    history.push(TRUCKOWNER_ROUTERS.ADMIN_MANAGE_DELETED);
  };

  // -----------------------------
  // Filter - Process
  // -----------------------------

  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<AdminFilterDto>({
    skip: 0,
    take: +pageSizeOptions[1],
  });

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>([]);

  /**
   * Is selected all id
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
      key: 'companyName',
      label: t(COMPANY_NAME),
    },
    {
      key: 'publicId',
      label: t(TRUCKOWNER_PUBLIC_ID),
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
      orderBy: 'id',
      orderDirection: 'DESC',
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

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  const handleEdit = (id: string) => {
    const editUrl = TRUCKOWNER_ROUTERS.ADMIN_EDIT.replace(':userId', id);
    history.push(editUrl);
  };

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (id: number) => {
    setConfirmTitle(MESSAGES_CONFIRM_DELETE);
    setConfirmAction('delete');
    setShowConfirmPopup(true);
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

  const [verifyId, setVerifyId] = React.useState<number>(-1);

  const [confirmAction, setConfirmAction] = React.useState<string>('');

  const [confirmTitle, setConfirmTitle] = React.useState<string>('');
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
        const result = await truckOwnerStore.deleteTruckOwnerByIdByAdmin(
          deleteID
        );
        if (result) {
          setDeleteID(-1);
          toast.dismiss();
          toast.success(t(MESSAGES_DELETE_SUCCESS));
          truckOwnerStore.getTruckOwnerByAdmin(criteriaDto);
        }
      }
    }
    if (verifyId) {
      const result = await truckOwnerStore.verifyTruckOwnerByAdmin(verifyId);
      if (result) {
        setVerifyId(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_VERIFY_SUCCESS));
        truckOwnerStore.getTruckOwnerByAdmin(criteriaDto);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  // -----------------------------
  // Create New Account
  // -----------------------------
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const handleCreateAccount = async (values: any) => {
    truckOwnerStore.setAdminTruckOwnerForm(values);
    const result = await truckOwnerStore.addTruckOwnerByAdmin();

    if (result) {
      truckOwnerStore.resetAdminTruckOwnerForm();
      truckOwnerStore.getTruckOwnerByAdmin(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_CREATED_SUCCESS));
      setShowPopup(false);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  React.useEffect(() => {
    truckOwnerStore.getTruckOwnerByAdmin(criteriaDto);
  }, [truckOwnerStore, criteriaDto]);

  return (
    <>
      <AdminWrapper pageTitle={t(TRUCKOWNER_MANAGE_TITLE)}>
        <ActionBar actions={actionsBar} />
        <TruckownerFilterExport
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <TruckownerGridAdmin
          totals={truckOwnerStore.totalTruckOwners}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          handleVerifyEmail={handleVerifyEmail}
          isSelectedAll={isSelectedAll}
        />
        <AddTruckOwnerModal
          initialValues={adminTruckOwnerFormInit}
          handleSubmitForm={handleCreateAccount}
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

export default observer(ManageTruckOwnerAdminPage);
