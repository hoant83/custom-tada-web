import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import { NewTruckDto } from '@/modules/truck/truck.dto';
import {
  TRUCK_TYPE,
  TRUCK_STATUS,
  TRUCKTYPE_LABEL,
} from '@/modules/truck/truck.enum';
import bsCustomFileInput from 'bs-custom-file-input';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  initialValues?: NewTruckDto;
  handleCreate: any;
  handleDelete: any;
  handleUpdate: any;
  handleUploadLicense: any;
  show: boolean;
  handleClose: any;
  mode: string;
}

const TruckFormModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleCreate,
    handleDelete,
    handleUpdate,
    handleUploadLicense,
    formTitle = '',
    initialValues = {
      truckType: TRUCK_TYPE.ALL,
      truckNo: '',
      truckLoad: '',
      status: TRUCK_STATUS.UNVERIFIED,
      certificate: null,
    },
    show,
    handleClose,
    mode,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    TRUCK_NEW_TITLE,
    TRUCK_PLATE_NO,
    TRUCK_LOAD,
    TRUCK_CERIFICATE,
    BUTTONS_CHOOSE_IMAGE,
    BUTTONS_CREATE,
    BUTTONS_UPDATE,
    BUTTONS_DELETE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    truckType: yup.string().required(t(VALIDATE_REQUIRED)),
    truckNo: yup.string().required(t(VALIDATE_REQUIRED)),
    truckLoad: yup.string().required(t(VALIDATE_REQUIRED)),
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
      className={`modal-custom modal-truck ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>{formTitle ? formTitle : t(TRUCK_NEW_TITLE)}</Modal.Header>
      <Modal.Body>
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            mode === 'create' ? handleCreate(values) : handleUpdate(values);
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
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="truckType"
                  className="form-group-truckType"
                >
                  <Form.Label className="form-label-required">
                    {t(I18N.TRUCK_TYPE)} <span>*</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue={initialValues.truckType}
                    className="block-filter-options"
                    name="filter"
                  >
                    <option
                      value={TRUCK_TYPE.ALL}
                      selected={
                        initialValues.truckType === TRUCK_TYPE.ALL
                          ? true
                          : false
                      }
                    >
                      {TRUCKTYPE_LABEL.ALL}
                    </option>
                    <option
                      value={TRUCK_TYPE.TRAILOR}
                      selected={
                        initialValues.truckType === TRUCK_TYPE.ALL
                          ? true
                          : false
                      }
                    >
                      {TRUCKTYPE_LABEL.TRAILOR}
                    </option>
                    <option
                      value={TRUCK_TYPE.NORMAL}
                      selected={
                        initialValues.truckType === TRUCK_TYPE.ALL
                          ? true
                          : false
                      }
                    >
                      {TRUCKTYPE_LABEL.NORMAL}
                    </option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errors.truckType}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="truckNo"
                  className="form-group-truckNo"
                >
                  <Form.Label className="form-label-required">
                    {t(TRUCK_PLATE_NO)} <span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={values.truckNo}
                    onChange={handleChange}
                    isInvalid={!!errors.truckNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.truckNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="truckLoad"
                  className="form-group-truckLoad"
                >
                  <Form.Label className="form-label-required">
                    {t(TRUCK_LOAD)} <span>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="truckLoad"
                    value={values.truckLoad}
                    onChange={handleChange}
                    isInvalid={!!errors.truckLoad}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.truckLoad}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Label>{t(TRUCK_CERIFICATE)}</Form.Label>
                <Form.File
                  id="idCardFrontImage"
                  label={t(BUTTONS_CHOOSE_IMAGE)}
                  onChange={handleUploadLicense}
                  custom
                />
              </Form.Row>
              <ButtonGroup className="form-actions">
                {mode === 'create' && (
                  <Button variant="primary" type="submit">
                    <span>{t(BUTTONS_CREATE)}</span>
                    <i className="ico ico-plus"></i>
                  </Button>
                )}
                {mode === 'update' && (
                  <Button variant="primary" type="submit">
                    <span>{t(BUTTONS_UPDATE)}</span>
                    <i className="ico ico-plus"></i>
                  </Button>
                )}
                {mode === 'update' && (
                  <Button onClick={handleDelete}>
                    <span>{t(BUTTONS_DELETE)}</span>
                    <i className="ico ico-delete"></i>
                  </Button>
                )}
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default observer(TruckFormModal);
