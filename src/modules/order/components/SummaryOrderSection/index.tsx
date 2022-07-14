/* eslint-disable react-hooks/exhaustive-deps */
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
import { OrderStoreContext } from '@/modules/order/order.store';
import { nonMotorizedType } from '@/modules/truck/truck.enum';
import {
  concatenatedGoodsType,
  contractCarType,
} from '@/modules/truck/truck.enum';
import { getTruckServiceType } from '@/modules/truckowner/truckowner.util';
import { THEMES } from '@/theme.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  orderData: any;
  truckTitle?: any;
  driverTitle?: any;
  truckOwnerTitle?: any;
  createdByTitle?: any;
  createdByData?: any;
  driversData?: any;
  trucksData?: any;
  truckOwner?: any;
  notes?: any;
  reports?: any;
  invoices?: any;
  others?: any;
  tabNo?: number;
  totalPrice?: number;
  commission?: number;
}

const SummaryOrderSection = (props: ComponentProps) => {
  const commonStore = React.useContext(CommonStoreContext);

  /*
   * Props of Component
   */
  const {
    orderData,
    createdByTitle,
    truckTitle,
    driverTitle,
    truckOwnerTitle,
    createdByData,
    driversData,
    trucksData,
    truckOwner,
    reports,
    invoices,
    others,
    tabNo,
    totalPrice,
    commission,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
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
    ORDER_PICKUP_CONTACTNO,
    ORDER_NOTE_TODRIVER,
    ORDER_PICKUP_TIME,
    ORDER_DROPOFF_ADDRESS,
    ORDER_SERVICETYPE_REFNUMBER,
    ORDER_ORDER_COL_PRICE,
    PRICING_INVOICE_VAT,
    ORDER_INCHARGE_NAME,
    ORDER_INCHARGE_CONTACTNO,
    ORDER_OTHERGENERALNOTES,
    ORDER_DETAIL_REQUEST,
    ORDER_SUMMARY_DRIVERS_TITLE,
    ORDER_SUMMARY_TRUCKS_TITLE,
    CUSTOMER_EMAIL,
    DRIVER_PHONE,
    DRIVER_NAME,
    CUSTOMER_ADMIN_CARDNO,
    TRUCK_PLATE_NO,
    TRUCK_LOAD,
    ORDER_SUMMARY_TRUCKOWNER_TITLE,
    ORDER_SUMMARY_CREATEDBY_TITLE,
    ORDER_CREATEDBY_EMAIL,
    ORDER_CREATEDBY_NAME,
    ORDER_TRUCKOWNER_EMAIL,
    ORDER_CREATEDBY_PHONE_NUMBER,
    ORDER_TRUCKOWNER_NAME,
    ORDER_TRUCKOWNER_PHONE,
    TRUCKOWNER_PUBLIC_ID,
    BUTTONS_YES,
    BUTTONS_NO,
    ORDER_REPORTS_LABEL,
    ORDER_INVOICES_LABEL,
    ORDER_CATEGORIES_LABEL,
    ORDER_IMG_LABEL,
    ORDER_FOLDER_TITLE,
    ORDER_OTHERS_LABEL,
    TRUCK_TYPE,
    ORDER_PAYMENT_TYPE,
    ORDER_SUMMARY_TITLE,
    ORDER_REFERENCE_NO,
    ORDER_DETAIL_REQUEST_TRUCK,
    ORDER_SPECIAL_REQUEST,
    ORDER_SERVICETYPE_REFNOTE_LABEL,
    ORDER_WEIGHT,
    ORDER_DISTANCE,
    ORDER_DROPOFF_TIME,
    ORDER_MULTIPLE,
    DEFAULT_ADDRESS_PLACEHOLDER,
    ORDER_NON_MOTORIZED_TYPE,
    ORDER_NON_MOTORIZED_QUANTITY,
    ORDER_CONCATENATED_GOODS_TYPE,
    ORDER_CONCATENATED_GOODS_QUANTITY,
    ORDER_CONTRACT_CAR_TYPE,
    ORDER_CONTRACT_CAR_QUANTITY,
    PRICING_PERCENT_COMMISSION,
    PRICING_FIXED_COMMISSION,
    ORDER_PROPOSED_PRICE,
    ORDER_TOTAL_PRICE,
    ORDER_DRIVER_EARNING,
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
  const orderStore = React.useContext(OrderStoreContext);

  const [options, setOptions] = React.useState<any[]>([]);

  const [selected, setSelected] = React.useState<any[]>([]);

  const getDynamicCharges = React.useCallback(async () => {
    const data = await orderStore.getDynamicChargesWithDeleted();
    let array: any[] = [];
    if (data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((item: any) => {
        if (item.name !== null && item.name !== '') {
          array.push({ value: item.id, label: `${t(item.name)}` });
        }
      });
    }

    setOptions(array);
  }, [orderStore, t]);

  const setSelectedData = React.useCallback(async () => {
    if (orderData?.specialRequests) {
      let a: any[] = [];
      orderData.specialRequests.forEach((item: any, index: number) => {
        const data = options.find((data: any) => +data.value === +item)?.label;
        a.push(t(`${data}`));
      });
      setSelected(a);
    }
  }, [orderData, t]);

  React.useEffect(() => {
    getDynamicCharges();
  }, [getDynamicCharges]);

  React.useEffect(() => {
    setSelectedData();
  }, [setSelectedData, getDynamicCharges]);

  return (
    <>
      {orderData && orderData.id && (
        <>
          {tabNo === 0 && (
            <>
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_SUMMARY_SERVICETYPE)}
                    </span>
                    <span className="block-value  order-item-blue-bold">
                      {getServiceType(t, orderData.serviceType)}
                    </span>
                  </Col>
                </Row>
              </Col>
              {truckOwnerTitle !== t(ORDER_SUMMARY_TITLE) && (
                <Col xs={12} className="block-item">
                  <Row>
                    <>
                      <Col xs={12} xl={7}>
                        <span className="block-label">
                          {truckOwnerTitle === t(ORDER_SUMMARY_TRUCKOWNER_TITLE)
                            ? t(ORDER_SERVICETYPE_REFNUMBER)
                            : t(ORDER_REFERENCE_NO)}
                        </span>
                        <span className="block-value">
                          {orderData.referenceNo || ''}
                        </span>
                      </Col>
                    </>

                    <>
                      <Col xs={12} xl={5}>
                        <span className="block-label">
                          {t(ORDER_SERVICETYPE_REFNOTE_LABEL)}
                        </span>
                        <span className="block-value">
                          {orderData.referenceNote || ''}
                        </span>
                      </Col>
                    </>
                  </Row>
                </Col>
              )}

              {orderData.serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN &&
                orderData.truckType !== null && (
                  <Col xs={12} className="block-item">
                    <span className="block-label">{t(TRUCK_TYPE)}</span>
                    <span className="block-value order-item-blue-bold">
                      {getTruckType(t, orderData.truckType)}
                    </span>
                  </Col>
                )}
              {orderData.serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK &&
                orderData.containerSize !== null && (
                  <Col xs={12} className="block-item">
                    <span className="block-label">
                      {t(ORDER_CONTAINERSIZE_LABEL)}
                    </span>
                    <span className="block-value order-item-blue-bold">
                      {getContainerSize(t, orderData.containerSize)}
                    </span>
                  </Col>
                )}
              {orderData.serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK &&
                (orderData.containerQuantity || orderData.containerType) && (
                  <Col xs={12} className="block-item">
                    <Row>
                      {orderData.containerQuantity != null && (
                        <Col xs={12} xl={7}>
                          <span className="block-label">
                            {t(ORDER_CONTAINERQUANTITY)}
                          </span>
                          <span className="block-value  order-item-blue-bold">
                            {orderData.containerQuantity}
                          </span>
                        </Col>
                      )}
                      <Col
                        xs={12}
                        xl={5}
                        className="block-item block-item-right"
                      >
                        <span className="block-label">
                          {t(ORDER_CONTAINERTYPE_LABEL)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.containerType != null &&
                            getContainerType(t, orderData.containerType)}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              {orderData.serviceType === SERVICE_TYPE.NON_MOTORIZED &&
                (orderData.nonMotorizedType ||
                  orderData.nonMotorizedQuantity) && (
                  <Col xs={12} className="block-item">
                    <Row>
                      {orderData.nonMotorizedType != null && (
                        <Col xs={12} xl={7}>
                          <span className="block-label">
                            {t(ORDER_NON_MOTORIZED_TYPE)}
                          </span>
                          <span className="block-value  order-item-blue-bold">
                            {t(
                              nonMotorizedType.find(
                                (i) => i.key === orderData.nonMotorizedType
                              )?.label ?? ''
                            )}
                          </span>
                        </Col>
                      )}
                      <Col
                        xs={12}
                        xl={5}
                        className="block-item block-item-right"
                      >
                        <span className="block-label">
                          {t(ORDER_NON_MOTORIZED_QUANTITY)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.nonMotorizedQuantity != null &&
                            orderData.nonMotorizedQuantity}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              {orderData.serviceType === SERVICE_TYPE.CONCATENATED_GOODS &&
                (orderData.concatenatedGoodsType ||
                  orderData.concatenatedGoodsQuantity) && (
                  <Col xs={12} className="block-item">
                    <Row>
                      {orderData.concatenatedGoodsType != null && (
                        <Col xs={12} xl={7}>
                          <span className="block-label">
                            {t(ORDER_CONCATENATED_GOODS_TYPE)}
                          </span>
                          <span className="block-value  order-item-blue-bold">
                            {t(
                              concatenatedGoodsType.find(
                                (i) => i.key === orderData.concatenatedGoodsType
                              )?.label ?? ''
                            )}
                          </span>
                        </Col>
                      )}
                      <Col
                        xs={12}
                        xl={5}
                        className="block-item block-item-right"
                      >
                        <span className="block-label">
                          {t(ORDER_CONCATENATED_GOODS_QUANTITY)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.concatenatedGoodsQuantity != null &&
                            orderData.concatenatedGoodsQuantity}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              {orderData.serviceType === SERVICE_TYPE.CONTRACT_CAR &&
                (orderData.contractCarType ||
                  orderData.contractCarQuantity) && (
                  <Col xs={12} className="block-item">
                    <Row>
                      {orderData.contractCarType != null && (
                        <Col xs={12} xl={7}>
                          <span className="block-label">
                            {t(ORDER_CONTRACT_CAR_TYPE)}
                          </span>
                          <span className="block-value  order-item-blue-bold">
                            {t(
                              contractCarType.find(
                                (i) => i.key === orderData.contractCarType
                              )?.label ?? ''
                            )}
                          </span>
                        </Col>
                      )}
                      <Col
                        xs={12}
                        xl={5}
                        className="block-item block-item-right"
                      >
                        <span className="block-label">
                          {t(ORDER_CONTRACT_CAR_QUANTITY)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.contractCarQuantity != null &&
                            orderData.contractCarQuantity}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              {orderData.serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN &&
                (orderData.truckQuantity || orderData.truckPayload) && (
                  <Col xs={12} className="block-item">
                    <Row>
                      <Col
                        xs={12}
                        xl={7}
                        className="block-item block-item-right"
                      >
                        <span className="block-label">
                          {t(ORDER_TRUCK_QUANTITY)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.truckQuantity && orderData.truckQuantity}
                        </span>
                      </Col>
                      <Col xs={12} xl={5}>
                        <span className="block-label">
                          {t(ORDER_TRUCK_LOAD)}
                        </span>
                        <span className="block-value order-item-blue-bold">
                          {orderData.truckPayload != null &&
                            getTruckPayload(t, orderData.truckPayload)}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <>
                      <span className="block-label">
                        {t(ORDER_CARGO_WEIGHT)}
                      </span>
                      <span className="block-value">
                        {orderData.cargoWeight != null &&
                          `${orderData.cargoWeight} ${t(ORDER_WEIGHT)}`}
                      </span>
                    </>
                  </Col>
                  <Col xs={12} xl={5}>
                    <span className="block-label">{t(ORDER_PACKAGE_SIZE)}</span>
                    {orderData.packageSize && (
                      <span className="block-value">
                        {orderData.packageSize === 'Others'
                          ? orderData.packageSizeText
                          : getPacketSize(t, orderData.packageSize)}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_CARGOTYPE_LABEL)}
                    </span>
                    {orderData.cargoType != null && (
                      <span className="block-value">
                        {getCargoType(t, orderData.cargoType)}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} xl={5} className="block-item block-item-right">
                    <span className="block-label">{t(ORDER_CARGO_NAME)}</span>
                    {orderData.cargoName != null && (
                      <span className="block-value order-item-blue-bold">
                        {orderData.cargoName}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="block-item">
                <span className="block-label">{t(ORDER_SPECIAL_REQUEST)}</span>
                {selected !== [] && (
                  <span className="block-value order-item-blue-bold">
                    {selected.map((u, index) => {
                      return (
                        <>{`${u}${
                          index < selected.length - 1 ? ',\u00A0' : ''
                        } `}</>
                      );
                    })}
                  </span>
                )}
              </Col>
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={4}>
                    <>
                      <span className="block-label">
                        {t(ORDER_PAYMENT_TYPE)}
                      </span>
                      {orderData.paymentType !== null && (
                        <span className="block-value order-item-blue-bold custom-width payment">
                          {getPaymentType(t, orderData.paymentType)}
                          {orderData.otherPaymentType &&
                            `: ${orderData.otherPaymentType}`}
                        </span>
                      )}
                    </>
                  </Col>
                  <Col xs={12} xl={4}>
                    <span className="block-label custom-width label">
                      {t(ORDER_PROPOSED_PRICE)}
                    </span>
                    {!orderData.useSuggestedPrice && (
                      <span className="block-value order-item-blue-bold custom-width span">
                        {orderData.priceRequest
                          ? orderData.priceRequest.toLocaleString()
                          : 0}{' '}
                        VND
                      </span>
                    )}
                    {orderData.useSuggestedPrice && (
                      <span className="block-value order-item-blue-bold custom-width span">
                        {orderData.suggestedPrice
                          ? orderData.suggestedPrice.toLocaleString()
                          : 0}{' '}
                        VND
                      </span>
                    )}
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
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={4}>
                    <span className="block-label">{t(ORDER_TOTAL_PRICE)}</span>
                    <span className="block-value order-item-blue-bold custom-width span">
                      {totalPrice ? totalPrice.toLocaleString() : 0} VND
                    </span>
                  </Col>
                  {process.env.REACT_APP_THEME !== THEMES.TADATRUCK &&
                    orderData.isSetCommission && (
                      <Col xs={12} xl={4}>
                        <span className="block-label custom-width label">
                          {t(ORDER_DRIVER_EARNING)}
                        </span>
                        {commission && (
                          <span className="block-value order-item-blue-bold custom-width span">
                            {commission.toLocaleString()} VND
                          </span>
                        )}
                      </Col>
                    )}
                </Row>
              </Col>
              {<BreakRow />}
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <>
                      <span className="block-label">
                        {t(DEFAULT_ADDRESS_PLACEHOLDER)}
                      </span>
                      {orderData.address && (
                        <span className="block-value">{orderData.address}</span>
                      )}
                    </>
                  </Col>
                  <Col xs={12} xl={5} className="block-item block-item-right">
                    <span className="block-label">
                      {t(ORDER_PICKUP_CONTACTNO)}
                    </span>
                    {orderData.pickupContactNo && (
                      <span className="block-value order-item-blue-bold">
                        {orderData.pickupContactNo}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={7}>
                    <span className="block-label">
                      {t(ORDER_PICKUP_ADDRESS)}
                    </span>
                    {orderData.pickupAddressText && (
                      <span className="block-value wrap-text">
                        {orderData.pickupAddressText}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} xl={5}>
                    <span className="block-label">{t(ORDER_PICKUP_TIME)}</span>
                    {orderData.pickupTime && (
                      <span className="block-value">
                        {orderData.pickupTime
                          ? toTimeFormat(
                              orderData.pickupTime.toLocaleString(),
                              commonStore.newDateFormat
                            )
                          : ''}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
              {orderData.dropOffFields &&
                orderData.dropOffFields.map((dropOffField: any, index: any) => (
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
                            {dropOffField.dropoffAddressText}
                          </span>
                        </Col>
                        <Col xs={5} xl={5}>
                          {isValidDate(dropOffField.dropoffTime) === true && (
                            <>
                              {index === 0 && (
                                <span className="block-label">
                                  {t(ORDER_DROPOFF_TIME)}
                                </span>
                              )}
                              <span className="block-value">
                                {toTimeFormat(
                                  dropOffField.dropoffTime.toLocaleString(),
                                  commonStore.newDateFormat
                                )}
                              </span>
                            </>
                          )}
                        </Col>
                      </Row>
                    </Col>
                  </>
                ))}
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={12}>
                    <span className="block-label">{t(ORDER_DISTANCE)}</span>
                    <span className="block-value">{orderData.distance} Km</span>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={12}>
                    <span className="block-label">
                      {t(ORDER_NOTE_TODRIVER)}
                    </span>
                    {orderData.noteToDriver && (
                      <span className="block-value">
                        {orderData.noteToDriver}
                      </span>
                    )}
                  </Col>
                </Row>
              </Col>
              {orderData.metadata && (
                <Col xs={12} className="block-item">
                  <Row>
                    <Col xs={12} xl={12}>
                      <span className="block-label">{t(ORDER_IMG_LABEL)}</span>
                      <span className="block-value">
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
                      </span>
                    </Col>
                  </Row>
                </Col>
              )}
              <BreakRow />
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={7} xl={7}>
                    <>
                      <span className="block-label">
                        {t(ORDER_INCHARGE_NAME)}
                      </span>
                      {orderData.inChargeName && (
                        <span className="block-value">
                          {orderData.inChargeName}
                        </span>
                      )}
                    </>
                  </Col>
                  <Col xs={5} xl={5}>
                    <>
                      <span className="block-label">
                        {t(ORDER_INCHARGE_CONTACTNO)}
                      </span>
                      {orderData.inChargeContactNo && (
                        <span className="block-value">
                          {orderData.inChargeContactNo}
                        </span>
                      )}
                    </>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="block-item">
                <Row>
                  <Col xs={12} xl={12}>
                    <>
                      <span className="block-label">
                        {t(ORDER_OTHERGENERALNOTES)}
                      </span>
                      {orderData.otherGeneralNotes && (
                        <span className="block-value">
                          {orderData.otherGeneralNotes}
                        </span>
                      )}
                    </>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} className="block-item">
                <span className="block-label">
                  {truckOwnerTitle === t(ORDER_SUMMARY_TRUCKOWNER_TITLE)
                    ? t(ORDER_DETAIL_REQUEST)
                    : t(ORDER_DETAIL_REQUEST_TRUCK)}
                </span>
                {orderData.detailRequest && (
                  <span className="block-value">{orderData.detailRequest}</span>
                )}
              </Col>
              {createdByTitle === t(ORDER_SUMMARY_CREATEDBY_TITLE) &&
                createdByData && (
                  <>
                    <Col xs={12} className="block-item">
                      <h3 className="block-title">
                        {createdByTitle
                          ? createdByTitle
                          : t(ORDER_SUMMARY_CREATEDBY_TITLE)}
                      </h3>
                      <span className="block-label">
                        {t(ORDER_CREATEDBY_EMAIL)}
                      </span>
                      <span className="block-value">{createdByData.email}</span>
                    </Col>
                    {createdByData.firstName && (
                      <Col xs={12} className="block-item">
                        <span className="block-label">
                          {t(ORDER_CREATEDBY_NAME)}
                        </span>
                        <span className="block-value">
                          {createdByData.firstName}
                        </span>
                      </Col>
                    )}
                    {createdByData.phoneNumber && (
                      <Col xs={12} className="block-item">
                        <span className="block-label">
                          {t(ORDER_CREATEDBY_PHONE_NUMBER)}
                        </span>
                        <span className="block-value">
                          {createdByData.phoneNumber}
                        </span>
                      </Col>
                    )}
                  </>
                )}
            </>
          )}
          {tabNo === 1 && (
            <>
              {truckOwnerTitle === t(ORDER_SUMMARY_TRUCKOWNER_TITLE) && (
                <>
                  <Col xs={12} className="block-item">
                    <h3 className="block-title">
                      {truckOwnerTitle
                        ? truckOwnerTitle
                        : t(ORDER_SUMMARY_TRUCKOWNER_TITLE)}
                    </h3>
                    <span className="block-label">
                      {t(ORDER_TRUCKOWNER_EMAIL)}
                    </span>
                    {truckOwner && (
                      <span className="block-value">{truckOwner.email}</span>
                    )}
                  </Col>
                  <Col xs={12} className="block-item">
                    <span className="block-label">
                      {t(ORDER_TRUCKOWNER_NAME)}
                    </span>
                    {truckOwner && (
                      <span className="block-value">{truckOwner.name}</span>
                    )}
                  </Col>
                  <Col xs={12} className="block-item">
                    <span className="block-label">
                      {t(ORDER_TRUCKOWNER_PHONE)}
                    </span>
                    {truckOwner && (
                      <span className="block-value">
                        {truckOwner.phoneNumber}
                      </span>
                    )}
                  </Col>
                  <Col xs={12} className="block-item">
                    <span className="block-label">
                      {t(TRUCKOWNER_PUBLIC_ID)}
                    </span>
                    {truckOwner && (
                      <span className="block-value">{truckOwner.publicId}</span>
                    )}
                  </Col>
                </>
              )}
              {driverTitle === t(ORDER_SUMMARY_DRIVERS_TITLE) && (
                <>
                  <Col xs={12} className="block-item">
                    <h3 className="block-title">
                      {driverTitle
                        ? driverTitle
                        : t(ORDER_SUMMARY_DRIVERS_TITLE)}
                    </h3>
                    <Table className="table-wrapper">
                      <thead>
                        <th>{t(DRIVER_NAME)}</th>
                        <th>{t(CUSTOMER_EMAIL)}</th>
                        <th>{t(DRIVER_PHONE)}</th>
                        <th>{t(CUSTOMER_ADMIN_CARDNO)}</th>
                      </thead>
                      {driversData && driversData.length > 0 && (
                        <tbody>
                          {driversData.map((driver: any) => (
                            <tr>
                              <td>{driver.firstName}</td>
                              <td>{driver.email}</td>
                              <td>{driver.phoneNumber}</td>
                              <td>{driver.cardNo}</td>
                            </tr>
                          ))}
                        </tbody>
                      )}
                    </Table>
                  </Col>
                  {process.env.REACT_APP_THEME !== THEMES.TADATRUCK &&
                    orderData.isSetCommission && (
                      <Col xs={12} className="block-item">
                        <Row>
                          <Col xs={12} xl={6}>
                            <span className="block-label font-weight-normal">
                              {t(PRICING_PERCENT_COMMISSION)}
                            </span>
                            <span className="block-value">
                              {orderData.percentCommission ?? 0} %
                            </span>
                          </Col>
                          <Col
                            xs={12}
                            xl={6}
                            className="block-item block-item-right"
                          >
                            <span className="block-label font-weight-normal">
                              {t(PRICING_FIXED_COMMISSION)}
                            </span>
                            <span className="block-value">
                              {orderData.fixedCommission
                                ? orderData.fixedCommission.toLocaleString()
                                : 0}{' '}
                              VND
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    )}
                </>
              )}
              {truckTitle === t(ORDER_SUMMARY_TRUCKS_TITLE) && (
                <Col xs={12} className="block-item">
                  <h3 className="block-title">
                    {truckTitle ? truckTitle : t(ORDER_SUMMARY_TRUCKS_TITLE)}
                  </h3>
                  <Table className="table-wrapper">
                    <thead>
                      <th>{t(TRUCK_LOAD)}</th>
                      <th>{t(TRUCK_PLATE_NO)}</th>
                      <th>{t(ORDER_TRUCKTYPE_LABEL)}</th>
                    </thead>
                    {trucksData && trucksData.length > 0 && (
                      <tbody>
                        {trucksData.map((truck: any) => (
                          <tr>
                            <td>{truck.truckLoad}</td>
                            <td>{truck.truckNo}</td>
                            <td> {getTruckServiceType(t, truck.truckType)}</td>
                          </tr>
                        ))}
                      </tbody>
                    )}
                  </Table>
                </Col>
              )}

              <Col xs={12} className="block-item">
                <h3 className="block-title">{t(ORDER_FOLDER_TITLE)}</h3>
                <Table className="table-wrapper">
                  <thead>
                    <th>{t(ORDER_CATEGORIES_LABEL)}</th>
                    <th>{t(ORDER_IMG_LABEL)}</th>
                  </thead>
                  <tbody>
                    <tr className="documents-list">
                      <td>{t(ORDER_REPORTS_LABEL)}</td>
                      {reports &&
                        reports.length > 0 &&
                        reports.map((report: any) => (
                          <Col className="image image-summary" xs={4} md={3}>
                            <a
                              className="zoom-image"
                              href={report.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="document-wrapper">
                                <Image src={`${report.link}`} />
                              </div>
                              <span className="caption">{report.fileName}</span>
                            </a>
                          </Col>
                        ))}
                    </tr>
                    {invoices && (
                      <tr className="documents-list">
                        <td>{t(ORDER_INVOICES_LABEL)}</td>
                        {invoices &&
                          invoices.length > 0 &&
                          invoices.map((invoice: any) => (
                            <Col className="image image-summary" xs={4} md={3}>
                              <a
                                className="zoom-image"
                                href={invoice.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <div className="document-wrapper">
                                  <Image src={`${invoice.link}`} />
                                </div>
                                <span className="caption">
                                  {invoice.fileName}
                                </span>
                              </a>
                            </Col>
                          ))}
                      </tr>
                    )}
                    {truckOwnerTitle === t(ORDER_SUMMARY_TITLE) && (
                      <>
                        <tr className="documents-list">
                          <td>{t(ORDER_OTHERS_LABEL)}</td>
                          {others &&
                            others.length > 0 &&
                            others.map((other: any) => (
                              <Col
                                className="image image-summary"
                                xs={4}
                                md={3}
                              >
                                <a
                                  className="zoom-image"
                                  href={other.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div className="document-wrapper">
                                    <Image src={`${other.link}`} />
                                  </div>
                                  <span className="caption">
                                    {other.fileName}
                                  </span>
                                </a>
                              </Col>
                            ))}
                        </tr>
                      </>
                    )}
                  </tbody>
                </Table>
              </Col>
            </>
          )}
        </>
      )}
    </>
  );
};

export default observer(SummaryOrderSection);
