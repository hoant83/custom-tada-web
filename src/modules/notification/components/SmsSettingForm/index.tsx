import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';

import { Form, Row, Button, ButtonGroup, Container } from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';
import bsCustomFileInput from 'bs-custom-file-input';
import { NotificationStoreContext } from '../../notification.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues: any;
  handleSubmitForm?: any;
}

const SmsSettingForm = (props: ComponentProps) => {
  const notificationStore = React.useContext(NotificationStoreContext);

  /*
   * Props of Component
   */
  const { style, className, children, initialValues, handleSubmitForm } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_UPDATE,
    ADMIN_ACCEPT_SMS,
    ADMIN_CANCELLED_SMS,
    ADMIN_COMPLETE_SMS,
    ADMIN_DRIVER_DELIVER_SMS,
    ADMIN_DRIVER_PICKUP_SMS,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    // firstName: yup.string().required(),
    // totalAcceptedSms: yup.number().required(),
    // totalCancelledSms: yup.number().required(),
    // driverPickingUp: yup.number().required(),
    // driverDelivering: yup.number().required(),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {}, [notificationStore.smsSetting, initialValues]);

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleSubmitForm(values);
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className={`form form-custom ${className ? className : ''}`}
            style={style}
          >
            {children}
            <Form.Row className="company-info">
              <Container fluid>
                {/* <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="totalAcceptedSms"
                    className="form-group-totalAcceptedSms"
                  >
                    <Form.Label className="form-label">
                      {t('total accept sms')}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="totalAcceptedSms"
                      value={values.totalAcceptedSms}
                      onChange={handleChange}
                      isInvalid={!!errors.totalAcceptedSms}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.totalAcceptedSms}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="totalCancelledSms"
                    className="form-group-totalCancelledSms"
                  >
                    <Form.Label className="form-label">
                      {t('total cancelled sms')}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.totalCancelledSms}
                      onChange={handleChange}
                      isInvalid={!!errors.totalCancelledSms}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.totalCancelledSms}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row> */}
                {/* <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="totalDriverPickingUp"
                    className="form-group-totalDriverPickingUp"
                  >
                    <Form.Label className="form-label">
                      {t('total driver pickingup sms')}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="totalDriverPickingUp"
                      value={values.totalDriverPickingUp}
                      onChange={handleChange}
                      isInvalid={!!errors.totalDriverPickingUp}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.totalDriverPickingUp}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="totalDriverDelivering"
                    className="form-group-totalDriverDelivering"
                  >
                    <Form.Label className="form-label">
                      {t('total delivering sms')}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.totalDriverDelivering}
                      onChange={handleChange}
                      isInvalid={!!errors.totalDriverDelivering}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.totalDriverDelivering}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row> */}
                <Row>
                  <Form.Switch
                    id="orderAccepted"
                    type="switch"
                    label={t(ADMIN_ACCEPT_SMS)}
                    className="form-switch"
                    checked={values.orderAccepted}
                    onChange={handleChange}
                  />
                  <Form.Switch
                    id="orderCancelled"
                    type="switch"
                    label={t(ADMIN_CANCELLED_SMS)}
                    className="form-switch"
                    checked={values.orderCancelled}
                    onChange={handleChange}
                  />

                  <Form.Switch
                    id="orderComplete"
                    type="switch"
                    label={t(ADMIN_COMPLETE_SMS)}
                    className="form-switch"
                    checked={values.orderComplete}
                    onChange={handleChange}
                  />
                </Row>
                <Row>
                  <Form.Switch
                    id="driverDelivering"
                    type="switch"
                    label={t(ADMIN_DRIVER_DELIVER_SMS)}
                    className="form-switch"
                    checked={values.driverDelivering}
                    onChange={handleChange}
                  />

                  <Form.Switch
                    id="driverPickingUp"
                    type="switch"
                    label={t(ADMIN_DRIVER_PICKUP_SMS)}
                    className="form-switch"
                    checked={values.driverPickingUp}
                    onChange={handleChange}
                  />
                </Row>
                <ButtonGroup className="form-actions">
                  <Button variant={BUTTONVARIANT.PRIMARY} type="submit">
                    <span>{t(BUTTONS_UPDATE)}</span>
                    <i className="ico ico-update"></i>
                  </Button>
                </ButtonGroup>
              </Container>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(SmsSettingForm);
