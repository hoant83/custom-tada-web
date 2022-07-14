import React from 'react';
import { observer } from 'mobx-react-lite';
import { Row, Col } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { ORDER_STATUS } from '@/modules/order/order.enum';
import { isActiveOrderStatus } from '@/modules/order/order.util';
import { checkDeliveryCode } from '@/libs/utils/normalize.ulti';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  orderStatus: ORDER_STATUS;
  verifiedDelivery: any[];
  verifiedPickup?: boolean;
  skippedDelivery?: boolean;
}

const ProgressOrder = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    orderStatus,
    verifiedDelivery,
    verifiedPickup,
    skippedDelivery,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_ACTIONLOG_CREATED,
    ORDER_ACTIONLOG_ASSIGNED,
    ORDER_ACTIONLOG_DISPATCHED,
    ORDER_ACTIONLOG_PICK_ARRIVED,
    ORDER_ACTIONLOG_PCODEINPUTED,
    ORDER_ACTIONLOG_DELIVERING,
    ORDER_ACTIONLOG_DCODEINPUTTED,
    ORDER_ACTIONLOG_DELIVERED,
  } = I18N;

  return (
    <>
      <Row
        className={`block-progress ${className ? className : ''}`}
        style={style}
      >
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            isActiveOrderStatus(ORDER_STATUS.CREATED, orderStatus)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-noti-order"></i>
          </span>
          <span className="item-value">{t(ORDER_ACTIONLOG_CREATED)}</span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            isActiveOrderStatus(ORDER_STATUS.ASSIGNED, orderStatus)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-find-driver"></i>
          </span>
          <span className="item-value">{t(ORDER_ACTIONLOG_ASSIGNED)}</span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            isActiveOrderStatus(ORDER_STATUS.DISPATCHED, orderStatus)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-o-dispatched"></i>
          </span>
          <span className="item-value">{t(ORDER_ACTIONLOG_DISPATCHED)}</span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            isActiveOrderStatus(ORDER_STATUS.PICK_ARRIVED, orderStatus)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-o-arrive-pickup"></i>
          </span>
          <span className="item-value">{t(ORDER_ACTIONLOG_PICK_ARRIVED)}</span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${verifiedPickup === true ? 'active' : ''}`}
        >
          <span className="item-icon">
            <i className="ico ico-pickup"></i>
          </span>
          <span className="item-value">
            {ReactHtmlParser(t(ORDER_ACTIONLOG_PCODEINPUTED))}
          </span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            isActiveOrderStatus(ORDER_STATUS.DELIVERING, orderStatus)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-start-delivering"></i>
          </span>
          <span className="item-value">{t(ORDER_ACTIONLOG_DELIVERING)}</span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            checkDeliveryCode(verifiedDelivery, skippedDelivery ?? false)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-delivery"></i>
          </span>
          <span className="item-value">
            {ReactHtmlParser(t(ORDER_ACTIONLOG_DCODEINPUTTED))}
          </span>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          xl={3}
          className={`item ${
            isActiveOrderStatus(ORDER_STATUS.DELIVERED, orderStatus)
              ? 'active'
              : ''
          }`}
        >
          <span className="item-icon">
            <i className="ico ico-delivered"></i>
          </span>
          <span className="item-value">{t(ORDER_ACTIONLOG_DELIVERED)}</span>
        </Col>
      </Row>
      {children}
    </>
  );
};

export default observer(ProgressOrder);
