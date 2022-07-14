import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col, Table, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import Paging from '@/libs/components/Paging';
import { pageSizeOptions } from '@/libs/constants/paging.constants';
import { OrderStoreContext } from '@/modules/order/order.store';
import { getOrderStatus } from '@/modules/order/order.constants';
import { toTimeFormat } from '@/libs/utils/time.util';
import { CommonStoreContext } from '@/libs/stores/common.store';
import { OrderTableDto } from '@/modules/order/order.dto';
import {
  ADMIN_ORDER_ROUTERS,
  TRUCKOWNER_ORDER_ROUTERS,
} from '../../router.enum';
import { THEMES } from '@/theme.enum';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  actionType?: string;
  referenceNo?: boolean;
  totals: number;
  handleChangePageItem: any;
  current: number;
  handleSelectedItems: any;
  selectedIds: string[];
  isSelectedAll: boolean;
  handleOrderSummary: any;
}

const ReportOrderGrid = (props: ComponentProps) => {
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
    referenceNo = true,
    totals,
    handleChangePageItem,
    current,
    handleSelectedItems,
    selectedIds = [],
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
    ORDER_PICKUP_ADDRESS,
    ORDER_DROPOFF_ADDRESS,
    ORDER_PICKUP_TIME,
    ORDER_STATUS_LABEL,
    ORDER_NO_ITEM,
  } = I18N;

  const [items, setItems] = React.useState<OrderTableDto[]>([]);
  const [pagingSize, setPagingSize] = React.useState<number>(
    +pageSizeOptions[1]
  );

  const [ids, setIds] = React.useState<string[]>(selectedIds);

  const [selectedStatus, setSelectedStatus] = React.useState<any[]>([]);

  const [currentPage, setCurrentPage] = React.useState<number>(current);

  const [currentPageFrame, setCurrentPageFrame] = React.useState<number>(1);

  const [currentOrder, setCurrentOrder] = React.useState<number>(-1);

  const maxPage: number = 4;
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const handleChangeSize = (event: any) => {
    setPagingSize(+event.target.value);
    setTotalPage(Math.ceil(totals / +event.target.value));
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    setCurrentPageFrame(Math.ceil(page / maxPage));
    handleChangePageItem(page);
  };

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

  const handleActiveRow = (id: any) => {
    setCurrentOrder(id);
  };

  React.useEffect(() => {
    let tmpItems: any[] = [];
    setItems(orderStore.orders);
    orderStore.orders.map((item: any) => {
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

  React.useEffect(() => {
    setCurrentPage(current);
  }, [current]);

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
              <Table className="table-wrapper">
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
                    </th>
                    {referenceNo && <th>{t(ORDER_REFERENCE_NO)}</th>}
                    <th>{t(ORDER_PICKUP_ADDRESS)}</th>
                    <th>{t(ORDER_DROPOFF_ADDRESS)}</th>
                    <th>{t(ORDER_PICKUP_TIME)}</th>
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
                            name="orderID[]"
                            defaultChecked={selectedStatus[index]?.checked}
                          />
                        </td>
                        <td className="order-id" data-th={`${t(ORDER_ID)}: `}>
                          <span
                            className="order-summary"
                            onClick={() => {
                              if (
                                process.env.REACT_APP_THEME === THEMES.TADATRUCK
                              ) {
                                window.open(
                                  `${CUSTOMER_ROUTERS.CUSTOMER_ORDER_DETAIL}${item.id}`
                                );
                              } else if (
                                process.env.REACT_APP_THEME ===
                                THEMES.TRUCKOWNER
                              ) {
                                window.open(
                                  `${TRUCKOWNER_ORDER_ROUTERS.ORDER}/${item.id}`
                                );
                              } else {
                                window.open(
                                  `${ADMIN_ORDER_ROUTERS.ADMIN_MANAGE}/${item.id}`
                                );
                              }

                              handleActiveRow(item.id);
                            }}
                          >
                            {item.orderId}
                          </span>
                        </td>
                        {referenceNo && (
                          <td data-th={`${t(ORDER_REFERENCE_NO)}: `}>
                            <span>{item.referenceNo}</span>
                          </td>
                        )}
                        <td data-th={`${t(ORDER_PICKUP_ADDRESS)}: `}>
                          <span>{item.pickupAddressText}</span>
                        </td>
                        <td data-th={`${t(ORDER_DROPOFF_ADDRESS)}: `}>
                          <span>{item.dropoffAddressText}</span>
                        </td>
                        <td data-th={`${t(ORDER_PICKUP_TIME)}: `}>
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
                          data-th={`${t(ORDER_STATUS_LABEL)}: `}
                          className="col-order-status"
                        >
                          <span>{getOrderStatus(t, item.status)}</span>
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

export default observer(ReportOrderGrid);
