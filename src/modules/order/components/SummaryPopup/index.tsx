import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Button, Col, Row, Container } from 'react-bootstrap';
import SummarySection from '@/modules/order/components/SummarySection';

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
  handleClose: any;
  orderItem?: any;
  driversData?: any;
  trucksData?: any;
  createdByTitle?: any;
  createdByData?: any;
  id?: string;
  notes?: any;
  reports?: any;
  invoices?: any;
  others?: any;
}

const SummaryPopup = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    driverTitle,
    truckTitle,
    createdByTitle,
    handleClose,
    orderItem,
    driversData,
    trucksData,
    createdByData,
    id,
    notes,
    reports,
    invoices,
    others,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_SUMMARY_TITLE } = I18N;

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
              <h3 className="block-title">
                {title ? title : t(ORDER_SUMMARY_TITLE)}
              </h3>
              <Button className="btn-icon" onClick={handleClose}>
                <i className="ico ico-o-close"></i>
              </Button>
              <Row>
                <SummarySection
                  orderData={orderItem}
                  title={title}
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

export default observer(SummaryPopup);
