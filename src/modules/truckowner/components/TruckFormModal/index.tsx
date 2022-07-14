import React from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import { TruckType } from '@/modules/truckowner/truckowner.constants';
import { ACTION_MODE } from '@/libs/enums/action.enum';
import bsCustomFileInput from 'bs-custom-file-input';
import { NUMBER_REGEXP } from '@/libs/constants/rules.constants';
import { IMAGE_TYPE } from '../../truckowner.enum';
import { MAXIMUM_OTHER_DOCUMENT } from '@/modules/account/account.constants';
import { getExtention, isImage } from '@/libs/utils/file.util';
import { handleDeleteURLOtherDocument } from '@/libs/utils/upload.util';
/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  initialValues?: any;
  handleSubmitTruck: any;
  handleDelete: any;
  handleUploadCetificate: any;
  handleDeleteImage: any;
  show: boolean;
  handleClose: any;
  mode: string;
  handleUploadMultipleDocument: (event: any) => void;
  handleDeleteOtherDocument: (key: string) => Promise<boolean>;
  disableChooseOtherDocument: boolean;
}

const TruckFormModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleSubmitTruck,
    handleDelete,
    handleUploadCetificate,
    handleDeleteImage,
    formTitle = '',
    initialValues,
    show,
    handleClose,
    mode,
    handleUploadMultipleDocument,
    handleDeleteOtherDocument,
    disableChooseOtherDocument,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    TRUCK_NEW_TITLE,
    TRUCK_TYPE,
    TRUCK_PLATE_NO,
    TRUCK_LOAD,
    TRUCK_CERIFICATE,
    BUTTONS_CREATE,
    BUTTONS_DELETE,
    BUTTONS_UPDATE,
    BUTTONS_CHOOSE_IMAGE,
    MESSAGES_IMAGE_SIZE,
    VALIDATE_REQUIRED,
    VALIDATE_NUMBER,
    BUTTONS_CHOOSE_MULTIPLE,
    MESSAGES_DOCUMENT_SIZE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    truckType: yup
      .string()
      .required(t(VALIDATE_REQUIRED))
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER)),
    truckNo: yup.string().notRequired(),
    truckLoad: yup.string().notRequired(),
  });

  const [certificate, setCertificate] = React.useState<string>('');

  const [otherDocumentURLs, setOtherDocumentURLs] = React.useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    setCertificate(initialValues.certificateURL);
    setOtherDocumentURLs(initialValues.otherDocumentURLs);
  }, [initialValues]);

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
            handleSubmitTruck(values);
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
              className={`form form-truck ${className ? className : ''}`}
              style={style}
            >
              {children}
              <Form.Group
                as={Col}
                md="12"
                controlId="truckType"
                className="form-group-truckType"
              >
                <Form.Label className="form-label-required">
                  {t(TRUCK_TYPE)} <span>*</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="truckType"
                  defaultValue={values.truckType}
                  onChange={handleChange}
                  isInvalid={!!errors.truckType}
                >
                  {TruckType.map((value, index) => {
                    return (
                      <option key={`status-${index}`} value={value.key}>
                        {t(value.label)}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.truckType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                md="12"
                controlId="truckNo"
                className="form-group-truckNo"
              >
                <Form.Label>{t(TRUCK_PLATE_NO)}</Form.Label>
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
              <Form.Group
                as={Col}
                md="12"
                controlId="truckLoad"
                className="form-group-truckLoad"
              >
                <Form.Label>{t(TRUCK_LOAD)}</Form.Label>
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
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t(TRUCK_CERIFICATE)}</Form.Label>
                <div className="form-image-wrapper">
                  {certificate && (
                    <div className="image">
                      <a
                        className="zoom-image"
                        href={certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={certificate} alt={t(TRUCK_CERIFICATE)} />
                      </a>
                      <Button
                        className="btn-icon"
                        onClick={() => {
                          setCertificate('');
                          handleDeleteImage(IMAGE_TYPE.CERTIFICATE);
                        }}
                      >
                        <i className="ico ico-o-close"></i>
                      </Button>
                    </div>
                  )}
                  <Form.File
                    id="idCardFrontImage"
                    label={t(BUTTONS_CHOOSE_IMAGE)}
                    onChange={handleUploadCetificate}
                    custom
                  />
                  <span className="image-size">{t(MESSAGES_IMAGE_SIZE)}</span>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t('Other Document')}</Form.Label>
                <div className="form-image-wrapper">
                  {otherDocumentURLs &&
                    Object.keys(otherDocumentURLs).map((key: string) => (
                      <div className="image">
                        <a
                          className="zoom-image"
                          href={otherDocumentURLs[key]}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {isImage(otherDocumentURLs[key]) ? (
                            <img
                              src={otherDocumentURLs[key]}
                              alt={`${t('Other Document')}${key}`}
                            />
                          ) : (
                            <span>{`${key}.${getExtention(
                              otherDocumentURLs[key]
                            )}`}</span>
                          )}
                        </a>
                        <Button
                          className={
                            'btn-icon ' +
                            (!isImage(otherDocumentURLs[key])
                              ? 'btn-other-doc'
                              : '')
                          }
                          onClick={async () => {
                            if (await handleDeleteOtherDocument(key)) {
                              handleDeleteURLOtherDocument(
                                key,
                                otherDocumentURLs,
                                setOtherDocumentURLs
                              );
                            }
                          }}
                        >
                          <i className="ico ico-o-close"></i>
                        </Button>
                      </div>
                    ))}
                  <Form.File
                    id="idOtherDocument"
                    label={t(BUTTONS_CHOOSE_MULTIPLE)}
                    onChange={(event: any) => {
                      handleUploadMultipleDocument(event);
                    }}
                    disabled={
                      disableChooseOtherDocument ||
                      (otherDocumentURLs &&
                        Object.keys(otherDocumentURLs).length >=
                          MAXIMUM_OTHER_DOCUMENT)
                    }
                    custom
                    multiple
                  />
                  <span className="image-size">
                    {t(MESSAGES_DOCUMENT_SIZE)}
                  </span>
                </div>
              </Form.Group>

              <ButtonGroup className="form-actions">
                {mode === ACTION_MODE.CREATE && (
                  <Button variant="dark" type="submit">
                    <span>{t(BUTTONS_CREATE)}</span>
                    <i className="ico ico-plus"></i>
                  </Button>
                )}
                {mode === ACTION_MODE.EDIT && (
                  <Button variant="dark" type="submit">
                    <span>{t(BUTTONS_UPDATE)}</span>
                    <i className="ico ico-plus"></i>
                  </Button>
                )}
                {mode === ACTION_MODE.EDIT && (
                  <Button variant="dark" onClick={handleDelete}>
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
