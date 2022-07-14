import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AdminTruckOwnerRequestDto } from '@/modules/truckowner/truckowner.dto';
import { PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { adminTruckOwnerFormInit } from '@/modules/truckowner/truckowner.constants';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  initialValues?: AdminTruckOwnerRequestDto;
  handleSubmitForm: any;
  show: boolean;
  handleClose: any;
}

const AddTruckOwnerModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    formTitle = '',
    initialValues = adminTruckOwnerFormInit,
    handleSubmitForm,
    show,
    handleClose,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    VALIDATE_EMAIL,
    VALIDATE_PHONE,
    ACCOUNT_EMAIL,
    CUSTOMER_NAME,
    ACCOUNT_PHONE_REQUIRED,
    BUTTONS_CREATE,
    BUTTONS_ADD_NEWCUSTOMER,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    email: yup.string().email(t(VALIDATE_EMAIL)).required(t(VALIDATE_REQUIRED)),
    firstName: yup.string().notRequired(),
    // lastName: yup.string().notRequired(),
    phoneNumber: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired(),
  });

  const handleKeyDown = (e: any) => {
    const spaceBarKeyCode = 32;
    if (e.keyCode === spaceBarKeyCode) {
      e.preventDefault();
      return false;
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-admin ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>
        {formTitle ? formTitle : t(BUTTONS_ADD_NEWCUSTOMER)}
      </Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmitForm(values);
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
              className={`form form-driver ${className ? className : ''}`}
              style={style}
            >
              {children}
              <Form.Group as={Col} md="12" controlId="email" className="email">
                <Form.Label className="form-label-required">
                  {t(ACCOUNT_EMAIL)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  onKeyDown={handleKeyDown}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="firstName"
                className="firstName"
              >
                <Form.Label>{t(CUSTOMER_NAME)}</Form.Label>
                <Form.Control
                  type="text"
                  value={values.firstName}
                  onChange={handleChange}
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
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
                  onChange={handleChange}
                  isInvalid={!!errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.phoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <ButtonGroup className="form-actions">
                <Button type="submit">
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

export default observer(AddTruckOwnerModal);
