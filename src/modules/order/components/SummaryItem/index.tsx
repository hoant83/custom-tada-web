import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, ButtonGroup, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import SummarySection from '@/modules/order/components/SummarySection';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  handleAcceptOrder?: any;
  orderItem?: any;
}

const OrderSummaryItem = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    handleAcceptOrder,
    orderItem,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { BUTTONS_ACCEPT } = I18N;

  return (
    <>
      {orderItem && (
        <Container
          fluid
          className={`block order-summary-item ${className ? className : ''}`}
          style={style}
        >
          <Row>
            <SummarySection orderData={orderItem} title={title} />
            <ButtonGroup className="block-actions">
              <Button
                variant="primary"
                onClick={() => handleAcceptOrder(orderItem.id)}
              >
                <span>{t(BUTTONS_ACCEPT)}</span>
                <i className="ico ico-o-next" />
              </Button>
            </ButtonGroup>
          </Row>
          {children}
        </Container>
      )}
    </>
  );
};

export default observer(OrderSummaryItem);
