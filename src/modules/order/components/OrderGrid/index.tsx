/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
  Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { OrderStoreContext } from '@/modules/order/order.store';
import { OrderActionsDto, OrderTableDto } from '@/modules/order/order.dto';
import {
  getOrderStatus,
  getOrderStatusStyle,
} from '@/modules/order/order.constants';
import { toTimeFormat } from '@/libs/utils/time.util';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { useMediaQuery } from 'react-responsive';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import Price from './Price';
import { getVehicleType } from '@/libs/utils/export.util';
import AdditionPrice from '../OrderGrid/AdditionPrice';
import { toast } from 'react-toastify';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  actionType?: string;
  actions: OrderActionsDto[];
  tooltip?: string;
  referenceNo?: boolean;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
  handleChangePageItem: any;
  current: number;
  isSelectedAll: boolean;
  handleOrderSummary: any;
}

const OrderGrid = (props: ComponentProps) => {
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
    actionType = 'listing',
    actions,
    tooltip = '',
    referenceNo = true,
    selectedIds = [],
    handleSelectedItems,
    totals,
    handleChangePageItem,
    current,
    isSelectedAll,
    handleOrderSummary,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_MANAGE_TITLE,
    ORDER_ID,
    ORDER_REFERENCE_NO,
    ORDER_COL_DROPOFF_ADDRESS,
    ORDER_COL_CREATED_DATE,
    ORDER_COL_VEHICLETYPE,
    ORDER_COL_PRICE,
    ORDER_EDIT_LABEL,
    ORDER_STATUS_LABEL,
    ORDER_NO_ITEM,
    BUTTONS_FIND_NEWTRUCK,
    BUTTONS_VIEW_TRUCK,
    BUTTONS_EDIT,
    BUTTONS_CANCEL,
    ORDER_CURENCY,
    ORDER_DATE_TIME_FORMAT,
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
   * @param state checked
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

  const handleStatus = (action: any, status: string) => {
    if (action.label === t(BUTTONS_FIND_NEWTRUCK)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_VIEW_TRUCK)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_EDIT)) {
      return !action.checkNewStatus(status);
    }
    if (action.label === t(BUTTONS_CANCEL)) {
      return !action.checkNewStatus(status);
    }
    return false;
  };

  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  React.useEffect(() => {
    /*
     * Init selected items
     */
    let tmpItems: any[] = [];
    setItems(orderStore.orders);
    orderStore.orders.map((item: any) => {
      if (typeof item.dropOffFields[0] === 'string') {
        item.dropOffFields = item.dropOffFields.map((field: any) =>
          JSON.parse(field)
        );
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

    /**
     * Init selected all
     */
    if (isSelectedAll) handleSelectedAll(isSelectedAll);
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
                  {title ? title : t(ORDER_MANAGE_TITLE)}
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
                    {referenceNo && <th>{t(ORDER_REFERENCE_NO)}</th>}
                    <th>{t(ORDER_COL_VEHICLETYPE)}</th>
                    <th>{t(ORDER_COL_DROPOFF_ADDRESS)}</th>
                    <th>
                      {t(ORDER_COL_PRICE)}{' '}
                      <p className="sub-col">({t(ORDER_CURENCY)})</p>
                    </th>
                    <th>
                      {t(ORDER_COL_CREATED_DATE)}{' '}
                      <p className="sub-col">{t(ORDER_DATE_TIME_FORMAT)}</p>
                    </th>
                    <th className="col-nowrap">{t(ORDER_STATUS_LABEL)}</th>
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
                            name="orderID[]"
                            defaultChecked={selectedStatus[index]?.checked}
                          />
                        </td>
                        <td className="order-id" data-th={`${t(ORDER_ID)}: `}>
                          <span
                            className="order-summary"
                            onClick={() => {
                              handleActiveRow(item.id);
                              window.open(
                                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
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
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
                              );
                            }}
                          >
                            <span>{item.referenceNo}</span>
                          </td>
                        )}
                        <td
                          className="order-vehicle-type"
                          data-th={`${t(ORDER_COL_VEHICLETYPE)}: `}
                          onClick={() => {
                            if (!isMobile) {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
                              );
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
                              window.open(
                                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
                              );
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
                              window.open(
                                `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
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
                          data-th={`${t(ORDER_STATUS_LABEL)}: `}
                          className={`col-nowrap col-order-status ${getOrderStatusStyle(
                            item.status
                          )}`}
                          onClick={() => {
                            handleOrderSummary(item.id);
                            handleActiveRow(item.id);
                            window.open(
                              `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
                            );
                          }}
                        >
                          <span>{getOrderStatus(t, item.status)}</span>
                        </td>
                        <td className="col-actions col-actions-abs">
                          {actionType === 'listing' && (
                            <Dropdown>
                              <Dropdown.Toggle className="col-select-actions order-action-edit-label edit-btn">
                                <a>{t(ORDER_EDIT_LABEL)}</a>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="col-select-contents">
                                {actions.map((action: any, index: number) => (
                                  <Dropdown.Item
                                    className={
                                      action.status ? action.status : ''
                                    }
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

export default observer(OrderGrid);
