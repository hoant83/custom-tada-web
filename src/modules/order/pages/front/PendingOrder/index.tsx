import ConfirmModal from '@/libs/components/ConfirmModal';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import { FilterByDto } from '@/libs/dto/FilterBy.dto';
import { FILTER_TYPE } from '@/libs/enums/filter.enum';
import { CommonStoreContext } from '@/libs/stores/common.store';
import {
  exportAsCSVorXLSTruckOwnerOrder,
  formatExportAsCSVTruckOwnerOrder,
} from '@/libs/utils/export.util';
import {
  isMaximunOtherDocument,
  notifyError,
  notifySuccess,
} from '@/libs/utils/upload.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import CustomerProfilePopup from '@/modules/customer/components/ProfilePopup';
import { I18N } from '@/modules/lang/i18n.enum';
import Message from '@/modules/message/components/Message';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import JobsOrderExport from '@/modules/order/components/JobsExport';
import SummaryPopup from '@/modules/order/components/SummaryPopup';
import TruckOwnerOrderGrid from '@/modules/order/components/TruckOwnerOrderGrid';
import { truckownerOrderStatus } from '@/modules/order/order.constants';
import { ExportOrderListDto, OrderListDto } from '@/modules/order/order.dto';
import { ORDER_STATUS } from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import AssignTruckAndDriverModal from '@/modules/truckowner/components/AssignTruckAndDriverModal';
import CreateDriverFormModal from '@/modules/truckowner/components/CreateDriverFormModal';
import CreateTruckFormModal from '@/modules/truckowner/components/CreateTruckFormModal';
import {
  newFormInit,
  newTruckInit,
} from '@/modules/truckowner/truckowner.constants';
import { NewDriverDto, NewTruckDto } from '@/modules/truckowner/truckowner.dto';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import truckService from '@/modules/truckowner/truckowner.service';

interface ComponentProps {
  handleStep?: any;
}

const PendingOrderPage = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const commonStore = React.useContext(CommonStoreContext);

  const { handleStep } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    FILTER_EXPORT,
    MESSAGES_SELECTED_ITEMS,
    ORDER_SUMMARY_TITLE,
    MESSAGES_CREATED_SUCCESS,
    CUSTOMER_ACCOUNT_INFO,
    JOB_ORDER_NOTE,
    MESSAGES_CONFIRM_CANCEL,
    ORDER_SUMMARY_DRIVERS_TITLE,
    ORDER_SUMMARY_TRUCKS_TITLE,
    ORDER_SUMMARY_CREATEDBY_TITLE,
    MESSAGES_DOCUMENT_SIZE_LIMIT,
    TRUCKOWNER_CUSTOMER_EMAIL,
    ORDER_ID,
    ORDER_STATUS_LABEL,
  } = I18N;

  /*
   * Setting export actions
   */
  const exportingTo: ExportingToDto[] = [
    {
      label: '.XLS',
      action: () => {
        handleExport(TYPE_EXPORT.XLS);
      },
    },
    {
      label: '.CSV',
      action: () => {
        handleExport(TYPE_EXPORT.CSV);
      },
    },
  ];

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>([]);

  /*
   * Selected tracking order
   */
  const [selectedOrder, setSelectedOrder] = React.useState<object>({});

  /*
   * Selected tracking order
   */
  const [cancelOrder, setCancelOrder] = React.useState<number>(-1);

  const [drivers, setDrivers] = React.useState<any>([]);
  const [trucks, setTrucks] = React.useState<any>([]);
  const [notes, setNotes] = React.useState<any>([]);
  const [createdBy, setCreatedBy] = React.useState<any>({});

  /*
   * messages from store
   */
  const messageStore = React.useContext(MessageStoreContext);

  /*
   * show hide customer profile popup
   */
  const [showProfile, setShowProfile] = React.useState<boolean>(false);

  /*
   * show hide truck owner profile popup
   */
  const [showSummary, setShowSummary] = React.useState<boolean>(false);

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * show hide new/assign driver popup
   */
  const [showAssignPopup, setShowAssignPopup] = React.useState<boolean>(false);

  /*
   * edit order
   */
  const [assignId, setAssignId] = React.useState<number>(-1);

  const [defaultCommission, setDefaultCommission] = React.useState<any>({
    percentCommission: 0,
    fixedCommission: 0,
  });

  React.useEffect(() => {
    getDefaultCommission();
  }, []);

  const getDefaultCommission = async () => {
    const data = await truckService.getDefaultCommission();
    if (data) {
      setDefaultCommission(data);
    }
  };

  /*
   * Action of Edit link
   * @param: string id
   * @return: void
   */
  const handleAssign = async (id: number) => {
    await setAssignId(id);
    const orderById = orderStore.myOrders.filter((item) => item.id === +id);
    setSelectedOrder(orderById[0]);
    setShowAssignPopup(true);
  };

  const handleCloseAssignPopup = () => {
    setShowAssignPopup(false);
  };

  const handleCloseTruckPopup = () => {
    setShowTruckPopup(false);
  };

  /*
   * set driver info
   */
  const [initDriverInfo, setDriverInfo] = React.useState<NewDriverDto>(
    newFormInit
  );

  /*
   * set driver info
   */
  const [initTruckInfo, setTruckInfo] = React.useState<NewTruckDto>(
    newTruckInit
  );

  /*
   * show hide new/edit driver popup
   */
  const [showDriverPopup, setShowDriverPopup] = React.useState<boolean>(false);

  /*
   * show hide new/edit driver popup
   */
  const [showTruckPopup, setShowTruckPopup] = React.useState<boolean>(false);

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  const handleCloseCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleCloseDriver = () => {
    setShowDriverPopup(false);
  };

  const handleShowDriverPopup = () => {
    setShowDriverPopup(true);
  };

  const handleShowTruckPopup = () => {
    setShowTruckPopup(true);
  };

  const [otherDocuments, setOtherDocuments] = React.useState<
    Record<'files', File[]>
  >({
    files: [],
  });

  const handleCreateDriver = async (values: any) => {
    truckOwnerStore.setDriverForm(authStore.loggedUser.id, values);

    const result = await truckOwnerStore.addDriver();

    if (result) {
      if (initDriverInfo.idCardFrontImage) {
        await truckOwnerStore.uploadDriverCardFront(
          initDriverInfo.idCardFrontImage,
          result.id
        );
      }
      if (initDriverInfo.idCardBackImage) {
        await truckOwnerStore.uploadDriverCardBack(
          initDriverInfo.idCardBackImage,
          result.id
        );
      }
      if (initDriverInfo.driverLicense) {
        await truckOwnerStore.uploadDriverLicense(
          initDriverInfo.driverLicense,
          result.id
        );
      }

      if (otherDocuments.files && otherDocuments.files.length) {
        await truckOwnerStore.uploadDriverOtherDoc(
          otherDocuments.files,
          result.id
        );
        setOtherDocuments({
          files: [],
        });
      }

      setDriverInfo(newFormInit);
      await truckOwnerStore.resetDriverForm();
      notifySuccess(t(MESSAGES_CREATED_SUCCESS));
    }

    truckOwnerStore.getMyDrivers();
    setShowDriverPopup(false);
  };

  /*
   * Action of Create button on Truck form popup
   * @params: NewTruckDto values
   * @return: void
   */
  const handleCreateTruck = async (values: any) => {
    truckOwnerStore.setTruckForm(values);
    const result = await truckOwnerStore.addTruck();
    if (result) {
      if (initTruckInfo.certificate) {
        await truckOwnerStore.uploadTruckCertificate(
          initTruckInfo.certificate,
          result.id
        );
      }

      if (otherDocuments.files && otherDocuments.files.length) {
        await truckOwnerStore.uploadTruckOtherDoc(
          otherDocuments.files,
          result.id
        );
        setOtherDocuments({
          files: [],
        });
      }

      setTruckInfo(newTruckInit);
      await truckOwnerStore.resetTruckForm();
      notifySuccess(t(MESSAGES_CREATED_SUCCESS));
    }

    truckOwnerStore.getMyTrucks();
    setShowTruckPopup(false);
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

  const handleUploadMultipleDocument = (event: any) => {
    const listFile: File[] = Object.values(event.target.files);

    if (isMaximunOtherDocument(listFile, {})) {
      notifyError(t(MESSAGES_DOCUMENT_SIZE_LIMIT));
      return;
    }

    setOtherDocuments({ files: listFile });
  };

  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    skip: 0,
    take: +pageSizeOptions[2],
    orderBy: 'id',
    orderDirection: 'DESC',
    order: {
      status: ORDER_STATUS.ASSIGNED,
    },
  });

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
  });

  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

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
   * Action of export action
   * @param: string type
   * @return: void
   */
  const handleExport = async (type: TYPE_EXPORT) => {
    if (ids?.length < 1) {
      const message: MessageDto = {
        key: 'order.export',
        type: MESSAGE_TYPE.DANGER,
        content: t(MESSAGES_SELECTED_ITEMS),
      };
      messageStore.setMessages([message]);
    } else {
      messageStore.removeMessage('order.export');
      exportCriteriaDto.ids = ids;
      exportCriteriaDto.isSelectedAll = isSelectedAll;
      const resultExport: any[] = await orderStore.exportPendingOrderListByTruckOwner(
        exportCriteriaDto
      );
      const json = formatExportAsCSVTruckOwnerOrder(
        t,
        commonStore.newDateFormat,
        resultExport
      );

      exportAsCSVorXLSTruckOwnerOrder(json, 'truckowner', type);
    }
  };

  const handleUploadCertificate = (event: any) => {
    initTruckInfo.certificate = event.target.files[0];
  };

  const handleCancel = async (id: number) => {
    setCancelOrder(id);
    setShowConfirmPopup(true);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    const result = await orderStore.truckOwnerCancel(cancelOrder);
    setCancelOrder(-1);
    if (result && handleStep) {
      handleStep(false);
    }
  };

  const handleViewInfo = async (id: number) => {
    const orderById = orderStore.myOrders.filter((item) => item.id === +id);
    setSelectedOrder(orderById[0]);
    setShowProfile(true);
  };

  const handleOrderSummary = async (id: number) => {
    resetData();
    const order = await orderStore.getOrderById(id);
    if (order?.driversData?.length > 0) {
      setDrivers(order.driversData);
    }
    if (order.createdByData) {
      setCreatedBy(order.createdByData);
    }
    if (order.trucks.length > 0) {
      setTrucks(order.trucks);
    }
    if (order.notes.length > 0) {
      setNotes(order.notes);
    }

    setSelectedOrder(order);
    setShowSummary(true);
  };

  const resetData = () => {
    setTrucks(null);
    setDrivers(null);
    setNotes(null);
    setCreatedBy(null);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[2] : 0,
      take: +pageSizeOptions[2],
      orderBy: 'id',
      orderDirection: 'DESC',
      order: {
        status: ORDER_STATUS.ASSIGNED,
      },
    });
  };

  //
  // Assign Truck and Drivers
  //
  const [selectedDrivers, setSelectedDrivers] = React.useState<any[]>([]);
  const [selectedTrucks, setSelectedTrucks] = React.useState<any[]>([]);

  const handleChangeDriver = (values: any) =>
    values.map((data: any) => {
      return setSelectedDrivers([...selectedDrivers, data.id]);
    });

  const handleChangeTruck = (values: any) =>
    values.map((data: any) => {
      return setSelectedTrucks([...selectedTrucks, data.id]);
    });

  const assignDriver = async (ids: number[]) => {
    await truckOwnerStore.assignOrderDrivers(assignId, ids);
  };

  const assignTruck = async (ids: number[]) => {
    await truckOwnerStore.assignOrderTrucks(assignId, ids);
  };

  const handleAssignOrder = async (values: any) => {
    if (selectedDrivers.length > 0 && selectedTrucks.length > 0) {
      await assignTruck(selectedTrucks);
      assignDriver(selectedDrivers);
      await orderStore.changeStatus(assignId, ORDER_STATUS.DISPATCHED);
      await orderStore.updateCommission(assignId, { ...values });
      handleCloseAssignPopup();
      // history.push(TRUCKOWNER_ORDER_ROUTERS.JOBS);
      handleStep(true);
    }
  };

  /*
   * Setting filters
   */
  const filters: FilterByDto[] = [
    {
      key: 'orderId',
      label: t(ORDER_ID),
    },
    {
      key: 'customerEmail',
      label: t(TRUCKOWNER_CUSTOMER_EMAIL),
    },
    {
      key: 'status',
      label: t(ORDER_STATUS_LABEL),
      type: FILTER_TYPE.SELECT,
      options: truckownerOrderStatus,
    },
  ];

  const [filtered, setFiltered] = React.useState<boolean>(false);

  const handleResetFilter = () => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[2],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
    setFiltered(false);
  };

  const handleFilter = (e: any, filterType: FilterByDto) => {
    setCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[2],
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
      orderBy: 'id',
      orderDirection: 'DESC',
    });
    setFiltered(true);
  };

  React.useEffect(() => {
    if (authStore.loggedUser?.id) {
      orderStore.getMyOrders(criteriaDto, authStore.loggedUser.id);
      truckOwnerStore.getMyDrivers();
      truckOwnerStore.getMyTrucks();
    }
  }, [orderStore, criteriaDto, authStore.loggedUser, truckOwnerStore]);

  return (
    <>
      <div className="block pending-order">
        <JobsOrderExport
          exportingLabel={t(FILTER_EXPORT)}
          exportingTo={exportingTo}
          exportingItems={ids}
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <Message keyName="message-order" />
        <TruckOwnerOrderGrid
          totals={orderStore.totalCountMyOrders}
          tooltip={t(JOB_ORDER_NOTE)}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          handleCancel={handleCancel}
          handleAssign={handleAssign}
          handleViewInfo={handleViewInfo}
          handleOrderSummary={handleOrderSummary}
          isSelectedAll={isSelectedAll}
        />
      </div>
      <AssignTruckAndDriverModal
        show={showAssignPopup}
        handleClose={handleCloseAssignPopup}
        handleAssign={handleAssignOrder}
        showDriverPopup={handleShowDriverPopup}
        showTruckPopup={handleShowTruckPopup}
        handleCloseDriverPopup={handleCloseDriver}
        order={selectedOrder}
        selectedDriverValues={selectedDrivers}
        selectedTruckValues={selectedTrucks}
        handleChangeDriver={handleChangeDriver}
        handleChangeTruck={handleChangeTruck}
        defaultCommission={defaultCommission}
      />
      <CreateTruckFormModal
        show={showTruckPopup}
        handleClose={handleCloseTruckPopup}
        handleCreate={handleCreateTruck}
        handleUploadCertificate={handleUploadCertificate}
        initialValues={initTruckInfo}
        handleUploadMultipleDocument={handleUploadMultipleDocument}
      />
      <CreateDriverFormModal
        show={showDriverPopup}
        handleClose={handleCloseDriver}
        handleCreate={handleCreateDriver}
        handleUploadCardFront={handleUploadCardFront}
        handleUploadCardBack={handleUploadCardBack}
        handleUploadLicense={handleUploadLicense}
        initialValues={initDriverInfo}
        handleUploadMultipleDocument={handleUploadMultipleDocument}
      />
      <CustomerProfilePopup
        title={t(CUSTOMER_ACCOUNT_INFO)}
        show={showProfile}
        handleClose={handleCloseProfile}
        order={selectedOrder}
      />
      {showSummary ? (
        <SummaryPopup
          title={t(ORDER_SUMMARY_TITLE)}
          handleClose={handleCloseSummary}
          orderItem={selectedOrder}
          driverTitle={t(ORDER_SUMMARY_DRIVERS_TITLE)}
          driversData={drivers}
          trucksData={trucks}
          truckTitle={t(ORDER_SUMMARY_TRUCKS_TITLE)}
          createdByData={createdBy}
          createdByTitle={t(ORDER_SUMMARY_CREATEDBY_TITLE)}
          id="summary-popup"
          notes={notes}
        />
      ) : null}
      <ConfirmModal
        show={showConfirmPopup}
        handleCancel={handleCloseCancel}
        handleOk={handleOk}
      >
        <p>{t(MESSAGES_CONFIRM_CANCEL)}</p>
      </ConfirmModal>
    </>
  );
};

export default observer(PendingOrderPage);
