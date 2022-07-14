import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Container,
  Col,
  Button,
  ButtonGroup,
  Form,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { paymentType, PAYMENT_TYPE } from '../../customer.enum';

interface ComponentProps {
  initValues?: any;
  needVAT?: boolean;
  handleChangeType?: any;
  handleUpdate?: any;
  handleSetPaymentType?: any;
  initPaymentType?: PAYMENT_TYPE | null;
}

const Payment = (props: ComponentProps) => {
  const {
    initValues,
    needVAT,
    handleChangeType,
    handleUpdate,
    handleSetPaymentType,
  } = props;
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_UPDATE,
    DEFAULT_PAYMENT_TITLE,
    BUTTONS_YES,
    BUTTONS_NO,
    ORDER_VAT,
    DEFAULT_PAYMENT_TYPE_LABEL,
    DEFAULT_ADDRESS_PLACEHOLDER,
    DEFAULT_COMPANY_PLACEHOLDER,
    DEFAULT_BUSSINESS_PLACEHOLDER,
    DEFAULT_EMAIL_PLACEHOLDER,
  } = I18N;

  return (
    <>
      <Container
        fluid
        className={'block block-table table-smaller default-payment'}
      >
        <Col xs={12}>
          <h3 className="block-title">{t(DEFAULT_PAYMENT_TITLE)}</h3>
        </Col>
        <Formik
          onSubmit={(values) => {
            handleUpdate(values);
          }}
          initialValues={initValues}
          enableReinitialize
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={'form form-custom default-payment'}
            >
              <Container fluid>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={4}
                    controlId="needVATInvoice"
                    className="form-group-locationType"
                  >
                    <Form.Label className="form-label">
                      {t(ORDER_VAT)}
                    </Form.Label>
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeType(true);
                      }}
                      label={t(BUTTONS_YES)}
                      checked={needVAT}
                      name="needVAT"
                      id="needVAT1"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeType(false);
                      }}
                      label={t(BUTTONS_NO)}
                      checked={!needVAT}
                      name="needVAT"
                      id="needVAT2"
                    />
                  </Form.Group>
                  {needVAT && (
                    <>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={4}
                        controlId="companyName"
                        className="form-group-companyName"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t(DEFAULT_COMPANY_PLACEHOLDER)}
                          value={values.companyName}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={12}
                        lg={4}
                        controlId="bussinessLicenseNO"
                        className="form-group-bussinessLicenseNO"
                      >
                        <Form.Control
                          type="text"
                          placeholder={t(DEFAULT_BUSSINESS_PLACEHOLDER)}
                          value={values.bussinessLicenseNO}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  )}
                </Row>

                {needVAT && (
                  <Row>
                    <Col xs={12} lg={4}></Col>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={4}
                      controlId="address"
                      className="form-group-address"
                    >
                      <Form.Control
                        type="text"
                        placeholder={t(DEFAULT_ADDRESS_PLACEHOLDER)}
                        value={values.address}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={4}
                      controlId="email"
                      className="form-group-email"
                    >
                      <Form.Control
                        type="text"
                        placeholder={t(DEFAULT_EMAIL_PLACEHOLDER)}
                        value={values.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Row>
                )}
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="paymentType"
                    className="form-group-paymentType"
                  >
                    <Form.Label className="form-label">
                      {t(DEFAULT_PAYMENT_TYPE_LABEL)}
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className="block-filter-options"
                      name="paymentType"
                      defaultValue={values.paymentType}
                      onChange={(event) => {
                        handleSetPaymentType(event.target.value);
                      }}
                    >
                      {paymentType.map((value, index) => {
                        return (
                          <option
                            key={`payment-type-${index}`}
                            value={value.key}
                          >
                            {t(value.label)}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Form.Group>
                </Row>
              </Container>
              <ButtonGroup className="form-actions">
                <Button
                  variant="primary"
                  type="submit"
                  className="default-update-btn"
                >
                  <span>{t(BUTTONS_UPDATE)}</span>
                  <i className="ico ico-update"></i>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default observer(Payment);
