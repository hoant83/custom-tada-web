import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { OrderStoreContext } from '@/modules/order/order.store';
import GoogleMap from '@/libs/components/GoogleMap';
import SummarySection from '@/modules/order/components/SummarySection';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  showMap?: boolean;
  truckMarkers?: any;
}

const OrderSummary = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    showMap = true,
    truckMarkers,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_SUMMARY_TITLE } = I18N;

  const [markers, setMarkers] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (orderStore.selectedOrder && orderStore.selectedOrder.pickupAddress) {
      const data = [...markers];
      data.push({
        lat: +orderStore.selectedOrder.pickupAddress[0],
        lng: +orderStore.selectedOrder.pickupAddress[1],
      });
      // eslint-disable-next-line array-callback-return
      orderStore.selectedOrder.dropOffFields.map((dropOffField: any) => {
        if (dropOffField.dropoffAddress) {
          data.push({
            lat: +dropOffField.dropoffAddress[0],
            lng: +dropOffField.dropoffAddress[1],
          });
        }
      });
      setMarkers(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStore.selectedOrder]);

  return (
    <>
      {orderStore.selectedOrder && (
        <Container
          fluid
          className={`block-order-summary ${className ? className : ''}`}
          style={style}
        >
          <Row>
            <Col xs={12}>
              <h3 className="block-title">
                {title ? title : t(ORDER_SUMMARY_TITLE)}
              </h3>
            </Col>
            <SummarySection
              orderData={orderStore.selectedOrder}
              title={title}
            />
            {showMap && (
              <Col xs={12} className="block-map">
                <div className="block-map-wrapper">
                  <GoogleMap markers={markers} truckMarkers={truckMarkers} />
                </div>
              </Col>
            )}
          </Row>
          {children}
        </Container>
      )}
    </>
  );
};

export default observer(OrderSummary);
