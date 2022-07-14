import { paymentType } from '@/modules/customer/customer.enum';
import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { CUSTOMER_ROUTERS } from '@/modules/customer/router.enum';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react';
import React from 'react';
import {
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import AsyncSelect from 'react-select/async';
import { getDisplayName } from '@/libs/utils/normalize.ulti';
import adminService from '@/modules/admin-user/admin.service';

const customSelectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    background: '#f8f8f8',
    border: '0 solid #f8f8f8',
    minHeight: '46px',
    boxShadow: 'none',
    borderRadius: '12px',
    padding: '5px 0',
    paddingLeft: '10px',
    '&:hover': {
      border: '0 solid #f8f8f8',
    },
  }),
};

let timer: any = null;

const loadOptions = (inputValue: string, callback: any) => {
  clearTimeout(timer);
  if (inputValue && inputValue.trim() !== '') {
    timer = setTimeout(async () => {
      const data: any = await adminService.getFavoriteTruckOwner(inputValue);

      let options: any = [];
      if (data.data?.result) {
        options = [
          {
            label: getDisplayName(data.data.result),
            value: data.data.result.id,
          },
        ];
      }
      callback(options);
    }, 1000);
  }
};

interface ComponentProps {
  initData?: any;
  handleChange?: any;
  errors?: any;
  showPrice: any;
  setShowPrice: any;
  showVat: any;
  setShowVat: any;
  handleChangePaymentType: any;
  paymentDefault: any;
  setSuggestedPrice: any;
  suggestedPrice: boolean;
  setQuotePrice: any;
  quotePrice: any;
  pricingEnable: boolean;
}
const CreateOrderStepThree = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);
  const {
    initData,
    handleChange,
    errors,
    showPrice,
    setShowPrice,
    showVat,
    setShowVat,
    setSuggestedPrice,
    suggestedPrice,
    setQuotePrice,
    quotePrice,
    pricingEnable,
  } = props;
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_INCHARGE_NAME,
    ORDER_INCHARGE_NAMENOTE,
    ORDER_INCHARGE_CONTACTNO,
    ORDER_OTHERGENERALNOTES,
    BUTTONS_NO,
    PLACEHOLDER_PRICE_REQUEST,
    ORDER_VAT,
    BUTTONS_YES,
    ORDER_SUGGESTED_PRICE,
    ORDER_USE_SUGGESTED_PRICE,
    ORDER_USE_MY_PRICE,
    COMPANY_NAME,
    DEFAULT_ADDRESS_PLACEHOLDER,
    DEFAULT_EMAIL_PLACEHOLDER,
    ORDER_USE_QUOTE_PRICE,
    DEFAULT_BUSSINESS_PLACEHOLDER,
    ORDER_PAYMENT_TYPE,
    ORDER_PER_TRUCK,
    ORDER_ASSIGN_TO_FAV,
    ORDER_ADD_NEW_FAV,
    ORDER_ENTER_YOUR_PARTNER_CODE,
  } = I18N;

  return (
    <>
      <Form.Row className="additional-info">
        <Container
          fluid
          style={{ display: 'inline-flex' }}
          className="step-3-container"
        >
          <Row xs={12} lg={12} style={{ width: '100%' }}>
            <Col xs={12} lg={6} className="col-step-3">
              {pricingEnable && (
                <>
                  <Row>
                    <Form.Group
                      controlId="suggestedPrice"
                      className="suggestedPrice"
                    >
                      <Form.Label>
                        <span>{t(ORDER_SUGGESTED_PRICE)}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          initData.suggestedPrice
                            ? initData.suggestedPrice?.toLocaleString()
                            : 0
                        }
                        onChange={handleChange}
                        disabled
                        className="suggested-price"
                      />
                      <Form.Control
                        type="text"
                        value={`(${
                          initData.suggestedPrice
                            ? (
                                initData.suggestedPrice /
                                (initData.truckQuantity
                                  ? initData.truckQuantity
                                  : initData.containerQuantity
                                  ? initData.containerQuantity
                                  : initData.nonMotorizedQuantity
                                  ? initData.nonMotorizedQuantity
                                  : initData.concatenatedGoodsQuantity
                                  ? initData.concatenatedGoodsQuantity
                                  : initData.contractCarQuantity)
                              )?.toLocaleString()
                            : 0
                        } ${t(ORDER_PER_TRUCK)}`}
                        disabled
                        className="suggested-price"
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group
                      controlId="useSuggestedPrice"
                      className="useSuggestedPrice"
                    >
                      <Form.Check
                        className=""
                        type="radio"
                        onChange={() => {
                          setSuggestedPrice(true);
                          setShowPrice(false);
                          setQuotePrice(false);
                        }}
                        label={t(ORDER_USE_SUGGESTED_PRICE)}
                        defaultChecked={suggestedPrice}
                        checked={suggestedPrice}
                        name="useSuggestedPrice"
                        id="useSuggestedPrice"
                      />
                    </Form.Group>
                  </Row>
                </>
              )}

              <Row>
                <Form.Group controlId="priceRequest" className="priceRequest">
                  <Form.Check
                    inline
                    className=""
                    type="radio"
                    onChange={() => {
                      setShowPrice(true);
                      setSuggestedPrice(false);
                      setQuotePrice(false);
                    }}
                    label={t(ORDER_USE_MY_PRICE)}
                    defaultChecked={showPrice}
                    checked={showPrice}
                    name="price"
                    id="price2"
                  />
                  {showPrice && (
                    <Form.Control
                      type="text"
                      value={initData.priceRequest}
                      onChange={handleChange}
                      isInvalid={!!errors.priceRequest}
                      placeholder={t(PLACEHOLDER_PRICE_REQUEST)}
                    />
                  )}
                </Form.Group>
              </Row>
              <Row>
                <Form.Group controlId="quotePrice" className="quotePrice">
                  <Form.Check
                    className=""
                    type="radio"
                    onChange={() => {
                      setQuotePrice(true);
                      setShowPrice(false);
                      setSuggestedPrice(false);
                    }}
                    label={t(ORDER_USE_QUOTE_PRICE)}
                    checked={quotePrice}
                    name="price"
                    id="price3"
                  />
                </Form.Group>
              </Row>
            </Col>
            <Col xs={12} lg={6} className="col-step-3">
              <Row>
                <Form.Group controlId="vat" className="vat r-align">
                  <Form.Label>{t(ORDER_VAT)}</Form.Label>
                  <Form.Check
                    inline
                    type="radio"
                    onChange={() => {
                      setShowVat(true);
                      initData.vat = true;
                    }}
                    label={t(BUTTONS_YES)}
                    checked={showVat}
                    name="vat"
                    id="vat1"
                  />
                  <Form.Check
                    inline
                    type="radio"
                    onChange={() => {
                      setShowVat(false);
                      initData.vat = false;
                    }}
                    label={t(BUTTONS_NO)}
                    checked={!showVat}
                    name="vat"
                    id="vat2"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.vatInfo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                {showVat && (
                  <Form.Group
                    controlId="companyName"
                    className="companyName r-align"
                  >
                    <Form.Control
                      type="text"
                      value={initData.companyName}
                      onChange={handleChange}
                      isInvalid={!!errors.companyName}
                      placeholder={t(COMPANY_NAME)}
                    />
                  </Form.Group>
                )}
              </Row>
              <Row>
                {showVat && (
                  <Form.Group controlId="address" className="address r-align">
                    <Form.Control
                      type="text"
                      value={initData.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      placeholder={t(DEFAULT_ADDRESS_PLACEHOLDER)}
                    />
                  </Form.Group>
                )}
              </Row>
              <Row>
                {showVat && (
                  <Form.Group
                    controlId="bussinessLicenseNO"
                    className="bussinessLicenseNO r-align"
                  >
                    <Form.Control
                      type="text"
                      value={initData.bussinessLicenseNO}
                      onChange={handleChange}
                      isInvalid={!!errors.bussinessLicenseNO}
                      placeholder={t(DEFAULT_BUSSINESS_PLACEHOLDER)}
                    />
                  </Form.Group>
                )}
              </Row>

              <Row>
                {showVat && (
                  <Form.Group controlId="email" className="email r-align">
                    <Form.Control
                      type="text"
                      value={initData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      placeholder={t(DEFAULT_EMAIL_PLACEHOLDER)}
                    />
                  </Form.Group>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </Form.Row>
      <Form.Row as={Row} className="other-note">
        <Container fluid>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="paymentType"
              className="form-group-paymentType"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_PAYMENT_TYPE)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="paymentType"
                defaultValue={initData.paymentType}
                onChange={handleChange}
                isInvalid={!!errors.paymentType}
              >
                {paymentType.map((value, index) => {
                  return (
                    <option key={`truck-special-${index}`} value={value.key}>
                      {t(value.label)}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.paymentType}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={6}
              controlId="inChargeName"
              className="inChargeName"
            >
              <Form.Label>
                <span>{t(ORDER_INCHARGE_NAME)}</span>
                <OverlayTrigger
                  key={'right'}
                  placement={'right'}
                  overlay={
                    <Tooltip id="tooltip-right">
                      {t(ORDER_INCHARGE_NAMENOTE)}
                    </Tooltip>
                  }
                >
                  <div className="tooltip-icon">
                    <span className="ico ico-faq"></span>
                  </div>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="text"
                value={initData.inChargeName}
                onChange={handleChange}
                isInvalid={!!errors.inChargeName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.inChargeName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              lg={6}
              controlId="inChargeContactNo"
              className="inChargeContactNo"
            >
              <Form.Label>{t(ORDER_INCHARGE_CONTACTNO)}</Form.Label>
              <Form.Control
                type="text"
                value={initData.inChargeContactNo}
                onChange={handleChange}
                isInvalid={!!errors.inChargeContactNo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.inChargeContactNo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              controlId="otherGeneralNotes"
              className="otherGeneralNotes"
            >
              <Form.Label>{t(ORDER_OTHERGENERALNOTES)}</Form.Label>
              <Form.Control
                type="text"
                value={initData.otherGeneralNotes}
                onChange={handleChange}
                isInvalid={!!errors.otherGeneralNotes}
              />
              <Form.Control.Feedback type="invalid">
                {errors.otherGeneralNotes}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              xs={10}
              lg={10}
              controlId="assignToFav"
              className="form-group-paymentType"
            >
              <Form.Label className="form-label-required assign-to-fav">
                {t(ORDER_ASSIGN_TO_FAV)}{' '}
              </Form.Label>
              <AsyncSelect
                cacheOptions
                isClearable
                loadOptions={loadOptions}
                defaultOptions
                name="assignToFavSelect"
                placeholder={t(ORDER_ENTER_YOUR_PARTNER_CODE)}
                styles={customSelectStyles}
                className="multi-select"
                value={initData.assignToFavSelect}
                onChange={(selectedOption) => {
                  handleChange({
                    target: {
                      name: 'assignToFav',
                      value: selectedOption?.value ?? null,
                    },
                  });
                  handleChange({
                    target: {
                      name: 'assignToFavSelect',
                      value: selectedOption,
                    },
                  });
                }}
              />
            </Form.Group>
            {initData.createdByCustomerId && (
              <span
                onClick={() => {
                  window.open(
                    `${CUSTOMER_ROUTERS.ADMIN_MANAGE}/${initData.createdByCustomerId}/?scroll=my-favourite`
                  );
                }}
                className="new-fav-redirect"
              >
                {t(ORDER_ADD_NEW_FAV)}
              </span>
            )}
          </Row>
        </Container>
      </Form.Row>
    </>
  );
};
export default observer(CreateOrderStepThree);
