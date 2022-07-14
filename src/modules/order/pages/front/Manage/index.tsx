import ConfirmModal from '@/libs/components/ConfirmModal';
import ExportData from '@/libs/components/ExportData';
import { filtersV2 } from '@/libs/constants/order.constants';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { TYPE_EXPORT } from '@/libs/constants/type-export.constants';
import { ExportingToDto } from '@/libs/dto/ExportingTo.dto';
import { FilterByDtoV2, FilterKey } from '@/libs/dto/FilterBy.dto';
import { CommonStoreContext } from '@/libs/stores/common.store';
import {
  exportAsCSVorXLSCustomerOrder,
  formatExportAsCSVCustomerOrder,
} from '@/libs/utils/export.util';
import { scrollToElement } from '@/libs/utils/normalize.ulti';
import { retrieveFromStorage, saveToStorage } from '@/libs/utils/storage.util';
import { paymentTypes, PAYMENT_TYPE } from '@/modules/customer/customer.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import Message from '@/modules/message/components/Message';
import { MessageDto } from '@/modules/message/message.dto';
import { MESSAGE_TYPE } from '@/modules/message/message.enum';
import { MessageStoreContext } from '@/modules/message/message.store';
import { FilterBar } from '@/modules/order/components/FilterBar';
import OrderGrid from '@/modules/order/components/OrderGrid';
import Tracking from '@/modules/order/components/Tracking';
import { INIT_FILTER_TEXT, OrderStatus } from '@/modules/order/order.constants';
import {
  ExportOrderListDto,
  OrderActionsDto,
  OrderListDto,
} from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
import {
  isPossibleToCancel,
  isPossibleToEdit,
  isPossibleToFindNewTruck,
  isPossibleToViewTruckOperator,
} from '@/modules/order/order.util';
import { CUSTOMER_ORDER_ROUTERS } from '@/modules/order/router.enum';
import WrapperTheme from '@/modules/theme/components/Wrapper';
import TruckOwnerProfilePopup from '@/modules/truckowner/components/ProfilePopup';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const ManageOrderPage = () => {
  const orderStore = React.useContext(OrderStoreContext);
  const customerStore = React.useContext(CustomerStoreContext);
  const messageStore = React.useContext(MessageStoreContext);
  const commonStore = React.useContext(CommonStoreContext);
  const history = useHistory();

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_MANAGE_TITLE,
    BUTTONS_EDIT,
    BUTTONS_CANCEL,
    BUTTONS_TRACKING,
    BUTTONS_VIEW_TRUCK,
    BUTTONS_FIND_NEWTRUCK,
    JOB_ORDER_NOTE,
    FILTER_EXPORT,
    MESSAGES_SELECTED_ITEMS,
    MESSAGES_CONFIRM_CANCEL,
    ORDER_PROFILE,
    MODAL_CANCEL_ORDER,
    FILTER_SEARCH,
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
   * Setting actions in grid
   */
  const actions: OrderActionsDto[] = [
    {
      label: t(BUTTONS_EDIT),
      status: '',
      action: (id: string) => {
        handleEdit(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToEdit(status);
      },
    },
    {
      label: t(BUTTONS_CANCEL),
      status: '',
      action: (id: number) => {
        handleCancelOrder(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToCancel(status);
      },
    },
    {
      label: t(BUTTONS_VIEW_TRUCK),
      status: '',
      action: (id: number) => {
        handleViewTruckOp(id);
        setShowProfile(true);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToViewTruckOperator(status);
      },
    },
    {
      label: t(BUTTONS_FIND_NEWTRUCK),
      status: '',
      action: (id: number) => {
        handleFindNewTruck(id);
      },
      checkNewStatus: (status: string) => {
        return isPossibleToFindNewTruck(status);
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
  ];

  /*
   * show hide new/edit driver popup
   */
  const [showConfirmPopup, setShowConfirmPopup] = React.useState<boolean>(
    false
  );

  /*
   * set cacel id
   */
  const [cancelId, setCancelId] = React.useState<number>(-1);

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>([]);

  /*
   * Selected tracking order
   */
  const [selectedOrder, setSelectedOrder] = React.useState<any>({});

  const [, setCreatedBy] = React.useState<any>({});
  // const [createdBy, setCreatedBy] = React.useState<any>({});

  /*
   * Selected tracking order
   */
  const [truckOwner, setTruckOwner] = React.useState<any>({});

  /*
   * Selected tracking order
   */
  const [, setDrivers] = React.useState<any>([]);

  // const [drivers, setDrivers] = React.useState<any>([]);

  /*
   * Selected tracking order
   */
  const [, setTrucks] = React.useState<any>([]);
  // const [trucks, setTrucks] = React.useState<any>([]);

  /*
   * Selected tracking order
   */
  const [, setNotes] = React.useState<any>([]);

  // const [notes, setNotes] = React.useState<any>([]);

  /*
   * show hide truck owner profile popup
   */
  const [showProfile, setShowProfile] = React.useState<boolean>(false);

  /*
   * Get list by criteria
   */
  const [criteriaDto, setCriteriaDto] = React.useState<OrderListDto>({
    take: +pageSizeOptions[2],
    orderBy: 'id',
    orderDirection: 'DESC',
  });

  const [isSelectedAll, setIsSelectedAll] = React.useState<boolean>(false);

  const [exportCriteriaDto] = React.useState<ExportOrderListDto>({
    ids: [],
  });

  /*
   * Current page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * show hide truck owner profile popup
   */
  // const [showSummary, setShowSummary] = React.useState<boolean>(false);
  const [, setShowSummary] = React.useState<boolean>(false);

  const handleViewTruckOp = async (id: number) => {
    const truckOwner = await orderStore.getTruckOwnerInfo(id);
    if (truckOwner) {
      setTruckOwner(truckOwner);
    }
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

  /*
   * Action of Edit link
   * @param: string id
   * @return: void
   */
  const handleEdit = (id: string) => {
    const editUrl = CUSTOMER_ORDER_ROUTERS.EDIT.replace(':orderID', id);
    history.push(editUrl);
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
      const resultExport: any[] = await orderStore.exportManageOrderListByCustomer(
        exportCriteriaDto
      );
      const json = formatExportAsCSVCustomerOrder(
        t,
        commonStore.newDateFormat,
        resultExport
      );

      exportAsCSVorXLSCustomerOrder(json, 'order', type);
    }
  };

  /*
   * Action of Tracking link
   * @param: number id
   * @return: void
   */

  const [markers, setMarkers] = React.useState<any[]>([]);
  const [truckMarkers, setTruckMarkers] = React.useState<any[]>([]);

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

        // eslint-disable-next-line array-callback-return
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
            tmpTruckMarkers.push({
              lat: +orderById[0].tracking[i].lat,
              lng: +orderById[0].tracking[i].lng,
            });
          }
        }

        setMarkers(tmpMarkers);
        setTruckMarkers(tmpTruckMarkers);
        saveToStorage('trackingOrder', orderById[0].id);
      }
    },
    [orderStore.orders]
  );

  const handleFindNewTruck = async (id: number) => {
    const result = await orderStore.findNewTruck(id);
    if (result) {
      await orderStore.getOrderListByCustomer(criteriaDto);
    }
  };

  const handleCancel = () => {
    setShowConfirmPopup(false);
  };

  const handleOk = async () => {
    setShowConfirmPopup(false);
    const result = await customerStore.cancelOrderByCustomer(cancelId);
    if (result) {
      await orderStore.getOrderListByCustomer(criteriaDto);
    }
  };

  const handleCancelOrder = async (id: number) => {
    setCancelId(id);
    setShowConfirmPopup(true);
  };

  const resetData = () => {
    setTruckOwner(null);
    setTrucks(null);
    setDrivers(null);
    setNotes(null);
    setCreatedBy(null);
  };

  const handleOrderSummary = async (id: number) => {
    handleTracking(id);
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
    }
    setSelectedOrder(order);
    setShowSummary(true);
  };

  /*
   * Action of close icon on popup
   * @param: void
   * @return: void
   */
  const handleCloseProfile = () => {
    setShowProfile(false);
    setTruckOwner({});
  };

  const [filter, setFilter] = React.useState<FilterByDtoV2>(filtersV2[0]);

  const [orderManagerName, setOrderManagerName] = React.useState<string>(
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

  const [paymentType, setPaymentType] = React.useState<PAYMENT_TYPE[]>(
    paymentTypes.map((x) => x.key)
  );

  const [dropoffTo, setDropoffTo] = React.useState<string>(INIT_FILTER_TEXT);

  const [dropoffAddress, setDropoffAddress] = React.useState<string>(
    INIT_FILTER_TEXT
  );

  const [all, setAll] = React.useState<string>('');

  const getOrdersCallback = React.useCallback(async () => {
    const data = {
      skip: currentPage > 1 ? (currentPage - 1) * +pageSizeOptions[2] : 0,
      take: +pageSizeOptions[2],
      all,
      orderDirection: 'DESC',
      orderId: filterOrderId,
      referenceNo,
      pickupAddress,
      dropoffAddress,
      orderManagerName,
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
    };
    console.group('status set');
    await orderStore.getOrderListByCustomerV2(data);
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

  /*
   * Action of change page
   * @param: number page
   * @return: void
   */
  const handleChangePageItem = (page: number) => {
    setCurrentPage(page);
    setShowSummary(false);
    setCriteriaDto({
      skip: page > 1 ? (page - 1) * +pageSizeOptions[2] : 0,
      take: +pageSizeOptions[2],
      orderBy: 'id',
      orderDirection: 'DESC',
    });
    // setIsSelectedAll(false);
    // setIds([]);
  };

  return (
    <>
      <WrapperTheme pageTitle={t(ORDER_MANAGE_TITLE)}>
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
                          className="search-box"
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
        {/* end */}
        <Message className="order-message" keyName="message-order" />
        <OrderGrid
          totals={orderStore.totalCount}
          actions={actions}
          tooltip={t(JOB_ORDER_NOTE)}
          selectedIds={ids}
          handleSelectedItems={handleSelectedItems}
          handleChangePageItem={handleChangePageItem}
          current={currentPage}
          isSelectedAll={isSelectedAll}
          handleOrderSummary={handleOrderSummary}
          className="customer-orders"
        />
        <Tracking
          selectedOrder={selectedOrder}
          markers={markers}
          truckMarkers={truckMarkers}
          id="order-tracking"
        />
        <TruckOwnerProfilePopup
          title={t(ORDER_PROFILE)}
          show={showProfile}
          handleClose={handleCloseProfile}
          truckOwner={truckOwner}
        />
        <ConfirmModal
          show={showConfirmPopup}
          handleCancel={handleCancel}
          handleOk={handleOk}
          formTitle={t(MODAL_CANCEL_ORDER)}
        >
          <p>{t(MESSAGES_CONFIRM_CANCEL)}</p>
        </ConfirmModal>
      </WrapperTheme>
    </>
  );
};

export default observer(ManageOrderPage);
