import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Button, Col, Row, Container } from 'react-bootstrap';
import SummaryOrderSection from '@/modules/order/components/SummaryOrderSection';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title: string;
  driverTitle?: string;
  truckTitle?: string;
  truckOwnerTitle?: string;
  handleClose?: any;
  orderItem?: any;
  truckOwner?: any;
  driversData?: any;
  trucksData?: any;
  createdByTitle?: any;
  createdByData?: any;
  id?: string;
  notes?: any;
  reports?: any;
  invoices?: any;
  others?: any;
  tabNo?: number;
}

const SummaryOrder = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    truckOwnerTitle,
    driverTitle,
    truckTitle,
    createdByTitle,
    handleClose,
    orderItem,
    truckOwner,
    driversData,
    trucksData,
    createdByData,
    id,
    notes,
    reports,
    invoices,
    others,
    tabNo,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_SUMMARY_TITLE } = I18N;

  const [totalPrice, setTotalPrice] = React.useState(0);
  const [commission, setCommission] = React.useState(0);

  React.useEffect(() => {
    let total = 0;
    let comm = 0;
    let additionalPrices = 0;
    let fixedCommission = 0;
    let percentCommission = 0;
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
    if (orderItem.isSetCommission) {
      fixedCommission = orderItem.fixedCommission ?? 0;
      percentCommission = orderItem.percentCommission ?? 0;
      comm = (total * percentCommission) / 100 + fixedCommission;
    }
    setTotalPrice(total);
    setCommission(comm);
  }, [orderItem]);

  return (
    <>
      <Container
        fluid
        className={`block-orders block-summary-order ${
          className ? className : ''
        }`}
        style={style}
        id={id}
      >
        <Row>
          <Col xs={12}>
            <Container
              className={`block order-summary-item ${
                className ? className : ''
              }`}
              fluid
            >
              {tabNo === 0 && (
                <h3 className="block-title">
                  {title ? title : t(ORDER_SUMMARY_TITLE)}
                </h3>
              )}
              {handleClose && (
                <Button className="btn-icon" onClick={handleClose}>
                  <i className="ico ico-o-close"></i>
                </Button>
              )}
              <Row>
                <SummaryOrderSection
                  orderData={orderItem}
                  totalPrice={totalPrice}
                  commission={commission}
                  truckOwnerTitle={truckOwnerTitle}
                  truckOwner={truckOwner}
                  driverTitle={driverTitle}
                  driversData={driversData}
                  truckTitle={truckTitle}
                  trucksData={trucksData}
                  createdByTitle={createdByTitle}
                  createdByData={createdByData}
                  notes={notes}
                  reports={reports}
                  invoices={invoices}
                  others={others}
                  tabNo={tabNo}
                />
              </Row>
              {children}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default observer(SummaryOrder);
