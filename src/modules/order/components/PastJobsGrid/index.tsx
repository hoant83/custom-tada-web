/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  OverlayTrigger,
  Tooltip,
  Button,
  Popover,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { OrderStoreContext } from '@/modules/order/order.store';
import { OrderTableDto } from '@/modules/order/order.dto';
import {
  getOrderStatus,
  getPaymentType,
} from '@/modules/order/order.constants';
import { TRUCKOWNER_ORDER_ROUTERS } from '../../router.enum';
import { toTimeFormat } from '@/libs/utils/time.util';
import { CommonStoreContext } from '@/libs/stores/common.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  tooltip?: string;
  referenceNo?: boolean;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
  handleChangePageItem: any;
  current: number;
  handlePastOrderSummary: any;
  handleViewInfo: any;
  handlePaymentDoneStore: any;
  selectedOrder?: any;
  isSelectedAll?: any;
}

const PastJobOrderGrid = (props: ComponentProps) => {
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
    handlePastOrderSummary,
    handleViewInfo,
    handlePaymentDoneStore,
    selectedOrder,
    isSelectedAll,
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
    PRICING_INVOICE_VAT,
    ORDER_DATE_TIME_FORMAT,
    COMPANY_ADDRESS,
    ORDER_VAT_INFO,
    ORDER_VAT_NOT_FILL,
    ORDER_NO_VAT,
    DEFAULT_BUSSINESS_PLACEHOLDER,
    COMPANY_NAME,
    ORDER_PAYMENT_DONE,
  } = I18N;

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
    const checkboxes = document.getElementsByName('orderIDPastJob[]');

    checkboxes.forEach((item: any) => {
      item.checked = checked;
    });

    if (!checked) {
      setIds([]);
      tmpIds = [];
    } else {
      orderStore.pastOrders.forEach((item: any) => {
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

  const handlePaymentDone = (showEditPaymentDone: boolean, orderId: number) => {
    handlePaymentDoneStore(showEditPaymentDone, orderId);
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

  React.useEffect(() => {
    /*
     * Init selected items
     */
    let tmpItems: any[] = [];
    setItems(orderStore.pastOrders);
    orderStore.pastOrders.map((item: any) => {
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
  }, [orderStore.pastOrders, totals, isSelectedAll]);

  return (
    <>
      {items && (
        <Container
          fluid
          className={`block-orders block-table ${className ? className : ''}`}
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
            <Col xs={12} className="block-content table-responsive">
              <Table className="table-wrapper">
                <thead>
                  <tr>
                    <th className="col-selected">
                      <Form.Check
                        type="checkbox"
                        onClick={(e: any) =>
                          handleSelectedAll(e.target.checked)
                        }
                        name="allOrderIdPastJob"
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
                      <tr key={`table-item-${item.id}`}>
                        <td className="col-selected">
                          <Form.Check
                            type="checkbox"
                            onChange={() =>
                              handleSelectedRow(item.id.toString())
                            }
                            value={item.id}
                            className="order-checked-item"
                            name="orderIDPastJob[]"
                            defaultChecked={selectedStatus[index]?.checked}
                          />
                        </td>
                        <td className="order-id" data-th={`${t(ORDER_ID)}: `}>
                          <span
                            className="order-summary"
                            onClick={() => {
                              handlePastOrderSummary(item.id);
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
                              handlePastOrderSummary(item.id);
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
                            handlePastOrderSummary(item.id);
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
                          style={{ textAlign: 'center' }}
                        >
                          <OverlayTrigger
                            trigger="click"
                            placement="left"
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
                            handlePastOrderSummary(item.id);
                            window.open(
                              `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                            );
                          }}
                        >
                          <span className="status">
                            {getOrderStatus(t, item.status)}
                          </span>
                        </td>
                        <td className="col-actions col-actions-abs"></td>
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

export default observer(PastJobOrderGrid);
