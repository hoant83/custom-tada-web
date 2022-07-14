import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import { NewDriverDto } from '@/modules/truckowner/truckowner.dto';
import { PHONE_REGEXP, NUMBER_REGEXP } from '@/libs/constants/rules.constants';
import { newFormInit } from '@/modules/truckowner/truckowner.constants';
import bsCustomFileInput from 'bs-custom-file-input';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  initialValues?: NewDriverDto;
  handleCreate: any;
  handleUploadCardFront: any;
  handleUploadCardBack: any;
  handleUploadLicense: any;
  show: boolean;
  handleClose: any;
  handleUploadMultipleDocument: (event: any) => void;
}

const AdminCreateDriverFormModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleCreate,
    handleUploadCardFront,
    handleUploadCardBack,
    handleUploadLicense,
    formTitle = '',
    initialValues = newFormInit,
    show,
    handleClose,
    handleUploadMultipleDocument,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    DRIVER_NEW_TITLE,
    DRIVER_NAME,
    DRIVER_PHONE,
    DRIVER_ID,
    DRIVER_CARD_FRONT,
    DRIVER_CARD_BACK,
    DRIVER_LICENCE_CARD,
    BUTTONS_CREATE,
    BUTTONS_CANCEL,
    BUTTONS_CHOOSE_IMAGE,
    BUTTONS_CHOOSE_MULTIPLE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    firstName: yup.string().required(t(VALIDATE_REQUIRED)),
    phoneNumber: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .required(t(VALIDATE_REQUIRED)),
    cardNo: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .required(t(VALIDATE_REQUIRED)),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-driver ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>{formTitle ? formTitle : t(DRIVER_NEW_TITLE)}</Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleCreate(values);
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
              <Form.Group
                as={Col}
                md="12"
                controlId="firstName"
                className="form-group-name"
              >
                <Form.Label className="form-label-required">
                  {t(DRIVER_NAME)} <span>*</span>
                </Form.Label>
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
                className="form-group-phone"
              >
                <Form.Label className="form-label-required">
                  {t(DRIVER_PHONE)} <span>*</span>
                </Form.Label>
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
              <Form.Group
                as={Col}
                md="12"
                controlId="cardNo"
                className="form-group-cardNo"
              >
                <Form.Label className="form-label-required">
                  {t(DRIVER_ID)} <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="cardNo"
                  value={values.cardNo}
                  onChange={handleChange}
                  isInvalid={!!errors.cardNo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.cardNo}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t(DRIVER_CARD_FRONT)}</Form.Label>
                <Form.File
                  id="idCardFrontImage"
                  label={t(BUTTONS_CHOOSE_IMAGE)}
                  onChange={handleUploadCardFront}
                  custom
                />
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t(DRIVER_CARD_BACK)}</Form.Label>
                <Form.File
                  id="idCardBackImage"
                  label={t(BUTTONS_CHOOSE_IMAGE)}
                  onChange={handleUploadCardBack}
                  custom
                />
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t(DRIVER_LICENCE_CARD)}</Form.Label>
                <Form.File
                  id="driverLicense"
                  label={t(BUTTONS_CHOOSE_IMAGE)}
                  onChange={handleUploadLicense}
                  custom
                />
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t('Others document')}</Form.Label>
                <Form.File
                  id="idOtherDocument"
                  label={t(BUTTONS_CHOOSE_MULTIPLE)}
                  onChange={(event: any) => {
                    handleUploadMultipleDocument(event);
                  }}
                  custom
                  multiple
                ></Form.File>
              </Form.Group>
              <ButtonGroup className="form-actions">
                <Button variant="primary" type="submit">
                  <span>{t(BUTTONS_CREATE)}</span>
                  <i className="ico ico-plus"></i>
                </Button>
                <Button onClick={handleClose}>
                  <span>{t(BUTTONS_CANCEL)}</span>
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

export default observer(AdminCreateDriverFormModal);
