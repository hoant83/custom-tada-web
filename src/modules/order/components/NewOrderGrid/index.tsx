import Paging from '@/libs/components/Paging';
import { I18N } from '@/modules/lang/i18n.enum';
import OrderSummaryItem from '@/modules/order/components/SummaryItem';
import { OrderStoreContext } from '@/modules/order/order.store';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  totals: number;
  handleChangePageItem: any;
  current: number;
  handleAcceptOrder: any;
}

const NewOrderGrid = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    totals,
    handleChangePageItem,
    current,
    handleAcceptOrder,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_MANAGE_TITLE, ORDER_NO_ITEM } = I18N;

  /*
   * Set paging size
   */
  const [pagingSize] = React.useState<number>(2);

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
    if (orderStore.newOrders) {
      setTotalPage(Math.ceil(totals / 2));
    }
  }, [orderStore, orderStore.newOrders, totals]);

  return (
    <>
      {orderStore.newOrders && totalPage > 0 ? (
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
              {orderStore.newOrders.map((item: any, index: number) => (
                <OrderSummaryItem
                  handleAcceptOrder={handleAcceptOrder}
                  orderItem={item}
                  key={`order-summary-item-${index}`}
                />
              ))}
            </Col>
          </Row>
          {children}
          {totalPage > 1 && (
            <>
              <Paging
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
      ) : (
        <>
          <div
            className="message no-item"
            style={{ marginTop: '10px', paddingLeft: '28px' }}
          >
            {t(ORDER_NO_ITEM)}
          </div>
        </>
      )}
    </>
  );
};

export default observer(NewOrderGrid);
