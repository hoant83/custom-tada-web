import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { toTimeFormat } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import { getPaymentType } from '@/modules/order/order.constants';
import { OrderTableDto } from '@/modules/order/order.dto';
import { OrderStoreContext } from '@/modules/order/order.store';
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
  tooltip?: string;
  referenceNo?: boolean;
  selectedIds: string[];
  handleSelectedItems: any;
  totals: number;
  handleChangePageItem: any;
  current: number;
  handleCancel: any;
  handleViewInfo: any;
  handleAssign: any;
  handleOrderSummary: any;
  isSelectedAll?: boolean;
}

const TruckOwnerOrderGrid = (props: ComponentProps) => {
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
    handleAssign,
    handleCancel,
    handleViewInfo,
    handleOrderSummary,
    isSelectedAll,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_ID,
    ORDER_COL_PICKUP_ADDRESS,
    ORDER_COL_DROPOFF_ADDRESS,
    ORDER_PICKUP_TIME,
    ORDER_NO_ITEM,
    ORDER_PAYMENT_TYPE,
    ORDER_ORDER_COL_PRICE,
    TRUCKOWNER_CUSTOMER_INFO,
    BUTTONS_CONFIRM,
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
   * Set current order
   */
  const [currentOrder, setCurrentOrder] = React.useState<number>(-1);

  const handleActiveRow = (id: any) => {
    setCurrentOrder(id);
  };

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
    const checkboxes = document.getElementsByName('orderID[]');

    checkboxes.forEach((item: any) => {
      item.checked = checked;
    });

    if (!checked) {
      setIds([]);
      tmpIds = [];
    } else {
      orderStore.myOrders.forEach((item: any) => {
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

  React.useEffect(() => {
    /*
     * Init selected items
     */
    if (orderStore.myOrders?.length > 0) {
      const newMyOrder = orderStore.myOrders.map((item: any) => ({
        ...item,
        priceCal: getPriceCalculate(item),
      }));
      setItems(newMyOrder);
      setTotalPage(Math.ceil(totals / +pageSizeOptions[2]));
    } else {
      setItems([]);
    }
  }, [orderStore.myOrders, totals, setItems]);

  const getPriceCalculate = (orderItem: any) => {
    let total = 0;
    let additionalPrices = 0;
    if (orderItem.additionalPrices && orderItem.additionalPrices.length > 0) {
      additionalPrices = orderItem.additionalPrices
        ?.map((item: any) => item.price)
        ?.reduce((x: number, y: number) => {
          return x + y;
        });
    }
    if (!orderItem.useSuggestedPrice) {
      total = orderItem.priceRequest + additionalPrices;
    } else {
      total = orderItem.suggestedPrice + additionalPrices;
    }
    return total;
  };

  React.useEffect(() => {
    /*
     * Init selected items
     */
    if (orderStore.myOrders?.length > 0) {
      let tmpItems: any[] = [];
      orderStore.myOrders.map((item: any) => {
        if (ids.find((e) => e === item.id?.toString())) {
          tmpItems.push({ id: item.id, checked: true });
        } else {
          tmpItems.push({ id: item.id, checked: false });
        }
        return items;
      });
      setSelectedStatus(tmpItems);
    }
    if (isSelectedAll) handleSelectedAll(true);
  }, [orderStore.myOrders, isSelectedAll]);

  return (
    <>
      {items && (
        <Container
          fluid
          className={`block-orders block-table  order-jobs ${
            className ? className : ''
          }`}
          style={style}
        >
          <Row>
            {title && (
              <Col xs={12}>
                <h3 className="block-title">{title}</h3>
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
                        name="allOrderId"
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
                    <th>{t(ORDER_COL_PICKUP_ADDRESS)}</th>
                    <th>{t(ORDER_COL_DROPOFF_ADDRESS)}</th>
                    <th>{t(ORDER_PICKUP_TIME)}</th>
                    <th>{t(ORDER_PAYMENT_TYPE)}</th>
                    <th>{t(ORDER_ORDER_COL_PRICE)}</th>
                    <th>{t(TRUCKOWNER_CUSTOMER_INFO)}</th>
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
                        <td
                          data-th={`${t(ORDER_COL_PICKUP_ADDRESS)}: `}
                          className="dropoff-address address"
                        >
                          <span
                            onClick={() => {
                              window.open(
                                `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                              );
                            }}
                          >
                            {/* {item.pickupAddressText} */}
                            <OverlayTrigger
                              key={'top'}
                              placement={'top'}
                              overlay={
                                <Tooltip
                                  id="tooltip-right bg-white"
                                  className="bg-white"
                                >
                                  {item.pickupAddressText}
                                </Tooltip>
                              }
                            >
                              <div className="address-wrapper">
                                <span>{item.pickupAddressText}</span>
                              </div>
                            </OverlayTrigger>
                          </span>
                        </td>

                        <td
                          data-th={`${t(ORDER_COL_DROPOFF_ADDRESS)}: `}
                          className="dropoff-address address"
                        >
                          <span>
                            <Row>
                              <Col
                                onClick={() => {
                                  if (!isMobile) {
                                    handleOrderSummary(item.id);
                                    handleActiveRow(item.id);
                                    window.open(
                                      `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
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
                          data-th={`${t(ORDER_PICKUP_TIME)}: `}
                          className="col-nowrap"
                          onClick={() => {
                            if (!isMobile) {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                              );
                            }
                          }}
                        >
                          <span>
                            {item.pickupTime
                              ? toTimeFormat(
                                  item.pickupTime.toLocaleString(),
                                  commonStore.dateTimeFormat
                                )
                              : '-'}
                          </span>
                        </td>

                        <td
                          data-th={`${t(ORDER_PAYMENT_TYPE)}: `}
                          className="col-order-status col-nowrap"
                          onClick={() => {
                            if (!isMobile) {
                              handleOrderSummary(item.id);
                              handleActiveRow(item.id);
                              window.open(
                                `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                              );
                            }
                          }}
                        >
                          <span>{getPaymentType(t, item.paymentType)}</span>
                        </td>
                        <td data-th={`${t(ORDER_ORDER_COL_PRICE)}: `}>
                          <span>{item.priceCal}</span>
                        </td>
                        <td>
                          <Button
                            className="btn-icon"
                            onClick={() => handleViewInfo(item.id)}
                          >
                            <i className="ico ico-order-info"></i>
                          </Button>
                        </td>
                        <td className="col-actions">
                          <ButtonGroup className="col-select-actions">
                            <span
                              className="confirm-button"
                              onClick={() => handleAssign(item.id)}
                            >
                              {t(BUTTONS_CONFIRM)}
                            </span>
                            <Button
                              className="btn-icon"
                              onClick={() => handleCancel(item.id)}
                              style={{
                                color: 'indianred',
                              }}
                            >
                              <i className="ico ico-o-close"></i>
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

export default observer(TruckOwnerOrderGrid);
