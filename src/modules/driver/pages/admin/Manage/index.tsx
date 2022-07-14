import ConfirmModal from '@/libs/components/ConfirmModal';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import { isMaximunOtherDocument, notifyError } from '@/libs/utils/upload.util';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import DriverGridAdmin from '@/modules/driver/components/admin/DriverGrid';
import AdminCreateDriverFormModal from '@/modules/driver/pages/admin/Create';
import { DRIVER_ROUTERS } from '@/modules/driver/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import ActionBar from '@/modules/theme/components/ActionBar';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import {
  newFormInit,
  VerifiedStatus,
} from '@/modules/truckowner/truckowner.constants';
import {
  FilterDriverDto,
  NewDriverDto,
} from '@/modules/truckowner/truckowner.dto';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import DriverFilterExport from '@/modules/driver/components/admin/FilterExport';

const ManageDriverAdminPage = () => {
  const history = useHistory();
  const adminStore = React.useContext(AdminStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DRIVER_MANAGE_TITLE,
    BUTTONS_ADD_NEW,
    MESSAGES_CREATED_SUCCESS,
    MESSAGES_DELETE_SUCCESS,
    BUTTONS_RESTORE,
    MESSAGES_DOCUMENT_SIZE_LIMIT,
    TRUCKOWNER_PUBLIC_ID,
    CUSTOMER_PHONE,
    CUSTOMER_STATUS_LABEL,
    SEARCH_ALL,
    CUSTOMER_NAME,
    ORDER_TRUCKOWNER_EMAIL,
    ORDER_TRUCK_OWNER_NAME,
  } = I18N;

  /*
   * show hide new/edit driver popup
   */
  const [showDriverPopup, setShowDriverPopup] = React.useState<boolean>(false);

  /*
   * set driver info
   */
  const [initDriverInfo, setDriverInfo] = React.useState<NewDriverDto>(
    newFormInit
  );

  /*
   * set criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<FilterDriverDto>({
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

  const handleEdit = (id: string) => {
    const editUrl = DRIVER_ROUTERS.ADMIN_EDIT.replace(':userId', id);
    history.push(editUrl);
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
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
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  /*
   * Action of Delete button
   *
   * @param number id
   * @return void
   */
  const handleDelete = async (id: number) => {
    setShowConfirmPopup(true);
    setDeleteID(id);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (deleteID) {
      const result = await adminStore.deleteDriver(deleteID);
      if (result) {
        setDeleteID(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        getDriver();
      }
    }
  };

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

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

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

  const handleRestore = () => {
    history.push(DRIVER_ROUTERS.ADMIN_MANAGE_DELETED);
  };

  const getDriver = async () => {
    await adminStore.getDrivers(criteriaDto);
  };

  const handleCloseDriver = () => {
    setShowDriverPopup(false);
  };

  const handleUploadCardFront = (event: any) => {
    initDriverInfo.idCardFrontImage = event.target.files[0];
  };

  const handleUploadCardBack = (event: any) => {
    initDriverInfo.idCardBackImage = event.target.files[0];
  };

  const handleUploadLicense = (event: any) => {
    initDriverInfo.driverLicense = event.target.files[0];
  };

  const [otherDocuments, setOtherDocuments] = React.useState<
    Record<'files', File[]>
  >({
    files: [],
  });

  const handleUploadMultipleDocument = (event: any) => {
    const listFile: File[] = Object.values(event.target.files);

    if (isMaximunOtherDocument(listFile, {})) {
      notifyError(t(MESSAGES_DOCUMENT_SIZE_LIMIT));
      return;
    }

    setOtherDocuments({ files: listFile });
  };

  const handleCreateDriver = async (values: any) => {
    adminStore.setDriverForm(values);
    const result = await adminStore.addDriver();

    if (result) {
      if (initDriverInfo.idCardFrontImage) {
        await adminStore.uploadDriverCardFront(
          initDriverInfo.idCardFrontImage,
          result.id
        );
      }
      if (initDriverInfo.idCardBackImage) {
        await adminStore.uploadDriverCardBack(
          initDriverInfo.idCardBackImage,
          result.id
        );
      }
      if (initDriverInfo.driverLicense) {
        await adminStore.uploadDriverLicense(
          initDriverInfo.driverLicense,
          result.id
        );
      }

      if (otherDocuments.files && otherDocuments.files.length) {
        await adminStore.uploadDriverOtherDoc(otherDocuments.files, result.id);
        setOtherDocuments({
          files: [],
        });
      }

      setDriverInfo(newFormInit);
      await adminStore.resetDriverForm();
      toast.dismiss();
      toast.success(t(MESSAGES_CREATED_SUCCESS));
      adminStore.getDrivers(criteriaDto);
      setShowDriverPopup(false);
    }
  };

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

  /*
   * Seleted ids in grid
   */
  const [filtered, setFiltered] = React.useState<boolean>(false);

  /*
   * Setting filters
   */
  const filters: FilterByDto[] = [
    {
      key: 'all',
      label: t(SEARCH_ALL),
    },
    {
      key: 'phoneNumber',
      label: t(CUSTOMER_PHONE),
    },
    {
      key: 'truckownerName',
      label: t(ORDER_TRUCK_OWNER_NAME),
    },
    {
      key: 'truckownerEmail',
      label: t(ORDER_TRUCKOWNER_EMAIL),
    },
    {
      key: 'firstName',
      label: t(CUSTOMER_NAME),
    },
    {
      key: 'verifiedStatus',
      label: t(CUSTOMER_STATUS_LABEL),
      type: FILTER_TYPE.SELECT,
      options: VerifiedStatus,
    },
    {
      key: 'publicId',
      label: t(TRUCKOWNER_PUBLIC_ID),
    },
  ];

  const handleCreate = () => {
    setShowDriverPopup(true);
  };

  React.useEffect(() => {
    // getDriver();
    adminStore.getDrivers(criteriaDto);
  }, [adminStore, criteriaDto]);

  return (
    <>
      <AdminWrapper pageTitle={t(DRIVER_MANAGE_TITLE)}>
        <ActionBar actions={actionsBar} />
        <DriverFilterExport
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <AdminCreateDriverFormModal
          show={showDriverPopup}
          handleClose={handleCloseDriver}
          handleCreate={handleCreateDriver}
          handleUploadCardFront={handleUploadCardFront}
          handleUploadCardBack={handleUploadCardBack}
          handleUploadLicense={handleUploadLicense}
          initialValues={initDriverInfo}
          handleUploadMultipleDocument={handleUploadMultipleDocument}
        />
        <DriverGridAdmin
          totals={adminStore.totalCount}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          isSelectedAll={isSelectedAll}
        />
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </AdminWrapper>
    </>
  );
};

export default observer(ManageDriverAdminPage);
