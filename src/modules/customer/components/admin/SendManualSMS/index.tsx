import { I18N } from '@/modules/lang/i18n.enum';
import React from 'react';
import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import * as yup from 'yup';
import { PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { initialSendSms } from '@/modules/customer/customer.constants';
import { SendSms } from '@/libs/dto/SendSms.dto';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  formTitle?: string;
  show: boolean;
  handleClosePopup: () => void;
  handleSendManualSMS: (values: any) => void;
  initialValues?: SendSms;
}

const SendManualSMS = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    formTitle = '',
    show,
    handleClosePopup,
    handleSendManualSMS,
    initialValues = initialSendSms,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_SEND_SMS_MANUAL,
    VALIDATE_PHONE,
    ACCOUNT_PHONE_REQUIRED,
    ACCOUNT_MESSAGE_REQUIRED,
    BUTTONS_SEND_MESSAGE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    phoneNumber: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .required(),
    message: yup.string().required(),
  });

  return (
    <Modal
      show={show}
      onHide={() => handleClosePopup()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-admin ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>
        {formTitle ? formTitle : t(BUTTONS_SEND_SMS_MANUAL)}
      </Modal.Header>

      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSendManualSMS(values);
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
              className={`form form-driver ${className ? className : ''}`}
              style={style}
            >
              <Form.Group
                as={Col}
                md="12"
                controlId="phoneNumber"
                className="phoneNumber"
              >
                <Form.Label>{t(ACCOUNT_PHONE_REQUIRED)}</Form.Label>
                <Form.Control
                  type="text"
                  value={values.phoneNumber}
                  isInvalid={!!errors.phoneNumber}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group
                as={Col}
                md="12"
                controlId="message"
                className="message"
              >
                <Form.Label>{t(ACCOUNT_MESSAGE_REQUIRED)}</Form.Label>
                <Form.Control
                  type="text"
                  as="textarea"
                  rows={3}
                  value={values.message}
                  isInvalid={!!errors.message}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.message}
                </Form.Control.Feedback>
              </Form.Group>

              <ButtonGroup className="form-actions">
                <Button type="submit">
                  <span>{t(BUTTONS_SEND_MESSAGE)}</span>
                  <i className="ico ico-phone"></i>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SendManualSMS;
