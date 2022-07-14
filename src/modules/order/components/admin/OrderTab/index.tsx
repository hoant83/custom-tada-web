/* eslint-disable array-callback-return */
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SummaryOrder from '@/modules/order/components/SumaryOrder';
import { saveToStorage } from '@/libs/utils/storage.util';
import { GoogleMapStoreContext } from '@/libs/stores/google-map.store';
import { OrderStoreContext } from '@/modules/order/order.store';
import Tracking from '../../Tracking';
interface ComponentProps {
  setCurrentOrderId?: any;
}

const AdminOrderTab = (props: ComponentProps) => {
  const orderStore = React.useContext(OrderStoreContext);
  const googleMapStore = React.useContext(GoogleMapStoreContext);
  const { setCurrentOrderId } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_SUMMARY_BASIC_INFO,
    ORDER_SUMMARY_DRIVER_TRUCK_INFO,
    ORDER_SUMMARY_TRACKING,
    ORDER_SUMMARY_TITLE,
    ORDER_SUMMARY_TRUCKOWNER_TITLE,
    ORDER_SUMMARY_DRIVERS_TITLE,
    ORDER_SUMMARY_TRUCKS_TITLE,
    ORDER_SUMMARY_CREATEDBY_TITLE,
  } = I18N;

  const [key, setKey] = useState(t(ORDER_SUMMARY_BASIC_INFO));

  const [selectedOrder, setSelectedOrder] = React.useState<any>({});

  const [truckOwner, setTruckOwner] = React.useState<any>({});

  const [drivers, setDrivers] = React.useState<any>([]);

  const [trucks, setTrucks] = React.useState<any>([]);

  const [createdBy, setCreatedBy] = React.useState<any>({});

  const [notes, setNotes] = React.useState<any>([]);

  const [reports, setReports] = React.useState<any>();

  const [markers, setMarkers] = React.useState<any[]>([]);
  const [truckMarkers, setTruckMarkers] = React.useState<any[]>([]);
  const getReports = async (orderId: number, reportId: number) => {
    const reports = await orderStore.getReports(orderId, reportId);
    if (reports) {
      setReports(reports.metadata);
    }
  };

  const [invoices, setInvoices] = React.useState<any>();

  const getInvoices = async (orderId: number, invoiceId: number) => {
    const invoices = await orderStore.getReports(orderId, invoiceId);
    if (invoices) {
      setInvoices(invoices.metadata);
    }
  };

  const handleTracking = React.useCallback((order: any) => {
    const orderById = order;
    setSelectedOrder(orderById);
    if (orderById) {
      if (typeof orderById.dropOffFields[0] === 'string') {
        for (let i = 0; i < orderById.dropOffFields.length; i++) {
          orderById.dropOffFields[i] = JSON.parse(orderById.dropOffFields[i]);
        }
      }
      let tmpMarkers = [];
      let tmpTruckMarkers = [];
      if (orderById.pickupAddress) {
        tmpMarkers.push({
          lat: +orderById.pickupAddress[0],
          lng: +orderById.pickupAddress[1],
        });
      }

      orderById.dropOffFields.map((dropOffField: any) => {
        if (dropOffField.dropoffAddress) {
          tmpMarkers.push({
            lat: +dropOffField.dropoffAddress[0],
            lng: +dropOffField.dropoffAddress[1],
          });
        }
      });

      if (orderById.tracking?.length > 0) {
        for (let i in orderById.tracking) {
          tmpTruckMarkers.push({
            lat: +orderById.tracking[i].lat,
            lng: +orderById.tracking[i].lng,
          });
        }
      }

      setMarkers(tmpMarkers);
      setTruckMarkers(tmpTruckMarkers);
      saveToStorage('trackingOrder', orderById.id);
    }
  }, []);

  const resetData = () => {
    setTruckOwner(null);
    setTrucks(null);
    setDrivers(null);
    setNotes(null);
    setCreatedBy(null);
  };

  const handleViewTruckOp = async (id: number) => {
    const truckOwner = await orderStore.getTruckOwnerInfo(id);
    if (truckOwner) {
      setTruckOwner(truckOwner);
    }
  };

  React.useEffect(() => {
    const handleOrder = async (id: number) => {
      resetData();
      const order = await orderStore.getOrderById(id);
      if (order?.driversData?.length > 0) {
        setDrivers(order.driversData);
      }
      if (order.createdByData) {
        setCreatedBy(order.createdByData);
      }
      if (order.trucks.length > 0) {
        setTrucks(order.trucks);
      }
      if (order.notes.length > 0) {
        setNotes(order.notes);
      }
      handleViewTruckOp(id);
      if (order.folders.length > 0) {
        getReports(id, order.folders[0].id);
        getInvoices(id, order.folders[1].id);
      }
      setSelectedOrder(order);
      setCurrentOrderId(order.orderId);
      handleTracking(order);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const id = parseInt(window.location.pathname.split('/')[3]);
    handleOrder(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderStore]);

  const tabs = [
    {
      eventKey: ORDER_SUMMARY_BASIC_INFO,
      title: ORDER_SUMMARY_BASIC_INFO,
    },
    {
      eventKey: ORDER_SUMMARY_DRIVER_TRUCK_INFO,
      title: ORDER_SUMMARY_DRIVER_TRUCK_INFO,
    },
  ];

  return (
    <>
      <Tabs
        className="order-summary-tabs"
        activeKey={key}
        onSelect={(k: any) => {
          setKey(k);
          googleMapStore.initMap();
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            id={`order-summary-tab-${index}`}
            eventKey={t(tab.eventKey)}
            title={t(tab.title)}
          >
            <>
              <SummaryOrder
                title={index === 0 ? t(ORDER_SUMMARY_TITLE) : ''}
                orderItem={selectedOrder}
                truckOwner={truckOwner}
                truckOwnerTitle={t(ORDER_SUMMARY_TRUCKOWNER_TITLE)}
                driverTitle={t(ORDER_SUMMARY_DRIVERS_TITLE)}
                driversData={drivers}
                trucksData={trucks}
                truckTitle={t(ORDER_SUMMARY_TRUCKS_TITLE)}
                createdByData={createdBy}
                createdByTitle={t(ORDER_SUMMARY_CREATEDBY_TITLE)}
                notes={notes}
                reports={reports}
                invoices={invoices}
                tabNo={index}
              />
            </>
          </Tab>
        ))}
        <Tab
          id="order-summary-tab-2"
          eventKey={t(ORDER_SUMMARY_TRACKING)}
          title={t(ORDER_SUMMARY_TRACKING)}
        >
          <Tracking
            selectedOrder={selectedOrder}
            markers={markers}
            truckMarkers={truckMarkers}
            id="order-tracking"
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default observer(AdminOrderTab);
