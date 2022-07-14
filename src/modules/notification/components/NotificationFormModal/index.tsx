import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import bsCustomFileInput from 'bs-custom-file-input';

import {
  NewNotificationDto,
  NotificationStoreContext,
} from '@/modules/notification/notification.store';
import { newNotificationFormInit } from '@/modules/notification/notification.constants';

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleSubmit?: any;
  handleSendToCustomer?: any;
  handleSendToTruckOwner?: any;
  show?: boolean;
  handleClose?: any;
  handleSendToDriver: any;
}

const NotificationFormModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleSubmit,
    show,
    handleClose,
    handleSendToCustomer,
    handleSendToTruckOwner,
    handleSendToDriver,
  } = props;

  const notificationStore = React.useContext(NotificationStoreContext);

  const [sendToCustomer, setSendToCustomer] = React.useState<boolean>(false);
  const [sendToTruckOwner, setSendToTruckOwner] = React.useState<boolean>(
    false
  );

  const [sendToDriver, setSendToDriver] = React.useState<boolean>(false);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    NOTIFICATION_TITLE,
    NOTIFICATION_BODY,
    NOTIFICATION_SEND_TO,
    NOTIFICATION_CREATE_TITLE,
    BUTTONS_CREATE,
  } = I18N;

  const [initialValues, setInitValues] = React.useState<NewNotificationDto>(
    newNotificationFormInit
  );

  /*
   * Validation
   */
  const schema = yup.object({
    title: yup.string().required(t(VALIDATE_REQUIRED)),
    body: yup.string().required(t(VALIDATE_REQUIRED)),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    setInitValues(notificationStore.notificationForm);
    setSendToCustomer(false);
    setSendToTruckOwner(false);
    setSendToDriver(false);
  }, [notificationStore.notificationForm]);

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-employee ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>{t(NOTIFICATION_CREATE_TITLE)}</Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          initialValues={initialValues}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`form form-employee ${className ? className : ''}`}
              style={style}
            >
              {children}
              <Form.Group
                as={Col}
                md="12"
                controlId="title"
                className="form-group-title"
              >
                <Form.Label className="form-label-required">
                  {t(NOTIFICATION_TITLE)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="body"
                className="form-group-body"
              >
                <Form.Label className="form-label-required">
                  {t(NOTIFICATION_BODY)} <span>*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  type="text"
                  value={values.body}
                  onChange={handleChange}
                  isInvalid={!!errors.body}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.body}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="sendTo"
                className="form-group-sendTo"
              >
                <Form.Label className="form-label-required">
                  {t(NOTIFICATION_SEND_TO)} <span>*</span>
                </Form.Label>
                <Form.Check
                  className=""
                  inline
                  type="checkbox"
                  onChange={() => {
                    handleSendToCustomer(!sendToCustomer);
                    setSendToCustomer(!sendToCustomer);
                  }}
                  label="Send to Customer"
                  name="sendToCustomer"
                  id="sendToCustomer"
                />
                <Form.Check
                  type="checkbox"
                  inline
                  onChange={() => {
                    handleSendToTruckOwner(!sendToTruckOwner);
                    setSendToTruckOwner(!sendToTruckOwner);
                  }}
                  label="Send to Truck Owner"
                  name="sendToTruckOwner"
                  id="sendToTruckOwner"
                />

                <Form.Check
                  type="checkbox"
                  inline
                  onChange={() => {
                    handleSendToDriver(!sendToDriver);
                    setSendToDriver(!sendToDriver);
                  }}
                  label="Send to Driver"
                  name="sendToDriver"
                  id="sendToDriver"
                />
              </Form.Group>

              <ButtonGroup className="form-actions">
                <Button variant="primary" type="submit">
                  <span>{t(BUTTONS_CREATE)}</span>
                  <i className="ico ico-plus"></i>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default observer(NotificationFormModal);
