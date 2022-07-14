import { CommonStoreContext } from '@/libs/stores/common.store';
import { isValidDate, toTimeFormat } from '@/libs/utils/time.util';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  getCargoType,
  getContainerSize,
  getContainerType,
  getPacketSize,
  getPaymentType,
  getServiceType,
  getTruckPayload,
  getTruckType,
} from '@/modules/order/order.constants';
import { SERVICE_TYPE } from '@/modules/order/order.enum';
import {
  concatenatedGoodsType,
  contractCarType,
} from '@/modules/truck/truck.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';
import { nonMotorizedType } from '@/modules/truck/truck.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  orderData: any;
  title: any;
  truckTitle?: any;
  driverTitle?: any;
  createdByTitle?: any;
  createdByData?: any;
  driversData?: any;
  trucksData?: any;
  notes?: any;
  reports?: any;
  invoices?: any;
  others?: any;
}

const SummarySection = (props: ComponentProps) => {
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Props of Component
   */
  const {
    orderData,
    // createdByTitle,
    // truckTitle,
    // driverTitle,
    // createdByData,
    // driversData,
    // trucksData,
    // reports,
    // invoices,
    // others,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_ID,
    ORDER_SUMMARY_SERVICETYPE,
    ORDER_CONTAINERQUANTITY,
    ORDER_CONTAINERSIZE_LABEL,
    ORDER_CONTAINERTYPE_LABEL,
    ORDER_TRUCKTYPE_LABEL,
    ORDER_TRUCK_QUANTITY,
    ORDER_TRUCK_LOAD,
    ORDER_CARGOTYPE_LABEL,
    ORDER_CARGO_NAME,
    ORDER_CARGO_WEIGHT,
    ORDER_PACKAGE_SIZE,
    ORDER_PICKUP_ADDRESS,
    ORDER_PICKUP_TIME,
    ORDER_DROPOFF_ADDRESS,
    ORDER_PAYMENT_TYPE,
    PRICING_INVOICE_VAT,
    BUTTONS_YES,
    BUTTONS_NO,
    ORDER_NOTE_TODRIVER,
    MENU_MANAGE_NEWORDER,
    ORDER_ORDER_COL_PRICE,
    ORDER_CATEGORIES_LABEL,
    ORDER_FOLDER_TITLE,
    ORDER_SERVICETYPE_REFNOTE_LABEL,
    ORDER_WEIGHT,
    ORDER_DISTANCE,
    ORDER_DROPOFF_TIME,
    ORDER_MULTIPLE,
    ORDER_IMG_LABEL,
    ORDER_NON_MOTORIZED_TYPE,
    ORDER_CONCATENATED_GOODS_TYPE,
    ORDER_CONTRACT_CAR_TYPE,
  } = I18N;

  const BreakRow = () => {
    return (
      <Col xs={12} className="block-item row-break-block-item">
        <Row>
          <Col xs={12} xl={7}>
            <span className="block-label" style={{ color: '#efefef' }}>
              *
            </span>
            <span className="block-value"></span>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <>
      <Col xs={12} style={{ paddingLeft: '0' }}>
        <Col xs={12}>
          <h3 className="block-title">{t(MENU_MANAGE_NEWORDER)}</h3>
        </Col>
        {orderData && orderData.id && (
          <>
            <Col xs={24} className="block-item">
              <Row>
                <Col xs={12} xl={7}>
                  <span className="block-label">{t(ORDER_ID)}</span>
                  <span className="block-value">{orderData.orderId}</span>
                </Col>
              </Row>
            </Col>
            <Col xs={12} className="block-item ">
              <Row>
                <Col xs={12} xl={7}>
                  <span className="block-label">
                    {t(ORDER_SUMMARY_SERVICETYPE)}
                  </span>
                  <span className="block-value order-item-blue-bold">
                    {getServiceType(t, orderData.serviceType)}
                  </span>
                </Col>
                {orderData.serviceType ===
                  SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK && (
                  <Col xs={12} xl={5} className="block-item">
                    <span className="block-label">
                      {t(ORDER_CONTAINERSIZE_LABEL)}
                    </span>
                    <span className="block-value order-item-blue-bold">
                      {orderData.containerSize !== null &&
                        getContainerSize(t, orderData.containerSize)}
                    </span>
                  </Col>
                )}
              </Row>
            </Col>
            {(orderData.referenceNo || orderData.referenceNote) && (
              <Col xs={12} className="block-item">
                <Row>
                  {orderData.referenceNo && (
                    <>
                      <Col xs={12} xl={7}>
                        <span className="block-label">
                          {t('Your own reference NO')}
                        </span>
                        <span className="block-value">
                          {orderData.referenceNo}
                        </span>
                      </Col>
                    </>
                  )}

                  {orderData.referenceNote && (
                    <>
                      <Col xs={12} xl={5}>
                        <span className="block-label">
                          {t(ORDER_SERVICETYPE_REFNOTE_LABEL)}
                        </span>
                        <span className="block-value">
                          {orderData.referenceNote}
                        </span>
                      </Col>
                    </>
                  )}
                </Row>
              </Col>
            )}

            {orderData.serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_TRUCKTYPE_LABEL)}
                    </span>
                    <span className="block-value">
                      {orderData.truckType !== null &&
                        getTruckType(t, orderData.truckType)}
                    </span>
                  </Col>
                </Row>
              </Col>
            )}
            {orderData.serviceType === SERVICE_TYPE.NON_MOTORIZED && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_NON_MOTORIZED_TYPE)}
                    </span>
                    <span className="block-value">
                      {t(
                        nonMotorizedType.find(
                          (i) => i.key === orderData.nonMotorizedType
                        )?.label ?? ''
                      )}
                    </span>
                  </Col>
                </Row>
              </Col>
            )}
            {orderData.serviceType === SERVICE_TYPE.CONCATENATED_GOODS && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_CONCATENATED_GOODS_TYPE)}
                    </span>
                    <span className="block-value">
                      {t(
                        concatenatedGoodsType.find(
                          (i) => i.key === orderData.concatenatedGoodsType
                        )?.label ?? ''
                      )}
                    </span>
                  </Col>
                </Row>
              </Col>
            )}
            {orderData.serviceType === SERVICE_TYPE.CONTRACT_CAR && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_CONTRACT_CAR_TYPE)}
                    </span>
                    <span className="block-value">
                      {t(
                        contractCarType.find(
                          (i) => i.key === orderData.contractCarType
                        )?.label ?? ''
                      )}
                    </span>
                  </Col>
                </Row>
              </Col>
            )}
            {orderData.serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK &&
              (orderData.containerQuantity || orderData.containerType) && (
                <Col xs={12} className="block-item">
                  <Row>
                    <Col xs={12} xl={7}>
                      <span className="block-label">
                        {t(ORDER_CONTAINERQUANTITY)}
                      </span>
                      {orderData.containerQuantity !== null && (
                        <span className="block-value order-item-blue-bold">
                          {orderData.containerQuantity}
                        </span>
                      )}
                    </Col>

                    <Col xs={12} xl={5} className="block-item block-item-right">
                      <span className="block-label">
                        {t(ORDER_CONTAINERTYPE_LABEL)}
                      </span>
                      <span className="block-value order-item-blue-bold">
                        {orderData.containerType !== null &&
                          getContainerType(t, orderData.containerType)}
                      </span>
                    </Col>
                  </Row>
                </Col>
              )}
            {orderData.serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN &&
              (orderData.truckQuantity || orderData.truckPayload) && (
                <Col xs={12} className="block-item">
                  <Row>
                    {orderData.truckQuantity !== null && (
                      <Col
                        xs={12}
                        xl={7}
                        className="block-item block-item-right"
                      >
                        <span className="block-label">
                          {t(ORDER_TRUCK_QUANTITY)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.truckQuantity}
                        </span>
                      </Col>
                    )}
                    <Col xs={12} xl={5}>
                      <span className="block-label">{t(ORDER_TRUCK_LOAD)}</span>
                      <span className="block-value">
                        {orderData.truckPayload !== null &&
                          getTruckPayload(t, orderData.truckPayload)}
                      </span>
                    </Col>
                  </Row>
                </Col>
              )}
            {(orderData.cargoType || orderData.cargoName) && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_CARGOTYPE_LABEL)}
                    </span>
                    <span className="block-value">
                      {orderData.cargoType !== null &&
                        getCargoType(t, orderData.cargoType)}
                    </span>
                  </Col>

                  <Col xs={12} xl={5} className="block-item block-item-right">
                    <span className="block-label">{t(ORDER_CARGO_NAME)}</span>
                    {orderData.cargoName !== null && (
                      <span className="block-value">{orderData.cargoName}</span>
                    )}
                  </Col>
                </Row>
              </Col>
            )}
            {(orderData.cargoWeight || orderData.packageSize) && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <>
                      <span className="block-label">
                        {t(ORDER_CARGO_WEIGHT)}
                      </span>
                      <span className="block-value">
                        {orderData.cargoWeight !== null &&
                          orderData.cargoWeight}{' '}
                        {t(ORDER_WEIGHT)}
                      </span>
                    </>
                  </Col>
                  <Col xs={12} xl={5}>
                    <span className="block-label">{t(ORDER_PACKAGE_SIZE)}</span>
                    {orderData.packageSize !== null && (
                      <span className="block-value">
                        {orderData.packageSize === 'Others'
                          ? orderData.packageSizeText
                          : getPacketSize(t, orderData.packageSize)}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
            )}

            {<BreakRow />}
            {(orderData.pickupAddressText || orderData.pickupTime) && (
              <Col xs={12} className="block-item">
                <Row>
                  {orderData.pickupAddressText && (
                    <Col xs={12} xl={7}>
                      <span className="block-label">
                        {t(ORDER_PICKUP_ADDRESS)}
                      </span>
                      <span className="block-value wrap-text">
                        {orderData.pickupAddressText}
                      </span>
                    </Col>
                  )}
                  {orderData.pickupTime && (
                    <Col xs={12} xl={5}>
                      <span className="block-label">
                        {t(ORDER_PICKUP_TIME)}
                      </span>
                      <span className="block-value">
                        {orderData.pickupTime
                          ? toTimeFormat(
                              orderData.pickupTime.toLocaleString(),
                              commonStore.newDateFormat
                            )
                          : ''}
                      </span>
                    </Col>
                  )}
                </Row>
              </Col>
            )}

            {orderData.dropOffFields &&
              orderData.dropOffFields.map(
                ({ dropoffAddressText, dropoffTime }: any, index: any) => (
                  <>
                    <Col xs={12} className="block-item">
                      <Row>
                        <Col xs={7} xl={7}>
                          {index === 0 && (
                            <span className="block-label">
                              {t(ORDER_DROPOFF_ADDRESS)}
                              <small className="note-item-blue-bold small">
                                {t(ORDER_MULTIPLE)}
                              </small>
                            </span>
                          )}
                          <span className="block-value wrap-text">
                            {dropoffAddressText}
                          </span>
                        </Col>
                        <Col xs={5} xl={5}>
                          {isValidDate(dropoffTime) === true && (
                            <>
                              {index === 0 && (
                                <span className="block-label">
                                  {t(ORDER_DROPOFF_TIME)}
                                </span>
                              )}
                              <span className="block-value">
                                {toTimeFormat(
                                  dropoffTime.toLocaleString(),
                                  commonStore.newDateFormat
                                )}
                              </span>
                            </>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </>
                )
              )}
            <Col xs={12} className="block-item">
              <Row>
                <Col xs={12} xl={12}>
                  <span className="block-label">{t(ORDER_DISTANCE)}</span>
                  <span className="block-value">{orderData.distance} Km</span>
                </Col>
              </Row>
            </Col>
            {orderData.noteToDriver && (
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={12}>
                    <span className="block-label">
                      {t(ORDER_NOTE_TODRIVER)}
                    </span>
                    <span className="block-value">
                      {orderData.noteToDriver}
                    </span>
                  </Col>
                </Row>
              </Col>
            )}
          </>
        )}
        <BreakRow />
        <Col xs={12} className="block-item">
          <Row>
            <Col xs={12} xl={4}>
              <>
                <span className="block-label">{t(ORDER_PAYMENT_TYPE)}</span>
                <span className="block-value order-item-blue-bold custom-width payment">
                  {orderData.paymentType !== null &&
                    getPaymentType(t, orderData.paymentType)}
                  {orderData.otherPaymentType &&
                    `: ${orderData.otherPaymentType}`}
                </span>
              </>
            </Col>
            <Col xs={12} xl={4}>
              <>
                <span className="block-label custom-width label">
                  {t(ORDER_ORDER_COL_PRICE)}
                </span>
                <span className="block-value order-item-blue-bold custom-width span">
                  {orderData.priceRequest !== null &&
                    orderData.priceRequest.toLocaleString()}
                  {orderData.suggestedPrice !== null &&
                    orderData.priceRequest === null && (
                      <>{orderData.suggestedPrice.toLocaleString()}</>
                    )}{' '}
                  VND
                </span>
              </>
            </Col>
            <Col xs={12} xl={4}>
              <>
                <span className="block-label custom-width label">
                  {t(PRICING_INVOICE_VAT)}
                </span>
                <span className="block-value order-item-blue-bold custom-width span">
                  {orderData.vat ? t(BUTTONS_YES) : t(BUTTONS_NO)}
                </span>
              </>
            </Col>
          </Row>
        </Col>
      </Col>
      <Col xs={12} className="block-item">
        <h3 className="block-title">{t(ORDER_FOLDER_TITLE)}</h3>
        <Table className="table-wrapper">
          <thead>
            <th>{t(ORDER_CATEGORIES_LABEL)}</th>
            <th>{t(ORDER_IMG_LABEL)}</th>
          </thead>
          <tbody>
            {orderData.metadata && (
              <tr className="documents-list">
                <td>{t(ORDER_IMG_LABEL)}</td>
                {orderData.metadata.map((data: any) => (
                  <Col className="image image-summary" xs={4} md={3}>
                    <a
                      className="zoom-image"
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="document-wrapper">
                        <Image src={`${data.link}`} />
                      </div>
                      <span className="caption">{data.fileName}</span>
                    </a>
                  </Col>
                ))}
              </tr>
            )}
          </tbody>
        </Table>
      </Col>
    </>
  );
};

export default observer(SummarySection);
