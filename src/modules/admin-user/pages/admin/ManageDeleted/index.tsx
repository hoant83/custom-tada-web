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

// Grid
import { CustomerListDto } from '@/modules/customer/customer.dto';
import ConfirmModal from '@/libs/components/ConfirmModal';
import { toast } from 'react-toastify';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import DeletedAdminGrid from '@/modules/admin-user/components/DeletedGrid';

const ManageDeletedTruckOwnerAdminPage = () => {
  const adminStore = React.useContext(AdminStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    CUSTOMER_MANAGE_TITLE,
    CUSTOMER_EMAIL,
    CUSTOMER_PHONE,
    MESSAGES_CONFIRM_RESTORE,
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
      const result = await adminStore.restoreAdminById(restoreID);
      if (result) {
        setRestoreID(-1);
        toast.dismiss();
        toast.success(t('Restore complete'));
        adminStore.getDeletedAdmins(criteriaDto);
      }
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  React.useEffect(() => {
    adminStore.getDeletedAdmins(criteriaDto);
  }, [adminStore, criteriaDto]);

  return (
    <>
      <AdminWrapper pageTitle={t(CUSTOMER_MANAGE_TITLE)}>
        <CustomerFilterExport
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <DeletedAdminGrid
          totals={adminStore.totalDeletedAdminCount}
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

export default observer(ManageDeletedTruckOwnerAdminPage);
