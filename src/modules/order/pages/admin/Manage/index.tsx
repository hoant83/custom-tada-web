/* eslint-disable array-callback-return */
import ConfirmModal from '@/libs/components/ConfirmModal';
import ExportData from '@/libs/components/ExportData';
import { filtersV2 } from '@/libs/constants/order.constants';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import { FilterByDtoV2, FilterKey } from '@/libs/dto/FilterBy.dto';
import { CommonStoreContext } from '@/libs/stores/common.store';
import {
  exportAsCSVorXLSAdminOrder,
  formatExportAsCSVAdminOrder,
} from '@/libs/utils/export.util';
import { scrollToElement } from '@/libs/utils/normalize.ulti';
import { retrieveFromStorage, saveToStorage } from '@/libs/utils/storage.util';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import { paymentTypes, PAYMENT_TYPE } from '@/modules/customer/customer.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import Message from '@/modules/message/components/Message';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import AssignAsTruckOwnerForm from '@/modules/order/components/admin/AssignAsTruckOwnerForm';
import OrderGridAdmin from '@/modules/order/components/admin/OrderGrid';
import SecretCodePopup from '@/modules/order/components/CodePopup';
import { FilterBar } from '@/modules/order/components/FilterBar';
import Tracking from '@/modules/order/components/Tracking';
import { INIT_FILTER_TEXT, OrderStatus } from '@/modules/order/order.constants';
import {
  ExportOrderListDto,
  OrderActionsDto,
  OrderListDto,
} from '@/modules/order/order.dto';
// Grid
import { OrderStoreContext } from '@/modules/order/order.store';
import {
  isPossibleToAssignAsTruckOwner,
  isPossibleToCustomerCancelByAdmin,
  isPossibleToDriverCancelByAdmin,
  isPossibleToTruckOwnerDeleteByAdmin,
} from '@/modules/order/order.util';
import { ADMIN_ORDER_ROUTERS } from '@/modules/order/router.enum';
// Action Bar
import ActionBar from '@/modules/theme/components/ActionBar';
import AdminWrapper from '@/modules/theme/components/AdminWrapper';
import { ActionBarDto } from '@/modules/theme/theme.dto';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customerAccountTypeFilterOptions } from '@/modules/customer/customer.constants';

const ManageOrderAdminPage = () => {
  const messageStore = React.useContext(MessageStoreContext);
  const orderStore = React.useContext(OrderStoreContext);
  const adminStore = React.useContext(AdminStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_MANAGE_TITLE,
    BUTTONS_ADD_NEW,
    FILTER_EXPORT,
    MESSAGES_SELECTED_ITEMS,
    MESSAGES_CONFIRM_DELETE,
    MESSAGES_DELETE_SUCCESS,
    BUTTONS_EDIT,
    BUTTONS_CUSTOMER_CANCEL,
    BUTTONS_TRUCKOWNER_CANCEL,
    BUTTONS_DELETE,
    BUTTONS_TRUCKOWNER_DELETE,
    BUTTONS_TRACKING,
    BUTTONS_ASSIGN_AS_TRUCKOWNER,
    ORDER_SECRET_CODE_TITLE,
    BUTTONS_SHOW_SECRET_CODE,
    MESSAGES_UPDATE_SUCCESS,
    FILTER_SEARCH,
  } = I18N;

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
    // status
  });

  // -----------------------------
  // Action Bar - Process
  // -----------------------------

  const [actionsBar] = React.useState<ActionBarDto[]>([
    {
      label: BUTTONS_ADD_NEW,
      type: 'primary',
      action: () => {
        handleCreate();
      },
    },
  ]);

  const handleCreate = () => {
    history.push(ADMIN_ORDER_ROUTERS.ADMIN_CREATE);
  };

  // -----------------------------
  // Export - Process
  // -----------------------------

  /*
   * Get list by criteria
   */
  const [criteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[2],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

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

  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  const handleClose = () => {
    setShowPopup(false);
  };
  const [markers, setMarkers] = React.useState<any[]>([]);

  const [truckMarkers, setTruckMarkers] = React.useState<any[]>([]);

  const [orderId, setOrderId] = React.useState<number>(-1);

  /*
   * Seleted ids in grid
   */

  const [, setShowSummary] = React.useState<boolean>(false);

  const [, setCreatedBy] = React.useState<any>({});

  /*
   * show hide new/assign driver popup
   */
  const [truckOwners, setTruckOwners] = React.useState<any>(null);
  const [showAssignPopup, setShowAssignPopup] = React.useState<boolean>(false);
  const [selectedDrivers, setSelectedDrivers] = React.useState<any[]>([]);
  const [selectedTrucks, setSelectedTrucks] = React.useState<any[]>([]);
  const [truckOwnerId, setTruckOwnerId] = React.useState<number>(-1);
  const [dataConditionFilter, setDataConditionFilter] = React.useState<any>(
    null
  );

  /*
   * Selected tracking order
   */
  const [, setTruckOwner] = React.useState<any>({});

  /*
   * Selected tracking order
   */
  const [, setDrivers] = React.useState<any>([]);

  /*
   * Selected tracking order
   */
  const [, setTrucks] = React.useState<any>([]);

  /*
   * Selected tracking order
   */
  const [, setNotes] = React.useState<any>([]);

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
      const resultExport = await orderStore.exportManageOrderListByAdmin(
        exportCriteriaDto,
        dataConditionFilter
      );
      const json = formatExportAsCSVAdminOrder(
        t,
        commonStore.newDateFormat,
        resultExport
      );

      exportAsCSVorXLSAdminOrder(json, 'order', type);
    }
  };
  // -----------------------------
  // Grid Process
  // -----------------------------

  /*
   * set id of row that need to delete
   */
  const [deleteID, setDeleteID] = React.useState<number>(-1);

  const [truckOwnerDeleteId, setTruckOwnerDeleteId] = React.useState<number>(
    -1
  );

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  const handleEdit = (id: string) => {
    orderStore.resetUpdateAdminOrder();
    const editUrl = ADMIN_ORDER_ROUTERS.ADMIN_EDIT.replace(':orderID', id);
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
    setDeleteID(id);
  };

  const handleTruckOwnerDelete = async (id: number) => {
    setShowConfirmPopup(true);
    setTruckOwnerDeleteId(id);
  };

  const handleCloseAssignPopup = () => {
    setShowAssignPopup(false);
  };
  //

  const handleChangeDriver = (values: any) => {
    values.map((data: any) => {
      return setSelectedDrivers([...selectedDrivers, data.id]);
    });
  };

  const handleChangeTruck = (values: any) => {
    values.map((data: any) => {
      return setSelectedTrucks([...selectedTrucks, data.id]);
    });
  };

  const assignTruckOwner = async () => {
    await adminStore.assignOrderTruckOwner(orderId, truckOwnerId);
  };

  const assignDriver = async (ids: number[]) => {
    await adminStore.assignOrderDrivers(orderId, ids);
  };

  const assignTruck = async (ids: number[]) => {
    await adminStore.assignOrderTrucks(orderId, ids);
  };

  const handleAssignOrder = async () => {
    if (selectedDrivers.length > 0 && selectedTrucks.length > 0) {
      await assignTruckOwner();
      await assignDriver(selectedDrivers);
      assignTruck(selectedTrucks);
      toast.dismiss();
      toast.success(t(MESSAGES_DELETE_SUCCESS));
      handleCloseAssignPopup();
      orderStore.getOrderListByAdmin(criteriaDto);
    }
  };

  const getTruckOwnerDriver = async (truckOwnerId: number) => {
    await adminStore.getTruckOwnerDrivers(truckOwnerId);
  };

  const getTruckOwnerTruck = async (truckOwnerId: number) => {
    await adminStore.getTruckOwnerTrucks(truckOwnerId);
  };

  const handleAssignTruckOwner = async (value: any) => {
    const t = truckOwners.filter((t: any) => t.email === value);
    if (!t.length) {
      return;
    }
    const id = t[0].id;
    setTruckOwnerId(id);
    await Promise.all([getTruckOwnerDriver(id), getTruckOwnerTruck(id)]);
  };

  const handleAssignAsTruckOwner = async (id: number) => {
    setOrderId(id);
    const truckOwners = await adminStore.getAllTruckOwners();
    setTruckOwners(truckOwners);
    setShowAssignPopup(true);
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
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    if (deleteID !== -1) {
      const result = await orderStore.adminDeleteOrder(deleteID);
      if (result) {
        setDeleteID(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        orderStore.getOrderListByAdmin(criteriaDto);
      }
    }
    if (truckOwnerDeleteId !== -1) {
      const result = await adminStore.adminDeleteTruckOwner(truckOwnerDeleteId);
      if (result) {
        setTruckOwnerDeleteId(-1);
        toast.dismiss();
        toast.success(t(MESSAGES_DELETE_SUCCESS));
        orderStore.getOrderListByAdmin(criteriaDto);
      }
    }
  };

  const handlePaymentDoneByCustomer = async (
    isDone: boolean,
    orderId: number
  ) => {
    const result = await adminStore.editPaymentDoneByCustomer(isDone, orderId);
    if (result) {
      orderStore.getOrderListByAdmin(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handlePaymentDoneByTruckOwner = async (
    isDone: boolean,
    orderId: number
  ) => {
    const result = await adminStore.editPaymentDoneByTruckOwner(
      isDone,
      orderId
    );
    if (result) {
      orderStore.getOrderListByAdmin(criteriaDto);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  /*
   * Selected tracking order
   */
  const [selectedOrder, setSelectedOrder] = React.useState<any>({});

  /*
   * Setting actions in grid
   */
  const actions: OrderActionsDto[] = [
    {
      label: t(BUTTONS_EDIT),
      status: '',
      action: (id: string) => {
        handleEdit(id);
      },
    },
    {
      label: t(BUTTONS_DELETE),
      status: '',
      action: (id: number) => {
        handleDelete(id);
      },
    },
    {
      label: t(BUTTONS_TRUCKOWNER_DELETE),
      status: '',
      action: (id: number) => {
        handleTruckOwnerDelete(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToTruckOwnerDeleteByAdmin(status);
      },
    },
    {
      label: t(BUTTONS_ASSIGN_AS_TRUCKOWNER),
      status: '',
      action: (id: number) => {
        handleAssignAsTruckOwner(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToAssignAsTruckOwner(status);
      },
    },
    {
      label: t(BUTTONS_CUSTOMER_CANCEL),
      status: '',
      action: (id: number) => {
        handleCustomerCancelling(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToCustomerCancelByAdmin(status);
      },
    },
    {
      label: t(BUTTONS_TRUCKOWNER_CANCEL),
      status: '',
      action: (id: number) => {
        handleDriverCancelling(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToDriverCancelByAdmin(status);
      },
    },

    {
      label: t(BUTTONS_TRACKING),
      status: '',
      action: (id: number) => {
        handleTracking(id);
        scrollToElement('order-tracking');
      },
    },
    {
      label: t(BUTTONS_SHOW_SECRET_CODE),
      status: '',
      action: (id: number) => {
        const orderById = orderStore.orders.filter((item) => item.id === id);
        setSelectedOrder(orderById[0]);
        setShowPopup(true);
      },
    },
  ];

  const handleCustomerCancelling = async (id: number) => {
    const result = await adminStore.customerCancellingOrder(id);
    if (result) {
      await orderStore.getOrderListByAdmin(criteriaDto);
    }
  };

  const handleDriverCancelling = async (id: number) => {
    const result = await adminStore.driverCancellingOrder(id);
    if (result) {
      await orderStore.getOrderListByAdmin(criteriaDto);
    }
  };

  const handleReload = async () => {
    await orderStore.getOrderListByAdmin(criteriaDto);
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleViewTruckOp = async (id: number) => {
    const truckOwner = await orderStore.getTruckOwnerInfo(id);
    if (truckOwner) {
      setTruckOwner(truckOwner);
    }
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
    handleViewTruckOp(id);
    if (order.folders.length > 0) {
      getReports(id, order.folders[0].id);
      getInvoices(id, order.folders[1].id);
      getOthers(id, order.folders[2].id);
    }
    setSelectedOrder(order);
    setShowSummary(true);
    handleTracking(id);
  };

  const resetData = () => {
    setTruckOwner(null);
    setTrucks(null);
    setDrivers(null);
    setNotes(null);
    setCreatedBy(null);
  };

  const handleTracking = React.useCallback(
    (id: number) => {
      const orderById = orderStore.orders.filter((item) => item.id === id);
      setSelectedOrder(orderById[0]);
      if (orderById.length) {
        if (typeof orderById[0].dropOffFields[0] === 'string') {
          for (let i = 0; i < orderById[0].dropOffFields.length; i++) {
            orderById[0].dropOffFields[i] = JSON.parse(
              orderById[0].dropOffFields[i]
            );
          }
        }
        let tmpMarkers = [];
        let tmpTruckMarkers = [];
        if (orderById[0].pickupAddress) {
          tmpMarkers.push({
            lat: +orderById[0].pickupAddress[0],
            lng: +orderById[0].pickupAddress[1],
          });
        }

        orderById[0].dropOffFields.map((dropOffField: any) => {
          if (dropOffField.dropoffAddress) {
            tmpMarkers.push({
              lat: +dropOffField.dropoffAddress[0],
              lng: +dropOffField.dropoffAddress[1],
            });
          }
        });

        if (orderById[0].tracking?.length > 0) {
          for (let i in orderById[0].tracking) {
            if (orderById[0].tracking) {
              tmpTruckMarkers.push({
                lat: +orderById[0].tracking[i].lat,
                lng: +orderById[0].tracking[i].lng,
              });
            }
          }
        }

        setMarkers(tmpMarkers);
        setTruckMarkers(tmpTruckMarkers);
        saveToStorage('trackingOrder', orderById[0].id);
      }
    },
    [orderStore.orders]
  );

  const [filter, setFilter] = React.useState<FilterByDtoV2>(filtersV2[0]);

  const [orderManagerName, setOrderManagerName] = React.useState<string>(
    INIT_FILTER_TEXT
  );
  const [customerName, setCustomerName] = React.useState<string>(
    INIT_FILTER_TEXT
  );
  const [truckOwnerName, setTruckOwnerName] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [truckOwnerPartnerId, setTruckOwnerPartnerId] = React.useState<string>(
    INIT_FILTER_TEXT
  );
  const [filterOrderId, setFilterOrderId] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [referenceNo, setReferenceNo] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [pickupAddress, setPickupAddress] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [pickupFrom, setPickupFrom] = React.useState<string>(INIT_FILTER_TEXT);

  const [pickupTo, setPickupTo] = React.useState<string>(INIT_FILTER_TEXT);

  const [createdFrom, setCreatedFrom] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [createdTo, setCreatedTo] = React.useState<string>(INIT_FILTER_TEXT);

  const [dropoffFrom, setDropoffFrom] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [status, setStatus] = React.useState<string[]>(
    OrderStatus.map((x) => x.key)
  );

  const [accountType, setAccountType] = React.useState<number[]>(
    customerAccountTypeFilterOptions.map((x) => x.key)
  );

  const [paymentType, setPaymentType] = React.useState<PAYMENT_TYPE[]>(
    paymentTypes.map((x) => x.key)
  );

  const [dropoffTo, setDropoffTo] = React.useState<string>(INIT_FILTER_TEXT);

  const [dropoffAddress, setDropoffAddress] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  // const reSetCriteriaV2 = React.useCallback(() => {
  //   setCriteriaDtoV2({
  //     ...criteriaDtoV2,
  //     createdFrom,
  //     createdTo,
  //     pickupFrom,
  //     pickupTo,
  //     dropoffFrom,
  //     dropoffTo,
  //     status,
  //     paymentType,
  //   });
  // }, [
  //   createdFrom,
  //   createdTo,
  //   pickupFrom,
  //   pickupTo,
  //   dropoffFrom,
  //   dropoffTo,
  //   status,
  //   paymentType,
  // ]);

  const [all, setAll] = React.useState<string>('');

  const getOrdersCallback = React.useCallback(async () => {
    const data = {
      skip: currentPage > 1 ? (currentPage - 1) * +pageSizeOptions[2] : 0,
      take: +pageSizeOptions[2],
      orderDirection: 'DESC',
      all,
      orderId: filterOrderId,
      referenceNo,
      pickupAddress,
      dropoffAddress,
      orderManagerName,
      customerName,
      truckOwnerName,
      truckOwnerPartnerId,
      createdFrom,
      createdTo,
      pickupFrom,
      pickupTo,
      dropoffFrom,
      dropoffTo,
      status,
      paymentType,
      accountType,
    };
    setDataConditionFilter(data);
    await orderStore.getOrderListByAdminV2(data);
    const id = retrieveFromStorage('trackingOrder');
    if (id) handleTracking(+id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    all,
    filterOrderId,
    referenceNo,
    pickupAddress,
    dropoffAddress,
    orderManagerName,
    customerName,
    truckOwnerName,
    truckOwnerPartnerId,
    createdFrom,
    createdTo,
    pickupFrom,
    pickupTo,
    dropoffFrom,
    dropoffTo,
    status,
    paymentType,
    handleTracking,
    orderStore,
    accountType,
  ]);
  const handleSearch = () => {
    getOrdersCallback();
  };

  const selectAllStatus = () => {
    setStatus(OrderStatus.map((x) => x.key));
  };

  const deselectAllStatus = () => {
    setStatus([]);
  };

  const selectAllAccountType = () => {
    setAccountType(customerAccountTypeFilterOptions.map((x) => x.key));
  };

  const deselectAllAccountType = () => {
    setAccountType([]);
  };

  const selectAllPaymentType = () => {
    setPaymentType(paymentTypes.map((x) => x.key));
  };

  const deselectAllPaymentType = () => {
    setPaymentType([]);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  React.useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    orderStore,
    criteriaDto,
    currentPage,
    status,
    createdFrom,
    createdTo,
    pickupFrom,
    pickupTo,
    dropoffFrom,
    dropoffTo,
    paymentType,
    accountType,
  ]);

  const resetFilters = React.useCallback(() => {
    setFilterOrderId(INIT_FILTER_TEXT);
    setReferenceNo(INIT_FILTER_TEXT);
    selectAllStatus();
    selectAllPaymentType();
    setCreatedFrom(INIT_FILTER_TEXT);
    setCreatedTo(INIT_FILTER_TEXT);
    setPickupFrom(INIT_FILTER_TEXT);
    setPickupTo(INIT_FILTER_TEXT);
    setPickupAddress(INIT_FILTER_TEXT);
    setDropoffAddress(INIT_FILTER_TEXT);
    setDropoffTo(INIT_FILTER_TEXT);
    setDropoffFrom(INIT_FILTER_TEXT);
    setOrderManagerName(INIT_FILTER_TEXT);
    setCustomerName(INIT_FILTER_TEXT);
    setTruckOwnerName(INIT_FILTER_TEXT);
    setTruckOwnerPartnerId(INIT_FILTER_TEXT);
  }, []);

  React.useEffect(() => {
    setAll('');
    if (filter.key === FilterKey.ALL) {
    } else {
      resetFilters();
    }
  }, [filter, resetFilters]);

  return (
    <>
      <AdminWrapper pageTitle={t(ORDER_MANAGE_TITLE)}>
        <ActionBar actions={actionsBar} />

        <Container fluid>
          <Row>
            <Col xs={12} md={10}>
              <Row>
                <Col xs={12} md={2}>
                  <Dropdown>
                    <Dropdown.Toggle className="block-export-actions">
                      {t(filter.label)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="block-export-contents">
                      {filtersV2.map((filter: FilterByDtoV2) => (
                        <Dropdown.Item
                          onClick={() => {
                            setFilter(filter);
                          }}
                          key={`order-filter-${filter.key}`}
                        >
                          {t(filter.label)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={12} md={10}>
                  {filter.key === FilterKey.ALL && (
                    <Row>
                      <Col xs={10}>
                        <Form.Control
                          type="text"
                          value={all}
                          onChange={(event: any) => {
                            setAll(event.target.value);
                          }}
                          placeholder={t(FILTER_SEARCH)}
                          name="search"
                          onKeyUp={handleKeyPress}
                        />
                      </Col>
                      <Col xs={2}>
                        <button className="search-all" onClick={handleSearch}>
                          <i className="ico ico-o-next"></i>
                        </button>
                      </Col>
                    </Row>
                  )}
                  {filter.key === FilterKey.MULTIPLE && (
                    <FilterBar
                      orderId={filterOrderId}
                      setOrderId={setFilterOrderId}
                      referenceNo={referenceNo}
                      setReferenceNo={setReferenceNo}
                      status={status}
                      setStatus={setStatus}
                      accountType={accountType}
                      setAccountType={setAccountType}
                      paymentType={paymentType}
                      setPaymentType={setPaymentType}
                      pickupFrom={pickupFrom}
                      setPickupFrom={setPickupFrom}
                      pickupTo={pickupTo}
                      setPickupTo={setPickupTo}
                      pickupAddress={pickupAddress}
                      setPickupAddress={setPickupAddress}
                      dropoffFrom={dropoffFrom}
                      setDropoffFrom={setDropoffFrom}
                      dropoffTo={dropoffTo}
                      setDropoffTo={setDropoffTo}
                      dropoffAddress={dropoffAddress}
                      setDropoffAddress={setDropoffAddress}
                      orderManagerName={orderManagerName}
                      setOrderManagerName={setOrderManagerName}
                      customerName={customerName}
                      setCustomerName={setCustomerName}
                      truckOwnerName={truckOwnerName}
                      setTruckOwnerName={setTruckOwnerName}
                      truckOwnerPartnerId={truckOwnerPartnerId}
                      setTruckOwnerPartnerId={setTruckOwnerPartnerId}
                      createdFrom={createdFrom}
                      setCreatedFrom={setCreatedFrom}
                      createdTo={createdTo}
                      setCreatedTo={setCreatedTo}
                      selectAllStatus={selectAllStatus}
                      deselectAllStatus={deselectAllStatus}
                      selectAllAccountType={selectAllAccountType}
                      deselectAllAccountType={deselectAllAccountType}
                      selectAllPaymentType={selectAllPaymentType}
                      deselectAllPaymentType={deselectAllPaymentType}
                      handleKeyPress={handleKeyPress}
                      handleSearch={handleSearch}
                      resetFilters={resetFilters}
                    />
                  )}
                </Col>
              </Row>
            </Col>
            {exportingTo && (
              <Col xs={12} md={2}>
                <ExportData
                  label={t(FILTER_EXPORT)}
                  exportingTo={exportingTo}
                  exportingItems={ids}
                />
              </Col>
            )}
          </Row>
        </Container>

        <Message keyName="message-order" />
        <OrderGridAdmin
          totals={orderStore.totalCount}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          actions={actions}
          handleOrderSummary={handleOrderSummary}
          handlePaymentDoneStoreByTruckOwner={handlePaymentDoneByTruckOwner}
          handlePaymentDoneStoreByCustomer={handlePaymentDoneByCustomer}
          handleReload={handleReload}
          isSelectedAll={isSelectedAll}
        />
        <SecretCodePopup
          title={t(ORDER_SECRET_CODE_TITLE)}
          show={showPopup}
          handleClose={handleClose}
          order={selectedOrder}
        />
        <Tracking
          selectedOrder={selectedOrder}
          markers={markers}
          truckMarkers={truckMarkers}
          id="order-tracking"
        />
        {showAssignPopup && (
          <AssignAsTruckOwnerForm
            show={showAssignPopup}
            handleClose={handleCloseAssignPopup}
            handleAssign={handleAssignOrder}
            order={selectedOrder}
            selectedDriverValues={selectedDrivers}
            selectedTruckValues={selectedTrucks}
            handleAssignTruckOwner={handleAssignTruckOwner}
            handleChangeDriver={handleChangeDriver}
            handleChangeTruck={handleChangeTruck}
          />
        )}
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
        >
          <p>{t(MESSAGES_CONFIRM_DELETE)}</p>
        </ConfirmModal>
      </AdminWrapper>
    </>
  );
};

export default observer(ManageOrderAdminPage);
