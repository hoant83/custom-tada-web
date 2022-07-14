/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import ProgressOrder from '@/modules/order/components/Progress';
import GoogleMap from '@/libs/components/GoogleMap';
import { getDistance } from '@/libs/utils/mapCalculate.ulti';
import { ORDER_STATUS } from '@/modules/order/order.enum';
import orderService from '@/modules/order/order.service';
import { TRACKING } from '@/libs/constants/tracking.constants';
import { GoogleMapStoreContext } from '@/libs/stores/google-map.store';
import InfoWindow from './InfoWindow';
import { renderToString } from 'react-dom/server';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  selectedOrder?: any;
  markers?: any;
  truckMarkers?: any;
  id?: string;
}

interface Location {
  lat: number;
  lng: number;
}

interface TruckInfo {
  location: Location;
  infoWindow: any;
  name: string;
  type: TRACKING;
}

interface GPSInfo {
  location: Location;
  name: string;
  infoWindow: any;
}

let intervalTracking: any = null;

const TrackingOrder = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    title,
    selectedOrder,
    markers,
    id,
    truckMarkers,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_TRACKING_TITLE,
    ORDER_ID,
    ORDER_DISTANCE_PICKUP,
    ORDER_DISTANCE_DROPOFF,
    ORDER_GPS_DEVICE,
  } = I18N;

  const googleMapStore = React.useContext(GoogleMapStoreContext);

  const [canTracking, setCanTracking] = React.useState(true);

  React.useEffect(() => {
    resetTruckMarkers();
  }, [googleMapStore, selectedOrder]);

  const resetTruckMarkers = () => {
    if (googleMapStore.truckMarkers && googleMapStore.truckMarkers.length > 0) {
      googleMapStore.truckMarkers.map((item: any) => {
        item.setMap(null);
      });
      googleMapStore.truckMarkers = [];
    }
    if (googleMapStore.gpsMarkers && googleMapStore.gpsMarkers.length > 0) {
      googleMapStore.gpsMarkers.map((item: any) => {
        item.setMap(null);
      });
      googleMapStore.gpsMarkers = [];
    }
  };

  React.useEffect(() => {
    clearInterval(intervalTracking);
    if (
      canTracking &&
      (selectedOrder?.status === ORDER_STATUS.DISPATCHED ||
        selectedOrder?.status === ORDER_STATUS.PICKING ||
        selectedOrder?.status === ORDER_STATUS.PICK_ARRIVED ||
        selectedOrder?.status === ORDER_STATUS.PICKUPCODE_INPUTED ||
        selectedOrder?.status === ORDER_STATUS.DELIVERING ||
        selectedOrder?.status === ORDER_STATUS.DELIVERYCODE_INPUTED)
    ) {
      intervalTracking = setInterval(() => {
        trackingTruck();
      }, 5000);
    }
  });

  const trackingTruck = async () => {
    const trackingResult = await orderService.trackingTruck(selectedOrder.id);
    if (!trackingResult) {
      resetTruckMarkers();
      setCanTracking(false);
      return;
    }
    const trackingTrucks = trackingResult[0];
    const trackingGPSs = trackingResult[1];
    const truckInfos: TruckInfo[] = [];
    const gpsInfos: GPSInfo[] = [];

    if (trackingTrucks[0]?.info) {
      truckInfos.push({
        name: trackingTrucks[0].info.dev_name,
        location: {
          lat: +trackingTrucks[0].info.lat,
          lng: +trackingTrucks[0].info.lng,
        },
        infoWindow: renderToString(
          <InfoWindow
            orderID={selectedOrder.id}
            truckID={trackingTrucks[0].truckId}
            info={trackingTrucks[0].info}
          />
        ),
        type: trackingTrucks[0].info.vehicle_type,
      });
    }
    if (trackingGPSs[0]) {
      gpsInfos.push({
        name: trackingGPSs[0].driverId,
        location: {
          lat: +trackingGPSs[0].lat,
          lng: +trackingGPSs[0].lng,
        },
        infoWindow: t(ORDER_GPS_DEVICE),
      });
    }
    googleMapStore.moveTruckMarkers(
      truckInfos && truckInfos.length > 0 ? truckInfos : [],
      gpsInfos && gpsInfos.length > 0 ? gpsInfos : []
    );
  };

  return (
    <>
      <Container
        className={`tracking-wrapper ${className ? className : ''}`}
        fluid
        id={id}
      >
        <Row className="block-tracking" style={style}>
          <Col xs={12} className="block-content">
            <h3 className="block-title">
              {title ? title : t(ORDER_TRACKING_TITLE)}
            </h3>
            <Row>
              <Col xs={12} md={4} className="item">
                <span className="item-label">{t(ORDER_ID)}</span>
                <span className="item-value">
                  {selectedOrder?.orderId ?? ''}
                </span>
              </Col>
              <Col xs={12} md={4} className="item">
                <span className="item-label">{t(ORDER_DISTANCE_PICKUP)}</span>
                <span className="item-value">
                  {truckMarkers[0]
                    ? getDistance(truckMarkers[0], markers[0]).toString() +
                      ' km'
                    : '0 km'}
                </span>
              </Col>
              <Col xs={12} md={4} className="item">
                <span className="item-label">{t(ORDER_DISTANCE_DROPOFF)}</span>
                <span className="item-value">
                  {truckMarkers[0]
                    ? getDistance(
                        truckMarkers[0],
                        markers[markers.length - 1]
                      ).toString() + ' km'
                    : '0 km'}
                </span>
              </Col>
            </Row>
          </Col>
          <Col xs={12} className="block-map">
            <GoogleMap markers={markers} truckMarkers={truckMarkers} />
          </Col>
        </Row>
        {selectedOrder?.status === ORDER_STATUS.CUSTCANCEL ||
        selectedOrder?.status === ORDER_STATUS.DRIVERCANCEL ? (
          <ProgressOrder
            orderStatus={selectedOrder?.beforeCancel ?? ''}
            verifiedDelivery={selectedOrder?.verifiedDelivery ?? false}
            verifiedPickup={selectedOrder?.verifiedPickup ?? false}
            skippedDelivery={selectedOrder?.skippedVerifiedDelivery ?? false}
          />
        ) : (
          <ProgressOrder
            orderStatus={selectedOrder?.status ?? ''}
            verifiedDelivery={selectedOrder?.verifiedDelivery ?? false}
            verifiedPickup={selectedOrder?.verifiedPickup ?? false}
            skippedDelivery={selectedOrder?.skippedVerifiedDelivery ?? false}
          />
        )}
        {children}
      </Container>
    </>
  );
};

export default observer(TrackingOrder);
