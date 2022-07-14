/* eslint-disable react-hooks/exhaustive-deps */
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  getOrderStatus,
  getOrderStatusStyle,
} from '@/modules/order/order.constants';
import { OrderActionsDto, OrderTableDto } from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
import { ADMIN_ORDER_ROUTERS } from '@/modules/order/router.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button,
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
import Price from '../../OrderGrid/Price';
import { getVehicleType } from '@/libs/utils/export.util';
import AdditionPrice from '@/modules/order/components/OrderGrid/AdditionPrice';
import { toast } from 'react-toastify';

// Paging

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  referenceNo?: boolean;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
  handleEdit: any;
  handleDelete: any;
  handleChangePageItem: any;
  current: number;
  actionType?: string;
  actions: OrderActionsDto[];
  handleOrderSummary?: any;
  handlePaymentDoneStoreByTruckOwner: any;
  handlePaymentDoneStoreByCustomer: any;
  handleReload: any;
  isSelectedAll?: boolean;
}

const OrderGridAdmin = (props: ComponentProps) => {
  const commonStore = React.useContext(CommonStoreContext);
  const orderStore = React.useContext(OrderStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    referenceNo = true,
    selectedIds = [],
    handleSelectedItems,
    totals,
    handleChangePageItem,
    current,
    actionType = 'listing',
    actions,
    handleOrderSummary,
    handlePaymentDoneStoreByTruckOwner,
    handlePaymentDoneStoreByCustomer,
    handleReload,
    isSelectedAll,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_MANAGE_TITLE,
    ORDER_ID,
    ORDER_REFERENCE_NO,
    ORDER_STATUS_LABEL,
    BUTTONS_CANCEL,
    BUTTONS_CUSTOMER_CANCEL,
    BUTTONS_TRUCKOWNER_CANCEL,
    BUTTONS_TRUCKOWNER_DELETE,
    BUTTONS_ASSIGN_AS_TRUCKOWNER,
    ORDER_COL_VEHICLETYPE,
    ORDER_COL_CREATED_DATE,
    ORDER_COL_DROPOFF_ADDRESS,
    ORDER_COL_PRICE,
    ORDER_PAYMENT_DUE_DATE,
    ORDER_DATE_TIME_FORMAT,
    ORDER_PAYMENT_DONE,
    ORDER_PAYMENT_DONE_CUSTOMER,
    ORDER_PAYMENT_DONE_TRUCK,
    MESSAGES_UPDATE_SUCCESS,
  } = I18N;

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
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  /*
   * Set frame Page
   */
  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(
    current
  );

  /*
   * Set current order
   */
  const [, setCurrentOrder] = React.useState<number>(-1);

  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

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
    const checkboxes = document.getElementsByName('orderID[]');

    checkboxes.forEach((item: any) => {
      item.checked = checked;
    });

    if (!checked) {
      setIds([]);
      tmpIds = [];
    } else {
      orderStore.orders.forEach((item: any) => {
        tmpItems.push({ id: item.id, checked: checked });
        tmpIds.push(item.id.toString());
      });
      setSelectedStatus(tmpItems);
      setIds(tmpIds);
      tmpIds = ['-1'];
    }
    handleSelectedItems(tmpIds);
  };

  const handleStatus = (action: any, status: string) => {
    if (action.label === t(BUTTONS_CANCEL)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_CUSTOMER_CANCEL)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_TRUCKOWNER_CANCEL)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_TRUCKOWNER_DELETE)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_ASSIGN_AS_TRUCKOWNER)) {
      return !action.checkNewStatus(status);
    }
    return false;
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

  const handleActiveRow = (id: any) => {
    setCurrentOrder(id);
  };

  const handlePaymentDoneByCustomer = (
    showEditPaymentDone: boolean,
    orderId: number
  ) => {
    handlePaymentDoneStoreByCustomer(showEditPaymentDone, orderId);
  };

  const handlePaymentDoneByTruckOwner = (
    showEditPaymentDone: boolean,
    orderId: number
  ) => {
    handlePaymentDoneStoreByTruckOwner(showEditPaymentDone, orderId);
  };

  React.useEffect(() => {
    /*
     * Init selected items
     */
    let tmpItems: any[] = [];
    setItems(orderStore.orders);
    orderStore.orders.map((item: any) => {
      if (typeof item.dropOffFields[0] === 'string') {
        // eslint-disable-next-line array-callback-return
        item.dropOffFields.map((field: any, index: number) => {
          item.dropOffFields[index] = JSON.parse(item.dropOffFields[index]);
        });
      }
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
  }, [orderStore.orders, totals, isSelectedAll]);

  const handleSubmitAdditionalPrice = async (values: any) => {
    const result = await orderStore.updateAdditionalPrices(
      values.additionalType,
      values.additionalPrice,
      values.totalPrice,
      values.orderId
    );

    if (result) {
      handleReload();
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      return true;
    }

    return false;
  };

  // @ts-ignore
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
            <Col xs={12} className="block-content">
              <Table responsive="lg">
                <thead>
                  <tr>
                    <th className="col-selected">
                      <Form.Check
                        type="checkbox"
                        onClick={(e: any) =>
                          handleSelectedAll(e.target.checked)
                        }
                        name="allOrderId"
                        checked={isSelectedAll}
                      />
                    </th>
                    <th>
                      <span>{t(ORDER_ID)}</span>
                    </th>
                    {referenceNo && <th>{t(ORDER_REFERENCE_NO)}</th>}
                    <th>{t(ORDER_COL_VEHICLETYPE)}</th>
                    <th>{t(ORDER_COL_DROPOFF_ADDRESS)}</th>
                    <th>{t(ORDER_COL_PRICE)}</th>
                    <th>{t(ORDER_COL_CREATED_DATE)}</th>
                    <th>
                      {t(ORDER_PAYMENT_DUE_DATE)}{' '}
                      <p className="sub-col">{t(ORDER_DATE_TIME_FORMAT)}</p>
                    </th>
                    <th className="col-nowrap">{t(ORDER_STATUS_LABEL)}</th>
                    <th className="col-actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item: OrderTableDto, index: number) => (
                    <tr key={item.id}>
                      <td
                        className="col-selected"
                        onClick={() => {
                          if (!isMobile) {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                          }
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          onChange={() => handleSelectedRow(item.id.toString())}
                          value={item.id}
                          className="order-checked-item"
                          name="orderID[]"
                          defaultChecked={selectedStatus[index]?.checked}
                        />
                      </td>
                      <td
                        className="order-id"
                        data-th={`${t(ORDER_ID)}: `}
                        onClick={() => {
                          if (!isMobile) {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                          }
                        }}
                      >
                        <span
                          className="order-summary"
                          onClick={() => {
                            // handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                            window.open(
                              `${ADMIN_ORDER_ROUTERS.ADMIN_MANAGE}/${item.id}`
                            );
                          }}
                        >
                          {item.orderId}
                        </span>
                      </td>
                      {referenceNo && (
                        <td
                          data-th={`${t(ORDER_REFERENCE_NO)}: `}
                          onClick={() => {
                            if (!isMobile) {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                            }
                          }}
                        >
                          {item.referenceNo}
                        </td>
                      )}
                      <td
                        className="order-vehicle-type"
                        data-th={`${t(ORDER_COL_VEHICLETYPE)}: `}
                        onClick={() => {
                          if (!isMobile) {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                          }
                        }}
                      >
                        <span className="order-vehicle-type-text">
                          {getVehicleType(t, item)}
                        </span>
                      </td>
                      <td
                        data-th={`${t(ORDER_COL_DROPOFF_ADDRESS)}: `}
                        className="dropoff-address address"
                        onClick={() => {
                          if (!isMobile) {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                          }
                        }}
                      >
                        <OverlayTrigger
                          key={'top'}
                          placement={'top'}
                          overlay={
                            <Tooltip
                              id="tooltip-right bg-white"
                              className="bg-white"
                            >
                              {item.dropOffFields[0].dropoffAddressText}
                            </Tooltip>
                          }
                        >
                          <div className="address-wrapper">
                            <span>
                              {item.dropOffFields[0].dropoffAddressText}
                            </span>
                          </div>
                        </OverlayTrigger>
                      </td>
                      <td
                        className="order-price"
                        data-th={`${t(ORDER_COL_PRICE)}: `}
                      >
                        {(item.priceRequest || item.suggestedPrice) &&
                          !item.totalPrice && (
                            <Price
                              priceRequest={item.priceRequest}
                              suggestedPrice={item.suggestedPrice}
                              useSuggestedPrice={item.useSuggestedPrice}
                              orderId={item.id}
                              handleOrderSummary={handleOrderSummary}
                              handleActiveRow={handleActiveRow}
                            />
                          )}
                        {item.totalPrice && item.totalPrice > 0 && (
                          <AdditionPrice
                            price={
                              item.useSuggestedPrice
                                ? item.suggestedPrice
                                : item.priceRequest
                            }
                            totalPriceStored={item.totalPrice ?? 0}
                            orderId={item.id}
                            additionalPrices={item.additionalPrices ?? []}
                            handleOrderSummary={handleOrderSummary}
                            handleActiveRow={handleActiveRow}
                            handleSubmit={handleSubmitAdditionalPrice}
                          />
                        )}
                      </td>
                      <td
                        className="order-created-date-type"
                        data-th={`${t(ORDER_COL_CREATED_DATE)}: `}
                        onClick={() => {
                          if (!isMobile) {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                          }
                        }}
                      >
                        <span className="order-created-date-type-text">
                          {item.createdDate
                            ? toTimeFormat(
                                item.createdDate.toLocaleString(),
                                commonStore.newDateFormat
                              )
                            : '-'}
                        </span>
                      </td>
                      <td
                        data-th={`${t(ORDER_PAYMENT_DUE_DATE)}: `}
                        className={'order-price'}
                      >
                        {item.isPaymentDoneByCustomer &&
                        item.isPaymentDoneByTruckOwner ? (
                          <span className="order-item-blue-bold">
                            {t(ORDER_PAYMENT_DONE)}
                          </span>
                        ) : item.isPaymentDoneByCustomer ? (
                          <span className="order-item-blue-bold">
                            {t(ORDER_PAYMENT_DONE_CUSTOMER)}
                          </span>
                        ) : item.isPaymentDoneByTruckOwner ? (
                          <span className="order-item-blue-bold">
                            {t(ORDER_PAYMENT_DONE_TRUCK)}
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
                                  label={t(ORDER_PAYMENT_DONE_CUSTOMER)}
                                  checked={item.isPaymentDoneByCustomer}
                                  onClick={() => {
                                    handlePaymentDoneByCustomer(
                                      !item.isPaymentDoneByCustomer,
                                      item.id
                                    );
                                  }}
                                  id={`payment-done-${item.id}`}
                                  value={item.id}
                                />
                              </Popover.Content>
                              <Popover.Content>
                                <Form.Check
                                  type="checkbox"
                                  label={t(ORDER_PAYMENT_DONE_TRUCK)}
                                  checked={item.isPaymentDoneByTruckOwner}
                                  onClick={() => {
                                    handlePaymentDoneByTruckOwner(
                                      !item.isPaymentDoneByTruckOwner,
                                      item.id
                                    );
                                  }}
                                  id={`payment-done-by-truckowner-${item.id}`}
                                  value={item.id}
                                />
                              </Popover.Content>
                            </Popover>
                          }
                        >
                          <Button className="button-edit">
                            <i className="fas fa-edit"></i>
                          </Button>
                        </OverlayTrigger>
                      </td>
                      <td
                        data-th={`${t(ORDER_STATUS_LABEL)}: `}
                        className={`col-order-status ${getOrderStatusStyle(
                          item.status
                        )}`}
                        onClick={() => {
                          if (!isMobile) {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                          }
                        }}
                      >
                        <span>{getOrderStatus(t, item.status)}</span>
                      </td>
                      <td className="col-actions col-actions-abs">
                        {actionType === 'listing' && (
                          <Dropdown>
                            <Dropdown.Toggle className="col-select-actions">
                              <i className="ico ico-setting"></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="col-select-contents">
                              {actions.map((action: any, index: number) => (
                                <Dropdown.Item
                                  className={action.status ? action.status : ''}
                                  onClick={() => {
                                    action.action(item.id);
                                  }}
                                  key={`order-action-${index}`}
                                  disabled={handleStatus(action, item.status)}
                                >
                                  {action.label}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        )}
                      </td>
                    </tr>
                  ))}
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

export default observer(OrderGridAdmin);
