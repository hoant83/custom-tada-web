import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import { getPaymentType } from '@/modules/order/order.constants';
import { OrderTableDto } from '@/modules/order/order.dto';
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
import AdditionPrice from '@/modules/order/components/OrderGrid/AdditionPrice';
import { toast } from 'react-toastify';
import { toJS } from 'mobx';

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
  isSelectedAll: boolean;
  handleOrderSummary: any;
  handlePaymentDoneStoreByTruckOwner: any;
  handlePaymentDoneStoreByCustomer: any;
  handleViewInfo: any;
}

const AdminPaymentGrid = (props: ComponentProps) => {
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
    selectedIds = [],
    handleSelectedItems,
    totals,
    handleChangePageItem,
    current,
    isSelectedAll,
    handleOrderSummary,
    handlePaymentDoneStoreByTruckOwner,
    handlePaymentDoneStoreByCustomer,
    handleViewInfo,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    MENU_MANAGE_PAYMENTS,
    ORDER_ID,
    ORDER_COL_DROPOFF_ADDRESS,
    ORDER_COL_CREATED_DATE,
    ORDER_COL_PRICE,
    ORDER_NO_ITEM,
    ORDER_CURENCY,
    ORDER_DATE_TIME_FORMAT,
    CUSTOMER_TRUCK_OPERATOR,
    ORDER_PAYMENT_TYPE,
    ORDER_PAYMENT_DUE_DATE,
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
    +pageSizeOptions[1]
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
   * Set current order
   */
  const [currentOrder, setCurrentOrder] = React.useState<number>(-1);

  /*
   * Set total page
   */
  // const totals: number = items.length;
  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const handleActiveRow = (id: any) => {
    setCurrentOrder(id);
  };

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

  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

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
    setTotalPage(Math.ceil(totals / +pageSizeOptions[1]));

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
      handleChangePage(currentPage);
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
      return true;
    }

    return false;
  };

  return (
    <>
      {items && (
        <Container
          fluid
          className={`manage-orders block-table ${className ? className : ''}`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">
                  {title ? title : t(MENU_MANAGE_PAYMENTS)}
                </h3>
              </Col>
            )}
            <Col xs={12} className="block-content">
              <Table className="table-wrapper" size="sm">
                <thead>
                  <tr>
                    <th className="col-selected">
                      <Form.Check
                        type="checkbox"
                        onClick={(e: any) =>
                          handleSelectedAll(e.target.checked)
                        }
                        onChange={() => {}}
                        name="allOrderId"
                        checked={isSelectedAll}
                      />
                    </th>
                    <th className="no-wrap">
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
                    <th>{t(ORDER_COL_DROPOFF_ADDRESS)}</th>
                    <th>{t(CUSTOMER_TRUCK_OPERATOR)}</th>
                    <th>{t(ORDER_PAYMENT_TYPE)}</th>
                    <th>
                      {t(ORDER_COL_PRICE)}{' '}
                      <p className="sub-col">({t(ORDER_CURENCY)})</p>
                    </th>
                    <th>
                      {t(ORDER_COL_CREATED_DATE)}{' '}
                      <p className="sub-col">{t(ORDER_DATE_TIME_FORMAT)}</p>
                    </th>
                    <th>
                      {t(ORDER_PAYMENT_DUE_DATE)}{' '}
                      <p className="sub-col">{t(ORDER_DATE_TIME_FORMAT)}</p>
                    </th>
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
                            name="orderID[]"
                            defaultChecked={selectedStatus[index]?.checked}
                          />
                        </td>
                        <td className="order-id" data-th={`${t(ORDER_ID)}: `}>
                          <span
                            className="order-summary"
                            onClick={() => {
                              //handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${ADMIN_ORDER_ROUTERS.ORDERDETAIL.replace(
                                  ':orderID',
                                  `${item.id}`
                                )}`
                              );
                            }}
                          >
                            {item.orderId}
                          </span>
                        </td>
                        <td data-th={`${t(ORDER_COL_DROPOFF_ADDRESS)}: `}>
                          <span>
                            <Row>
                              <Col
                                onClick={() => {
                                  if (!isMobile) {
                                    handleOrderSummary(item.id);
                                    handleActiveRow(item.id);
                                    window.open(
                                      `${ADMIN_ORDER_ROUTERS.ORDERDETAIL.replace(
                                        ':orderID',
                                        `${item.id}`
                                      )}`
                                    );
                                  }
                                }}
                              >
                                {!item.dropOffFields.length ? (
                                  '-'
                                ) : (
                                  <OverlayTrigger
                                    key={'top'}
                                    placement={'top'}
                                    overlay={
                                      <Tooltip
                                        id="tooltip-right bg-white"
                                        className="bg-white"
                                      >
                                        {
                                          item.dropOffFields[0]
                                            .dropoffAddressText
                                        }
                                      </Tooltip>
                                    }
                                  >
                                    <div className="address-wrapper">
                                      <span>
                                        {
                                          item.dropOffFields[0]
                                            .dropoffAddressText
                                        }
                                      </span>
                                    </div>
                                  </OverlayTrigger>
                                )}
                              </Col>
                              {item.dropOffFields.length > 1 && (
                                <>
                                  <Dropdown>
                                    <Dropdown.Toggle className="btn-icon">
                                      <i className="far fa-caret-circle-down"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                      {item.dropOffFields.map((d, index) => (
                                        <Dropdown.Item>
                                          <span className="block-label order-item-blue-bold">
                                            {`ADD ${index + 1}: `}
                                          </span>
                                          <span className="block-value">
                                            {d.dropoffAddressText}
                                          </span>
                                        </Dropdown.Item>
                                      ))}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </>
                              )}
                            </Row>
                          </span>
                        </td>
                        <td
                          className="order-price"
                          data-th={`${t(CUSTOMER_TRUCK_OPERATOR)}: `}
                          onClick={() => {
                            if (!isMobile) {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                            }
                          }}
                        >
                          {item.owner
                            ? item.owner.companyName
                              ? item.owner.companyName
                              : item.owner.email
                            : '-'}
                          <Button
                            className="button-edit"
                            onClick={() => handleViewInfo(item.id)}
                          >
                            <i className="far fa-eye"></i>
                          </Button>
                        </td>
                        <td
                          data-th={`${t(ORDER_PAYMENT_TYPE)}: `}
                          className="col-order-status col-nowrap"
                        >
                          <span>{getPaymentType(t, item.paymentType)}</span>
                        </td>
                        <td
                          className="order-price"
                          data-th={`${t(ORDER_COL_PRICE)}: `}
                          onClick={() => {
                            if (!isMobile) {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                            }
                          }}
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
                              window.open(
                                `${ADMIN_ORDER_ROUTERS.ORDERDETAIL.replace(
                                  ':orderID',
                                  `${item.id}`
                                )}`
                              );
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

export default observer(AdminPaymentGrid);
