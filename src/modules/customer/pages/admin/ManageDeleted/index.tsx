import React from 'react';
import { observer } from 'mobx-react';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import AdminWrapper from '@/modules/theme/components/AdminWrapper';

// Action Bar

// Export
import CustomerFilterExport from '@/modules/customer/components/FilterExport';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import {
  VerifiedStatus,
  AccountRole,
} from '@/modules/customer/customer.constants';

// Grid
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { CustomerListDto } from '@/modules/customer/customer.dto';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';
import DeletedCustomerGridAdmin from '@/modules/customer/components/admin/DeletedGrid';

const ManageDeletedCustomerAdminPage = () => {
  const customerStore = React.useContext(CustomerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    MESSAGES_CONFIRM_RESTORE,
    CUSTOMER_MANAGE_RESTORE_TITLE,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    CUSTOMER_TYPE_LABEL,
    CUSTOMER_STATUS_LABEL,
    CUSTOMER_ADMIN_CARDNO,
    ACCOUNT_TYPE,
  } = I18N;

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
      key: 'cardNo',
      label: t(CUSTOMER_ADMIN_CARDNO),
    },
    {
      key: 'accountRole',
      label: t(ACCOUNT_TYPE),
      type: FILTER_TYPE.SELECT,
      options: AccountRole,
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
   * set id of row that need to restore
   */
  const [restoreID, setRestoreID] = React.useState<number>(-1);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );
  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleRestore = async (id: number) => {
    setShowConfirmPopup(true);
    setRestoreID(id);
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

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (restoreID) {
      const result = await customerStore.restoreCustomerByIdByAdmin(restoreID);
      if (result) {
        setRestoreID(-1);
        toast.dismiss();
        toast.success(t('Restore complete'));
        customerStore.getDeletedCustomerByAdmin(criteriaDto);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  React.useEffect(() => {
    customerStore.getDeletedCustomerByAdmin(criteriaDto);
  }, [customerStore, criteriaDto]);

  return (
    <>
      <AdminWrapper pageTitle={t(CUSTOMER_MANAGE_RESTORE_TITLE)}>
        <CustomerFilterExport
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <DeletedCustomerGridAdmin
          totals={customerStore.totalDeletedCount}
          handleRestore={handleRestore}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
        />
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <p>{t(MESSAGES_CONFIRM_RESTORE)}</p>
        </ConfirmModal>
      </AdminWrapper>
    </>
  );
};

export default observer(ManageDeletedCustomerAdminPage);
