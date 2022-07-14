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
import { scrollToElement } from '@/libs/utils/normalize.ulti';
import { saveToStorage } from '@/libs/utils/storage.util';
import {
  isMaximunOtherDocument,
  notifyError,
  notifySuccess,
} from '@/libs/utils/upload.util';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import JobOrderGrid from '@/modules/order/components/JobOrderGrid';
import JobsOrderExport from '@/modules/order/components/JobsExport';
import PastJobsOrderExport from '@/modules/order/components/PastJobsExport';
import PastJobOrderGrid from '@/modules/order/components/PastJobsGrid';
import Tracking from '@/modules/order/components/Tracking';
import { truckownerOrderStatus } from '@/modules/order/order.constants';
import { ExportOrderListDto, OrderListDto } from '@/modules/order/order.dto';
import { ORDER_STATUS } from '@/modules/order/order.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import CreateDriverFormModal from '@/modules/truckowner/components/CreateDriverFormModal';
import CreateTruckFormModal from '@/modules/truckowner/components/CreateTruckFormModal';
import EditTruckAndDriverModal from '@/modules/truckowner/components/EditTruckAndDriver';
import {
  newFormInit,
  newTruckInit,
} from '@/modules/truckowner/truckowner.constants';
import { NewDriverDto, NewTruckDto } from '@/modules/truckowner/truckowner.dto';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import { observer } from 'mobx-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const DeliveringOrderPage = () => {
  const orderStore = React.useContext(OrderStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    JOB_ORDER_NOTE,
    MESSAGES_CREATED_SUCCESS,
    FILTER_EXPORT,
    MESSAGES_SELECTED_ITEMS,
    JOB_ONGOING_TITLE,
    JOB_PAST_TITLE,
    MESSAGES_UPDATE_SUCCESS,
    MESSAGES_DOCUMENT_SIZE_LIMIT,
    TRUCKOWNER_CUSTOMER_EMAIL,
    ORDER_ID,
    ORDER_STATUS_LABEL,
    ORDER_CONFIRM_CHANGE_STATUS,
  } = I18N;

  /*
   * Action of Tracking link
   * @param: number id
   * @return: void
   */

  const [markers, setMarkers] = React.useState<any[]>([]);
  const [truckMarkers, setTruckMarkers] = React.useState<any[]>([]);
  const [, setShowInvoiceVAT] = React.useState<boolean>(false);

  const handleTracking = React.useCallback(
    (id: number) => {
      const orderById = orderStore.onGoingOrders.filter(
        (item) => item.id === id
      );
      setSelectedOrder(orderById[0]);

      if (orderById.length) {
        let tmpMarkers = [];
        let tmpTruckMarkers = [];

        tmpMarkers.push({
          lat: +orderById[0].pickupAddress[0],
          lng: +orderById[0].pickupAddress[1],
        });
        // eslint-disable-next-line array-callback-return
        orderById[0].dropOffFields.map((dropOffField: any) => {
          tmpMarkers.push({
            lat: +dropOffField.dropoffAddress[0],
            lng: +dropOffField.dropoffAddress[1],
          });
        });

        if (orderById[0].tracking?.length > 0) {
          for (let i in orderById[0].tracking) {
            tmpTruckMarkers.push({
              lat: +orderById[0].tracking[i].lat,
              lng: +orderById[0].tracking[i].lng,
            });
          }
        }

        setMarkers(tmpMarkers);
        setTruckMarkers(tmpTruckMarkers);
        saveToStorage('trackingOrder', orderById[0].id);
        scrollToElement('order-tracking');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderStore.orders]
  );

  const handleOrderSummary = async (id: number) => {
    resetData();
    const orderById = orderStore.onGoingOrders.filter(
      (item) => item.id === +id
    );
    setSelectedOrder(orderById[0]);
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
    if (order.folders.length > 0) {
      getReports(id, order.folders[0].id);
      getInvoices(id, order.folders[1].id);
      getOthers(id, order.folders[2].id);
    }

    setShowSummary(true);
  };

  const resetData = () => {
    setTrucks(null);
    setDrivers(null);
    setNotes(null);
    setCreatedBy(null);
  };

  const handlePastOrderSummary = async (id: number) => {
    const orderById = orderStore.pastOrders.filter((item) => item.id === +id);
    setSelectedOrder(orderById[0]);
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

    setShowSummary(true);
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

  const [, setDrivers] = React.useState<any>([]);
  const [, setTrucks] = React.useState<any>([]);
  const [, setNotes] = React.useState<any>([]);
  const [, setCreatedBy] = React.useState<any>({});

  /*
   * show summary popup
   */
  const [, setShowSummary] = React.useState<boolean>(false);

  const handleCloseDriver = () => {
    setShowDriverPopup(false);
  };

  const handleShowDriverPopup = () => {
    setShowDriverPopup(true);
  };

  const handleShowTruckPopup = () => {
    setShowTruckPopup(true);
  };

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
      toast.dismiss();
      toast.success(t(MESSAGES_CREATED_SUCCESS));
    }

    await getMyDriver();
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

    await getMyTruck();
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

  /*
   * edit order
   */
  const [editId, setEditId] = React.useState<number>(-1);

  /*
   * Action of Edit link
   * @param: string id
   * @return: void
   */
  const handleEdit = async (id: number) => {
    await setEditId(id);
    truckOwnerStore.resetOrderTrucks();
    truckOwnerStore.resetOrderDrivers();
    await truckOwnerStore.getOrderTrucks(id);
    await truckOwnerStore.getOrderDrivers(id);
    let selectedDriverIds: number[] = [];
    truckOwnerStore.orderDrivers.map((item: any, index) => {
      selectedDriverIds[index] = item.id;
      return selectedDriverIds[index];
    });
    setSelectedDrivers(selectedDriverIds);
    let selectedTruckIds: number[] = [];
    truckOwnerStore.orderTrucks.map((item: any, index) => {
      selectedTruckIds[index] = item.id;
      return selectedTruckIds[index];
    });
    setSelectedTrucks(selectedTruckIds);
    const orderById = orderStore.onGoingOrders.filter(
      (item) => item.id === +id
    );
    setSelectedOrder(orderById[0]);
    setShowEditPopup(true);
  };

  const handleCloseEditPopup = () => {
    setShowEditPopup(false);
  };

  const handleCloseTruckPopup = () => {
    setShowTruckPopup(false);
  };

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>([]);

  const [pastIds, setPastIds] = React.useState<string[]>([]);

  /*
   * Selected tracking order
   */
  const [selectedOrder, setSelectedOrder] = React.useState<object>({});

  /*
   * messages from store
   */
  const messageStore = React.useContext(MessageStoreContext);

  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[2],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  /*
   * Get list by criteria
   */
  const [pastCriteriaDto, setPastCriteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[2],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * show hide new/edit driver popup
   */
  const [showEditPopup, setShowEditPopup] = React.useState<boolean>(false);

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

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
    // status
  });

  const handleUploadCertificate = (event: any) => {
    initTruckInfo.certificate = event.target.files[0];
  };

  const [document, setDocument] = React.useState({
    file: null,
  });

  const handleUploadDocument = async (orderId: number) => {
    if (document.file) {
      await orderStore.uploadDocument(document.file, orderId);
      orderStore.getOnGoingJobs(criteriaDto, authStore.loggedUser.id);
      orderStore.getPastOrderListByTruckOwner(
        pastCriteriaDto,
        authStore.loggedUser.id
      );
    }
  };

  const handleChangeDocument = (event: any) => {
    const file = event.target.files[0];
    setDocument({ file: file });
  };

  const [, setReports] = React.useState<any>();

  const getReports = async (orderId: number, reportId: number) => {
    const reports = await orderStore.getReports(orderId, reportId);
    if (reports) {
      setReports(reports.metadata);
    }
  };

  const [, setInvoices] = React.useState<any>();

  const getInvoices = async (orderId: number, invoiceId: number) => {
    const invoices = await orderStore.getReports(orderId, invoiceId);
    if (invoices) {
      setInvoices(invoices.metadata);
    }
  };

  const [, setOthers] = React.useState<any>();

  const getOthers = async (orderId: number, invoiceId: number) => {
    const others = await orderStore.getReports(orderId, invoiceId);
    if (others) {
      setOthers(others.metadata);
    }
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
    }
    if (ids?.length > 0) {
      messageStore.removeMessage('order.export');
      exportCriteriaDto.ids = ids;
      exportCriteriaDto.isSelectedAll = isSelectedAll;
      const resultExport = await orderStore.exportOrderListByTruckOwner(
        exportCriteriaDto
      );
      const json = formatExportAsCSVTruckOwnerOrder(
        t,
        commonStore.newDateFormat,
        resultExport
      );

      exportAsCSVorXLSTruckOwnerOrder(json, 'truckowner', type);
    }

    if (pastIds?.length > 0) {
      messageStore.removeMessage('order.export');
      exportCriteriaDto.ids = pastIds;
      exportCriteriaDto.isSelectedAll = isSelectedAllPastJobs;
      const resultExport = await orderStore.exportPastOrderListByTruckOwner(
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

  /**
   * Is selected all on-going jobs
   */
  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  /**
   * Is selected all past jobs
   */
  const [isSelectedAllPastJobs, setIsSelectedAllPastJobs] = React.useState<
    boolean
  >(false);

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

  const handleSelectedPastItems = (items: string[]) => {
    if (items[0] === '-1') setIsSelectedAllPastJobs(true);
    else setIsSelectedAllPastJobs(false);
    setPastIds(items);
  };

  /*
   * Action of change page
   * @param: number page
   * @return: void
   */
  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[2] : 0,
      take: +pageSizeOptions[2],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

  const handleChangePastJobPageItem = (page: number) => {
    setCurrentPage(page);
    setPastCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[2] : 0,
      take: +pageSizeOptions[2],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
  };

  //
  // Assign Truck and Drivers
  //
  const [selectedDrivers, setSelectedDrivers] = React.useState<any[]>([]);
  const [selectedTrucks, setSelectedTrucks] = React.useState<any[]>([]);

  const handleChangeDriver = async (values: any) => {
    let drivers: number[] = [];
    values.map((data: any, index: number) => {
      return (drivers[index] = data.value);
    });
    setSelectedDrivers(drivers);
  };

  const handleChangeTruck = async (values: any) => {
    let trucks: number[] = [];
    values.map((data: any, index: number) => {
      return (trucks[index] = data.value);
    });
    setSelectedTrucks(trucks);
  };

  const editOrderTrucks = async (ids: number[]) => {
    await truckOwnerStore.assignOrderTrucks(editId, ids);
  };

  const editOrderDrivers = async (id: number[]) => {
    await truckOwnerStore.assignOrderDrivers(editId, id);
  };

  const handleAssign = async (values: any) => {
    if (selectedDrivers.length > 0 && selectedTrucks.length > 0) {
      editOrderTrucks(selectedTrucks);
      editOrderDrivers(selectedDrivers);
      if (values.id) {
        await orderStore.updateCommission(values.id, { ...values });
        setSelectedOrder({
          ...selectedOrder,
          isEnableSetCommissionForDriver: values.isSetCommission,
          percentCommission: values.percentCommission,
          fixedCommission: values.fixedCommission,
          isEnableAllowDriverSeeCommission: values.allowSeeCommission,
          isEnableAllowDriverSeeOrdersPrice: values.allowSeePrice,
        });
      }
      handleCloseEditPopup();
    }
  };

  const getMyDriver = async () => {
    await truckOwnerStore.getMyDrivers();
  };

  const getMyTruck = async () => {
    await truckOwnerStore.getMyTrucks();
  };

  const handleViewInfoJob = async (id: number) => {
    const orderById = orderStore.onGoingOrders.filter(
      (item) => item.id === +id
    );
    setSelectedOrder(orderById[0]);
    // setShowInvoiceVAT(true);
  };

  const handleViewInfoPastJob = async (id: number) => {
    const orderById = orderStore.pastOrders.filter((item) => item.id === +id);
    setSelectedOrder(orderById[0]);
    setShowInvoiceVAT(true);
  };

  const handlePaymentDonePastOrders = async (
    isDone: boolean,
    orderId: number
  ) => {
    const result = await truckOwnerStore.editPaymentDone(isDone, orderId);
    if (result) {
      orderStore.getPastOrderListByTruckOwner(
        pastCriteriaDto,
        authStore.loggedUser.id
      );
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handlePaymentDoneOrders = async (isDone: boolean, orderId: number) => {
    const result = await truckOwnerStore.editPaymentDone(isDone, orderId);
    if (result) {
      orderStore.getOnGoingJobs(pastCriteriaDto, authStore.loggedUser.id);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  // const getPastJobs = React.useCallback(async()=> {
  //
  // })

  const [otherDocuments, setOtherDocuments] = React.useState<
    Record<'files', File[]>
  >({
    files: [],
  });

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

  const [filteredPast, setFilteredPast] = React.useState<boolean>(false);

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

  const handleFilterPast = (e: any, filterType: FilterByDto) => {
    setPastCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[2],
      searchBy: filterType.key,
      searchKeyword: e.target.search.value,
      orderBy: 'id',
      orderDirection: 'DESC',
    });
    setFilteredPast(true);
  };

  const handleResetFilterPast = () => {
    setPastCriteriaDto({
      skip: 0,
      take: +pageSizeOptions[2],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
    setFilteredPast(false);
  };

  const handleUploadMultipleDocument = (event: any) => {
    const listFile: File[] = Object.values(event.target.files);

    if (isMaximunOtherDocument(listFile, {})) {
      notifyError(t(MESSAGES_DOCUMENT_SIZE_LIMIT));
      return;
    }

    setOtherDocuments({ files: listFile });
  };

  const [
    isShowConfirmChangeStatus,
    setIsShowConfirmChangeStatus,
  ] = React.useState<boolean>(false);
  const [orderIdSelected, setOrderIdSelected] = React.useState<number | null>(
    null
  );
  const [
    statusSelected,
    setStatusSelected,
  ] = React.useState<ORDER_STATUS | null>(null);
  const [resultChangeStatus, setResultChangeStatus] = React.useState<any>();

  const handleConfirmChangeStatus = (orderId: number, status: ORDER_STATUS) => {
    setIsShowConfirmChangeStatus(true);
    setOrderIdSelected(orderId);
    setStatusSelected(status);
  };

  const handleCloseChangeStatus = () => {
    setIsShowConfirmChangeStatus(false);
    setOrderIdSelected(null);
    setStatusSelected(null);
  };

  const handleChangeStatus = async () => {
    const result = await orderStore.changeStatus(
      orderIdSelected,
      statusSelected as string
    );
    setResultChangeStatus(result);
    handleCloseChangeStatus();
  };

  React.useEffect(() => {
    if (authStore.loggedUser?.id) {
      orderStore.getOnGoingJobs(criteriaDto, authStore.loggedUser.id);

      orderStore.getPastOrderListByTruckOwner(
        pastCriteriaDto,
        authStore.loggedUser.id
      );
      truckOwnerStore.getMyDrivers();
      truckOwnerStore.getMyTrucks();
    }
  }, [
    orderStore,
    criteriaDto,
    pastCriteriaDto,
    selectedOrder,
    authStore.loggedUser,
    truckOwnerStore,
    resultChangeStatus,
  ]);

  return (
    <>
      <div className="block pending-order on-going-job">
        <h3 className="block-title">{t(JOB_ONGOING_TITLE)}</h3>
        <JobsOrderExport
          exportingLabel={t(FILTER_EXPORT)}
          exportingTo={exportingTo}
          exportingItems={ids}
          handFilter={handleFilter}
          filters={filters}
          filtered={filtered}
          handleResetFilter={handleResetFilter}
        />
        <JobOrderGrid
          totals={orderStore.totalCountOnGoingOrders}
          tooltip={t(JOB_ORDER_NOTE)}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          handleEdit={handleEdit}
          handleTracking={handleTracking}
          handleUploadDocument={handleUploadDocument}
          handleChangeDocument={handleChangeDocument}
          handleOrderSummary={handleOrderSummary}
          handleViewInfo={handleViewInfoJob}
          handlePaymentDoneStore={handlePaymentDoneOrders}
          selectedOrder={selectedOrder}
          isSelectedAll={isSelectedAll}
          handleChangeStatus={handleConfirmChangeStatus}
        />
      </div>
      <div className="block pending-order">
        <h3 className="block-title">{t(JOB_PAST_TITLE)}</h3>{' '}
        <PastJobsOrderExport
          exportingLabel={t(FILTER_EXPORT)}
          exportingTo={exportingTo}
          exportingItems={ids}
          handFilter={handleFilterPast}
          filters={filters}
          filtered={filteredPast}
          handleResetFilter={handleResetFilterPast}
        />
        <PastJobOrderGrid
          totals={orderStore.totalCountPastOrders}
          tooltip={t(JOB_ORDER_NOTE)}
          selectedIds={pastIds}
          handleSelectedItems={handleSelectedPastItems}
          handleChangePageItem={handleChangePastJobPageItem}
          current={currentPage}
          handlePastOrderSummary={handlePastOrderSummary}
          handleViewInfo={handleViewInfoPastJob}
          handlePaymentDoneStore={handlePaymentDonePastOrders}
          selectedOrder={selectedOrder}
          isSelectedAll={isSelectedAllPastJobs}
        />
      </div>
      <EditTruckAndDriverModal
        show={showEditPopup}
        handleClose={handleCloseEditPopup}
        handleCancel={handleCloseEditPopup}
        handleAssign={handleAssign}
        showDriverPopup={handleShowDriverPopup}
        showTruckPopup={handleShowTruckPopup}
        handleCloseDriverPopup={handleCloseDriver}
        selectedDriverValues={selectedDrivers}
        selectedTruckValues={selectedTrucks}
        handleChangeDriver={handleChangeDriver}
        handleChangeTruck={handleChangeTruck}
        selectedOrder={selectedOrder}
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
      <ConfirmModal
        show={isShowConfirmChangeStatus}
        handleCancel={handleCloseChangeStatus}
        handleOk={handleChangeStatus}
      >
        <p>{t(ORDER_CONFIRM_CHANGE_STATUS)}</p>
      </ConfirmModal>
      <Tracking
        selectedOrder={selectedOrder}
        markers={markers}
        truckMarkers={truckMarkers}
        id="order-tracking"
      />
      {/* <InvoiceVATPopup
        title={t(PRICING_VAT_INFORMATION)}
        show={showInvoiceVAT}
        handleClose={handleCloseInvoiceVAT}
        order={selectedOrder}
      /> */}
    </>
  );
};

export default observer(DeliveringOrderPage);
