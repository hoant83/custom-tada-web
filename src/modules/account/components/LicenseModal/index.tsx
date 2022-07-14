import { I18N } from '@/modules/lang/i18n.enum';
import bsCustomFileInput from 'bs-custom-file-input';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, ButtonGroup, Col, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleOk: any;
  handleCancel: any;
  show: boolean;
  complete: boolean;
}

const LicenseModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleCancel,
    handleOk,
    show = false,
    complete,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    TRACKING_REQUEST_UPGRADE,
    TRACKING_UPGRADE_HEADER,
    TRACKING_SUB_TITLE,
    BUTTONS_CLOSE,
    LICENSE_THANK_YOU,
    COMPANY_NAME,
    COMPANY_CONTACT_PHONE,
    SETTINGS_EMAIL,
    LICENSE_NOTES,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    companyName: yup.string().required(t(VALIDATE_REQUIRED)),
    email: yup.string().required(t(VALIDATE_REQUIRED)),
    contactNo: yup.string().notRequired(),
    notes: yup.string().notRequired(),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-license ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>{t(TRACKING_UPGRADE_HEADER)}</Modal.Header>
      {complete ? (
        <>
          <span className="sub-title">{t(LICENSE_THANK_YOU)}</span>

          <ButtonGroup className="form-actions middle">
            <Button variant="primary" onClick={handleCancel}>
              <span>{t(BUTTONS_CLOSE)}</span>
              <i className="ico ico-o-close"></i>
            </Button>
          </ButtonGroup>
        </>
      ) : (
        <>
          <span className="sub-title">{t(TRACKING_SUB_TITLE)}</span>
          <Modal.Body>
            <Formik
              validationSchema={schema}
              onSubmit={(values) => {
                handleOk(values);
              }}
              initialValues={{
                companyName: '',
                email: '',
                contactNo: '',
                notes: '',
              }}
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
                    controlId="companyName"
                    className="form-group-title"
                  >
                    <Form.Label className="form-label-required">
                      {t(COMPANY_NAME)}{' '}
                      <span style={{ color: 'red' }}>(*)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.companyName}
                      onChange={handleChange}
                      isInvalid={!!errors.companyName}
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="email"
                    className="form-group-body"
                  >
                    <Form.Label className="form-label-required">
                      {t(SETTINGS_EMAIL)}{' '}
                      <span style={{ color: 'red' }}>(*)</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="contactNo"
                    className="form-group-body"
                  >
                    <Form.Label className="form-label">
                      {t(COMPANY_CONTACT_PHONE)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.contactNo}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="notes"
                    className="notes-section"
                  >
                    <Form.Label className="form-label">
                      {t(LICENSE_NOTES)}
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      type="text"
                      value={values.notes}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <ButtonGroup className="form-actions">
                    <Button variant="primary" type="submit">
                      <i className="ico ico-verified mr-3"></i>
                      <span>{t(TRACKING_REQUEST_UPGRADE)}</span>
                    </Button>
                  </ButtonGroup>
                </Form>
              )}
            </Formik>
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};

export default observer(LicenseModal);
