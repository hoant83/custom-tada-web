import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core';
import './infoWindow.scss';
import clsx from 'clsx';
import {
  TRUCKOWNER_ORDER_ROUTERS,
  ADMIN_ORDER_ROUTERS,
  CUSTOMER_ORDER_ROUTERS,
} from '@/modules/order/router.enum';
import { generatePath } from 'react-router-dom';
import { THEMES } from '@/theme.enum';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { TRACKING } from '@/libs/constants/tracking.constants';

const styles = makeStyles({
  root: {
    width: '200px',
  },
  btnOutline: {
    width: '100%',
  },
  rootExpand: {
    width: '350px',
  },
  rowLabel: {
    display: 'flex',
    alignItems: 'center',
    borderRight: 'solid 1px rgba(221, 221, 221, 0.65)',
    padding: 0,
    paddingLeft: '3px',
  },
  rowInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    paddingLeft: '10px',
  },
  boxInfo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px rgba(221, 221, 221, 0.65)',
    padding: '8px 10px',
    borderRadius: '12px',
    width: '100%',
  },
  btnSm: {
    padding: '6px 10px',
    borderRadius: '6px',
  },
});

interface TrackingInfo {
  address: string;
  dev_name: string;
  dev_status: string;
  car_type: string;
  lat: number;
  lng: number;
  route_time: string;
  speed: string;
}

interface ComponentProps {
  orderID: number;
  truckID: number;
  info: TrackingInfo;
}

var currentState = 'collapse';

const InfoWindow = (props: ComponentProps) => {
  const { t } = useTranslation();
  const {
    TRUCK_PLATE_NO,
    TRUCK_STATUS,
    ORDER_TRACKING_TRUCK_SPEED,
    ORDER_TRACKING_TRUCK_DRIVING_TIME,
    ORDER_TRACKING_TRUCK_ADDRESS,
    ORDER_VIEW_GPS_DEVICE,
    ORDER_REVIEW_DRIVING_ROUTE,
    ORDER_TRACKING_TRUCK_RUNNING,
    ORDER_TRACKING_TRUCK_STOP,
    ORDER_TRACKING_TRUCK_LOST_SIGNAL,
  } = I18N;
  const classes = styles();
  const { orderID, truckID, info } = props;
  currentState = localStorage.getItem('infoWindowTracking') ?? 'collapse';

  const getTrackingUrl = (orderID: number, truckID: number) => {
    switch (process.env.REACT_APP_THEME) {
      case THEMES.ADMIN:
        return generatePath(ADMIN_ORDER_ROUTERS.TRACKING_TRUCK, {
          orderID,
          truckID,
        });
      case THEMES.TRUCKOWNER:
        return generatePath(TRUCKOWNER_ORDER_ROUTERS.TRACKING_TRUCK, {
          orderID,
          truckID,
        });
    }
    return generatePath(CUSTOMER_ORDER_ROUTERS.TRACKING_TRUCK, {
      orderID,
      truckID,
    });
  };

  return (
    <>
      <Container
        id="collapseView"
        className={classes.root}
        style={{ display: currentState === 'collapse' ? 'block' : 'none' }}
      >
        <Row>
          <Col md={12} className="px-3 text-center">
            {info.address}
          </Col>
        </Row>
        <Row className="mt-2">
          <Col
            md={12}
            className="p-0"
            dangerouslySetInnerHTML={{
              __html: `<button class="btn btn-primary ${clsx(
                classes.btnSm,
                classes.btnOutline
              )}" onclick="localStorage.setItem('infoWindowTracking', 'expand');
                document.getElementById('collapseView').style.display = 'none';
                document.getElementById('expandView').style.display = 'block'">${t(
                  ORDER_VIEW_GPS_DEVICE
                )}</button>`,
            }}
          />
        </Row>
      </Container>
      <Container
        id="expandView"
        className={classes.rootExpand}
        style={{ display: currentState === 'expand' ? 'block' : 'none' }}
      >
        <Row>
          <Col md={4} className={classes.rowLabel}>
            {t(TRUCK_PLATE_NO)}
          </Col>
          <Col md={8} className={classes.rowInfo}>
            <div className={classes.boxInfo}>{info.dev_name}</div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4} className={classes.rowLabel}>
            {t(TRUCK_STATUS)}
          </Col>
          <Col md={8} className={classes.rowInfo}>
            <div className={classes.boxInfo}>
              {+info.dev_status === TRACKING.TRUCK_RUNNING &&
                t(ORDER_TRACKING_TRUCK_RUNNING)}
              {+info.dev_status === TRACKING.TRUCK_STOP &&
                t(ORDER_TRACKING_TRUCK_STOP)}
              {+info.dev_status === TRACKING.TRUCK_LOST_SIGNAL &&
                t(ORDER_TRACKING_TRUCK_LOST_SIGNAL)}
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4} className={classes.rowLabel}>
            {t(ORDER_TRACKING_TRUCK_SPEED)}
          </Col>
          <Col md={8} className={classes.rowInfo}>
            <div className={classes.boxInfo}>{info.speed}</div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4} className={classes.rowLabel}>
            {t(ORDER_TRACKING_TRUCK_DRIVING_TIME)}
          </Col>
          <Col md={8} className={classes.rowInfo}>
            <div className={classes.boxInfo}>{info.route_time}</div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={4} className={classes.rowLabel}>
            {t(ORDER_TRACKING_TRUCK_ADDRESS)}
          </Col>
          <Col md={8} className={classes.rowInfo}>
            <div className={classes.boxInfo}>{info.address}</div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12} className="d-flex justify-content-end p-0">
            <Button
              variant="primary"
              className={classes.btnSm}
              target="_blank"
              href={getTrackingUrl(orderID, truckID)}
            >
              {t(ORDER_REVIEW_DRIVING_ROUTE)}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default InfoWindow;
