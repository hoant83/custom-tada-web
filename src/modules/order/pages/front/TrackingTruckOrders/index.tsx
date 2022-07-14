/* eslint-disable react-hooks/exhaustive-deps */
import { THEMES } from '@/theme.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Col, Container, Row, Form, Button } from 'react-bootstrap';
import clsx from 'clsx';
import 'react-datetime/css/react-datetime.css';
import DateTimePicker from 'react-datetime';
import GoogleMap from '@/libs/components/GoogleMap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { useParams } from 'react-router-dom';
import { OrderStoreContext } from '@/modules/order/order.store';
import orderService from '@/modules/order/order.service';
import moment from 'moment';
import TrackingGrid from '@/modules/order/components/TrackingGrid';
import { TrackingListDto } from '@/libs/dto/TrackingList.dto';
import { GoogleMapStoreContext } from '@/libs/stores/google-map.store';
import { exportTrackingHistory } from '@/libs/utils/export.util';

const styles = makeStyles({
  root: {
    width: '200px',
  },
  rootExpand: {
    width: '350px',
  },
  rowLabel: {
    display: 'flex',
    alignItems: 'center',
    borderRight: 'solid 1px rgba(221, 221, 221, 0.65)',
  },
  rowInfo: {
    display: 'flex',
    alignItems: 'center',
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
    minWidth: '100%',
  },
  dateTimeGroup: {
    position: 'relative',
    width: '100%',
    '& input': {
      width: '100%',
      padding: '8px 15px !important',
      height: '38px',
    },
    '& i': {
      position: 'absolute',
      top: '12px',
      right: '15px',
    },
  },
  textHeadBox: {
    padding: '6px 10px',
    borderRadius: '6px',
    width: '150px',
    border: 'solid 1px #ffd424',
    textAlign: 'center',
    backgroundColor: '#fffbec',
    color: '#459cf9',
  },
  blockMap: {
    height: '900px',
    padding: '0 !important',
    '& #ggmap': {
      width: '100%',
      height: '100%',
      borderRadius: '12px',
    },
  },
});

const Wrap = React.lazy(() =>
  process.env.REACT_APP_THEME === THEMES.ADMIN
    ? import('@/modules/theme/components/AdminWrapper')
    : import('@/modules/theme/components/Wrapper')
);

const TrackingTruckOrdersPage = () => {
  const { t } = useTranslation();
  const {
    ORDER_SUMMARY_TITLE_TOP,
    ORDER_ID,
    ORDER_VIEW,
    ORDER_DOWNLOAD,
    ORDER_VEHICLE,
    ORDER_FROM,
    ORDER_TO,
    ORDER_WAYPOINT,
  } = I18N;
  const classes = styles();
  const googleMapStore = React.useContext(GoogleMapStoreContext);
  const orderStore = React.useContext(OrderStoreContext);
  const { orderID, truckID } = useParams() as any;
  const [selectedTruck, setSelectedTruck] = React.useState<any>(null);
  const [fromDate, setFromDate] = React.useState<moment.Moment>(moment());
  const [fromTime, setFromTime] = React.useState<moment.Moment>(moment());
  const [toDate, setToDate] = React.useState<moment.Moment>(moment());
  const [toTime, setToTime] = React.useState<moment.Moment>(moment());
  const [trackingHistory, setTrackingHistory] = React.useState<any>([]);
  const [isFetching, setIsFetching] = React.useState<boolean>(false);

  React.useEffect(() => {
    orderStore.getOrderById(orderID);
  }, [orderStore, orderID]);

  React.useEffect(() => {
    const curTruck = orderStore.selectedOrder?.trucks.find(
      (truck: any) => truck.id === +truckID
    );
    setSelectedTruck(curTruck);
  }, [orderStore.selectedOrder?.trucks]);

  const handleClickView = async () => {
    if (orderStore.selectedOrder?.id && selectedTruck?.id) {
      setIsFetching(true);
      const newCriteria: TrackingListDto = {
        devName: selectedTruck?.truckNo,
        fromDate: `${fromDate.format('YYYY-MM-DD')} ${fromTime.format(
          'HH:mm:00'
        )}`,
        toDate: `${toDate.format('YYYY-MM-DD')} ${toTime.format('HH:mm:00')}`,
      };
      getTrackingList(newCriteria);
    }
  };

  const handleClickDownload = async () => {
    if (orderStore.selectedOrder?.id && selectedTruck?.id) {
      setIsFetching(true);
      const newCriteria: TrackingListDto = {
        devName: selectedTruck?.truckNo,
        fromDate: `${fromDate.format('YYYY-MM-DD')} ${fromTime.format(
          'HH:mm:00'
        )}`,
        toDate: `${toDate.format('YYYY-MM-DD')} ${toTime.format('HH:mm:00')}`,
      };
      const trackingHistory = await orderService.trackingHistory(newCriteria);
      if (trackingHistory && trackingHistory.length > 0) {
        exportTrackingHistory(
          trackingHistory.map((item: any, index: number) => {
            item.orderNum = index + 1;
            return item;
          }),
          'tracking'
        );
      }
      setIsFetching(false);
    }
  };

  const getTrackingList = async (criteriaDto: TrackingListDto) => {
    const trackingHistory = await orderService.trackingHistory(criteriaDto);
    if (trackingHistory && trackingHistory.length > 0) {
      const points = trackingHistory.map((item: any) => ({
        lat: +item.lat,
        lng: +item.lng,
      }));
      googleMapStore.setPolylineHistoryData(points);
      setTruckMarker(trackingHistory[0]);
    } else {
      googleMapStore.markersHistory.map((item) => item.setMap(null));
      googleMapStore.markersHistory = [];
      googleMapStore.truckMarkers.map((item) => item.setMap(null));
      googleMapStore.truckMarkers = [];
    }
    setIsFetching(false);
    setTrackingHistory(trackingHistory);
  };

  const handleSelectedItems = (item: any) => {
    setTruckMarker(item);
  };

  const setTruckMarker = (truck: any) => {
    if (truck && Object.keys(truck).length > 0) {
      googleMapStore.moveTruckMarkers([
        {
          name: truck.dev_name,
          location: {
            lat: +truck.lat,
            lng: +truck.lng,
          },
          infoWindow: truck.address,
          type: truck.vehicle_type,
        },
      ]);
    } else {
      googleMapStore.truckMarkers.map((item) => item.setMap(null));
      googleMapStore.truckMarkers = [];
    }
  };

  return (
    <>
      <Wrap
        pageTitle={t(ORDER_SUMMARY_TITLE_TOP)}
        elementPageName={t(ORDER_ID)}
        elementPageId={orderStore.selectedOrder?.orderId || ''}
      >
        <Container fluid>
          <Row>
            <Col xl={4} className="pb-4">
              <div className="block px-5" style={{ height: '100%' }}>
                <Form>
                  <Row>
                    <Col md={2} className={classes.rowLabel}>
                      {t(ORDER_VEHICLE)}
                    </Col>
                    <Col md={10} className={classes.rowInfo}>
                      <div className={classes.boxInfo}>
                        {selectedTruck?.truckNo}
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col md={2} className={classes.rowLabel}>
                      {t(ORDER_FROM)}
                    </Col>
                    <Col md={6} className={classes.rowInfo}>
                      <div className={classes.dateTimeGroup}>
                        <DateTimePicker
                          dateFormat="DD-MM-YYYY"
                          timeFormat={false}
                          value={fromDate}
                          onChange={(date: any) => setFromDate(date)}
                        />
                        <i className="far fa-calendar-alt" />
                      </div>
                    </Col>
                    <Col md={4} className={classes.rowInfo}>
                      <div className={classes.dateTimeGroup}>
                        <DateTimePicker
                          timeFormat="HH:mm"
                          dateFormat={false}
                          value={fromTime}
                          onChange={(time: any) => setFromTime(time)}
                        />
                        <i className="far fa-clock" />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    <Col md={2} className={classes.rowLabel}>
                      {t(ORDER_TO)}
                    </Col>
                    <Col md={6} className={classes.rowInfo}>
                      <div className={classes.dateTimeGroup}>
                        <DateTimePicker
                          dateFormat="DD-MM-YYYY"
                          timeFormat={false}
                          value={toDate}
                          onChange={(date: any) => setToDate(date)}
                        />
                        <i className="far fa-calendar-alt" />
                      </div>
                    </Col>
                    <Col md={4} className={classes.rowInfo}>
                      <div className={classes.dateTimeGroup}>
                        <DateTimePicker
                          timeFormat="HH:mm"
                          dateFormat={false}
                          value={toTime}
                          onChange={(time: any) => setToTime(time)}
                        />
                        <i className="far fa-clock" />
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-2 justify-content-end">
                    <Col md={4}>
                      <Button
                        variant="dark"
                        className={classes.btnSm}
                        onClick={handleClickDownload}
                        disabled={isFetching}
                      >
                        {t(ORDER_DOWNLOAD)}
                      </Button>
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="dark"
                        className={classes.btnSm}
                        onClick={handleClickView}
                        disabled={isFetching}
                      >
                        {t(ORDER_VIEW)}
                      </Button>
                    </Col>
                  </Row>
                </Form>
                <hr />
                <Row className="mt-2">
                  <Col>
                    <div className={classes.textHeadBox}>
                      {t(ORDER_WAYPOINT)}
                    </div>
                  </Col>
                </Row>
                <TrackingGrid
                  items={trackingHistory}
                  handleSelectedItems={handleSelectedItems}
                />
              </div>
            </Col>
            <Col xl={8}>
              <div className={clsx('block', classes.blockMap)}>
                <GoogleMap markers={[]} truckMarkers={[]} />
              </div>
            </Col>
          </Row>
        </Container>
      </Wrap>
    </>
  );
};

export default observer(TrackingTruckOrdersPage);
