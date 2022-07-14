import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  getOrderStatus,
  getPaymentType,
} from '@/modules/order/order.constants';
import { OrderTableDto } from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
import { TRUCKOWNER_UPDATE_STATUS_ORDER } from '@/modules/truckowner/truckowner.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  Form,
  OverlayTrigger,
  Popover,
  Row,
  Table,
  Tooltip,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { TRUCKOWNER_ORDER_ROUTERS } from '../../router.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  actionType?: string;
  tooltip?: string;
  referenceNo?: boolean;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
  handleChangePageItem: any;
  current: number;
  handleEdit: any;
  handleTracking: any;
  handleUploadDocument: any;
  handleChangeDocument: any;
  handleOrderSummary: any;
  handleViewInfo: any;
  handlePaymentDoneStore: any;
  selectedOrder?: any;
  isSelectedAll?: any;
  handleChangeStatus?: any;
}

const JobOrderGrid = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    tooltip = '',
    referenceNo = true,
    selectedIds = [],
    handleSelectedItems,
    totals,
    handleChangePageItem,
    current,
    handleEdit,
    handleTracking,
    handleOrderSummary,
    handleViewInfo,
    handlePaymentDoneStore,
    selectedOrder,
    isSelectedAll,
    handleChangeStatus,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_MANAGE_TITLE,
    ORDER_ID,
    ORDER_STATUS_LABEL,
    JOB_CUSTOMER_NAME,
    JOB_CUSTOMER_EMAIL,
    ORDER_NO_ITEM,
    ORDER_PAYMENT_TYPE,
    DRIVER_PHONE,
    ORDER_PAYMENT_DUE_DATE,
    ORDER_DATE_TIME_FORMAT,
    COMPANY_ADDRESS,
    ORDER_VAT_INFO,
    ORDER_VAT_NOT_FILL,
    ORDER_NO_VAT,
    DEFAULT_BUSSINESS_PLACEHOLDER,
    COMPANY_NAME,
    PRICING_INVOICE_VAT,
    ORDER_PAYMENT_DONE,
    ORDER_CHANGE_STATUS_TO,
  } = I18N;

  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">{t(ORDER_VAT_INFO)}</Popover.Title>
      <Popover.Content>
        {selectedOrder && selectedOrder.vat ? (
          <>
            {selectedOrder?.companyName ||
            selectedOrder?.bussinessLicenseNO ||
            selectedOrder?.address ||
            selectedOrder?.email ? (
              <>
                <Row>
                  <Col lg={4}>
                    <span className="item-label">{t(COMPANY_NAME)}</span>
                  </Col>
                  <Col lg={8}>
                    <span className="item-value">
                      {selectedOrder?.companyName ?? ''}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <span className="item-label">
                      {t(DEFAULT_BUSSINESS_PLACEHOLDER)}
                    </span>
                  </Col>
                  <Col lg={8}>
                    <span className="item-value">
                      {selectedOrder?.bussinessLicenseNO ?? ''}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <span className="item-label">{t(COMPANY_ADDRESS)}</span>
                  </Col>
                  <Col lg={8}>
                    <span className="item-value">
                      {selectedOrder?.address ?? ''}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <span className="item-label">{t('Email')}</span>
                  </Col>
                  <Col lg={8}>
                    <span className="item-value">
                      {selectedOrder?.email ?? ''}
                    </span>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <div className="desktop-center">{t(ORDER_VAT_NOT_FILL)}</div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="desktop-center">{t(ORDER_NO_VAT)}</div>
          </>
        )}
      </Popover.Content>
    </Popover>
  );

  /*
   * Seleted ids in grid
   */
  const [ids, setIds] = React.useState<string[]>(selectedIds);

  /*
   * Seleted ids in grid
   */
  const [items, setItems] = React.useState<OrderTableDto[]>([]);

  /*
   * Selected status
   */
  const [selectedStatus, setSelectedStatus] = React.useState<any[]>([]);

  /*
   * Set current order
   */
  const [currentOrder, setCurrentOrder] = React.useState<number>(-1);

  const handleActiveRow = (id: any) => {
    setCurrentOrder(id);
  };

  /*
   * Set paging size
   */
  const [pagingSize, setPagingSize] = React.useState<number>(
    +pageSizeOptions[2]
  );

  /*
   * Set current Page
   */
  const [currentPage, setCurrentPage] = React.useState<number>(current);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  /*
   * Handle when select a row
   *
   * @param string value
   * @return void
   */
  const handleSelectedRow = (value: string) => {
    const checkItem = ids.find((item) => item === value);
    if (checkItem) {
      setIds([...ids.filter((item) => item !== value)]);
      handleSelectedItems([...ids.filter((item) => item !== value)]);
    } else {
      setIds([...ids, value]);
      handleSelectedItems([...ids, value]);
    }
  };

  /*
   * Handle when select all items
   *
   * @param any event
   * @return void
   */
  const handleSelectedAll = (checked: boolean) => {
    let tmpItems: any[] = [],
      tmpIds: any[] = [];
    const checkboxes = document.getElementsByName('orderIDJob[]');

    checkboxes.forEach((item: any) => {
      item.checked = checked;
    });

    if (!checked) {
      setIds([]);
      tmpIds = [];
    } else {
      orderStore.onGoingOrders.forEach((item: any) => {
        tmpItems.push({ id: item.id, checked: checked });
        tmpIds.push(item.id.toString());
      });
      setSelectedStatus(tmpItems);
      setIds(tmpIds);
      tmpIds = ['-1'];
    }
    handleSelectedItems(tmpIds);
  };

  /*
   * Handle when changing page size
   *
   * @param number pageSize
   * @return void
   */
  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  /*
   * Handle when changing current page
   *
   * @param number page
   * @return void
   */
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    handleChangePageItem(page);
  };

  const handlePaymentDone = (showEditPaymentDone: boolean, orderId: number) => {
    handlePaymentDoneStore(showEditPaymentDone, orderId);
  };

  React.useEffect(() => {
    /*
     * Init selected items
     */
    let tmpItems: any[] = [];
    setItems(orderStore.onGoingOrders);
    orderStore.onGoingOrders.map((item: any) => {
      if (ids.find((e) => e === item.id?.toString())) {
        tmpItems.push({ id: item.id, checked: true });
      } else {
        tmpItems.push({ id: item.id, checked: false });
      }
      return items;
    });
    setSelectedStatus(tmpItems);
    setTotalPage(Math.ceil(totals / +pageSizeOptions[2]));

    if (isSelectedAll) handleSelectedAll(true);
  }, [orderStore.onGoingOrders, totals, isSelectedAll]);

  return (
    <>
      {items && (
        <Container
          fluid
          className={`block-orders order-jobs block-table ${
            className ? className : ''
          }`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">
                  {title ? title : t(ORDER_MANAGE_TITLE)}
                </h3>
              </Col>
            )}
            <Col
              xs={12}
              className="block-content table-responsive"
              style={{ overflowX: 'inherit' }}
            >
              <Table className="table-wrapper">
                <thead>
                  <tr>
                    <th className="col-selected">
                      <Form.Check
                        type="checkbox"
                        onClick={(e: any) =>
                          handleSelectedAll(e.target.checked)
                        }
                        name="allOrderIdJob"
                        checked={isSelectedAll}
                      />
                    </th>
                    <th>
                      <span>{t(ORDER_ID)}</span>
                      {tooltip && (
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={
                            <Tooltip id="tooltip-right">{tooltip}</Tooltip>
                          }
                        >
                          <div className="tooltip-icon">
                            <span className="ico ico-faq"></span>
                          </div>
                        </OverlayTrigger>
                      )}
                    </th>
                    <th>{t(JOB_CUSTOMER_NAME)}</th>
                    <th>{t(JOB_CUSTOMER_EMAIL)}</th>
                    <th>{t(DRIVER_PHONE)}</th>
                    <th>{t(ORDER_PAYMENT_TYPE)}</th>
                    <th style={{ textAlign: 'center' }}>
                      {t(PRICING_INVOICE_VAT)}
                    </th>
                    <th>
                      {t(ORDER_PAYMENT_DUE_DATE)}{' '}
                      <p className="sub-col">{t(ORDER_DATE_TIME_FORMAT)}</p>
                    </th>
                    <th>{t(ORDER_STATUS_LABEL)}</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {totalPage > 0 ? (
                    items.map((item: OrderTableDto, index: number) => (
                      <tr
                        key={`table-item-${item.id}`}
                        className={`order-item ${
                          item.id === currentOrder ? 'active' : ''
                        }`}
                      >
                        <td className="col-selected">
                          <Form.Check
                            type="checkbox"
                            onChange={() =>
                              handleSelectedRow(item.id.toString())
                            }
                            value={item.id}
                            className="order-checked-item"
                            name="orderIDJob[]"
                            defaultChecked={selectedStatus[index]?.checked}
                          />
                        </td>
                        <td className="order-id" data-th={`${t(ORDER_ID)}: `}>
                          <span
                            className="order-summary"
                            onClick={() => {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                              );
                            }}
                          >
                            {item.orderId}
                          </span>
                        </td>
                        {referenceNo && (
                          <td
                            data-th={`${t(JOB_CUSTOMER_NAME)}: `}
                            onClick={() => {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                              );
                            }}
                          >
                            <span>{item.createdByCustomer?.firstName}</span>
                          </td>
                        )}
                        <td
                          data-th={`${t(JOB_CUSTOMER_EMAIL)}: `}
                          onClick={() => {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                            window.open(
                              `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                            );
                          }}
                        >
                          <span>{item.createdByCustomer?.email}</span>
                        </td>

                        <td data-th={`${t(DRIVER_PHONE)}: `}>
                          <span>{item.createdByCustomer?.phoneNumber}</span>
                        </td>
                        <td
                          data-th={`${t(ORDER_PAYMENT_TYPE)}: `}
                          className="col-order-status col-nowrap"
                        >
                          <span>{getPaymentType(t, item.paymentType)}</span>
                        </td>
                        <td
                          data-th={`${t(PRICING_INVOICE_VAT)}: `}
                          className="desktop-center"
                        >
                          <OverlayTrigger
                            trigger="click"
                            placement={isMobile ? 'right' : 'left'}
                            overlay={popover}
                            rootClose
                          >
                            <Button
                              className="invoice-vat"
                              onClick={() => handleViewInfo(item.id)}
                            >
                              <i className="icon-ico-vat1"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                        <td
                          data-th={`${t(ORDER_PAYMENT_DUE_DATE)}: `}
                          className={'order-price pr-xl'}
                        >
                          {item.isPaymentDoneByTruckOwner ? (
                            <span className="order-item-blue-bold">
                              {t(ORDER_PAYMENT_DONE)}
                            </span>
                          ) : (
                            <span>
                              {item.paymentDueDate
                                ? toTimeFormat(
                                    item.paymentDueDate.toLocaleString(),
                                    commonStore.dateTimeFormat
                                  )
                                : '-'}
                            </span>
                          )}
                          <OverlayTrigger
                            trigger="click"
                            overlay={
                              <Popover id={'payment-done'}>
                                <Popover.Content>
                                  <Form.Check
                                    type="checkbox"
                                    label={t(ORDER_PAYMENT_DONE)}
                                    checked={item.isPaymentDoneByTruckOwner}
                                    onClick={() => {
                                      handlePaymentDone(
                                        !item.isPaymentDoneByTruckOwner,
                                        item.id
                                      );
                                    }}
                                    id={`payment-done-${item.id}`}
                                    value={item.id}
                                  />
                                </Popover.Content>
                              </Popover>
                            }
                          >
                            <Button className="button-edit">
                              <i className="icon-ico-edit-price"></i>
                            </Button>
                          </OverlayTrigger>
                        </td>
                        <td
                          data-th={`${t(ORDER_STATUS_LABEL)}: `}
                          className="col-order-status"
                          onClick={() => {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                            window.open(
                              `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                            );
                          }}
                        >
                          <span className="status">
                            {getOrderStatus(t, item.status)}
                          </span>
                        </td>
                        <td className="col-actions col-actions-abs">
                          <ButtonGroup className="col-select-actions">
                            <Button
                              className="btn-icon"
                              onClick={() => handleEdit(item.id)}
                            >
                              <i className="ico ico-edit"></i>
                            </Button>
                            {handleChangeStatus && (
                              <Dropdown>
                                <Dropdown.Toggle className="col-select-actions">
                                  <Button className="btn-icon">
                                    <i className="ico ico-mg-order"></i>
                                  </Button>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="col-select-contents">
                                  <Dropdown.Item
                                    // className="action-order-truckowner"
                                    key={'order-action-label'}
                                  >
                                    <strong>
                                      {t(ORDER_CHANGE_STATUS_TO)}:
                                    </strong>
                                  </Dropdown.Item>
                                  {TRUCKOWNER_UPDATE_STATUS_ORDER.map(
                                    (status, index) => (
                                      <Dropdown.Item
                                        // className={'action-order-truckowner'}
                                        onClick={() => {
                                          handleChangeStatus(
                                            item.id,
                                            status.value
                                          );
                                        }}
                                        key={`order-action-${index}`}
                                      >
                                        {t(status.label)}
                                      </Dropdown.Item>
                                    )
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            )}

                            <Button
                              className="btn-icon"
                              onClick={() => handleTracking(item.id)}
                            >
                              <i className="ico ico-map-note"></i>
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="table-empty">
                      <td colSpan={12}>{t(ORDER_NO_ITEM)}</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
          {children}
          {totalPage > 1 && (
            <>
              <Paging
                handleChangeSize={handleChangeSize}
                totalPage={totalPage}
                totals={totals}
                currentPageFrame={currentPageFrame}
                maxPage={maxPage}
                handleChangePage={handleChangePage}
                current={currentPage}
                pageSize={pagingSize}
              />
            </>
          )}
        </Container>
      )}
    </>
  );
};

export default observer(JobOrderGrid);
