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
import { ACTION_MODE } from '@/libs/enums/action.enum';
import bsCustomFileInput from 'bs-custom-file-input';
import { IMAGE_TYPE } from '@/modules/truckowner/truckowner.enum';
import { MAXIMUM_OTHER_DOCUMENT } from '@/modules/account/account.constants';
import { isImage, getExtention } from '@/libs/utils/file.util';
import { handleDeleteURLOtherDocument } from '@/libs/utils/upload.util';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  initialValues?: NewDriverDto;
  handleSubmitDriver: any;
  handleDelete: any;
  handleUploadCardFront: any;
  handleUploadCardBack: any;
  handleUploadLicense: any;
  handleDeleteImage: any;
  show: boolean;
  handleClose: any;
  mode: string;
  handleUploadMultipleDocument: (event: any) => void;
  handleDeleteOtherDocument: (key: string) => Promise<boolean>;
  disableChooseOtherDocument: boolean;
}

const DriverFormModal = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleSubmitDriver,
    handleDelete,
    handleUploadCardFront,
    handleUploadCardBack,
    handleUploadLicense,
    handleDeleteImage,
    formTitle = '',
    initialValues = newFormInit,
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
    BUTTONS_DELETE,
    BUTTONS_UPDATE,
    BUTTONS_CHOOSE_IMAGE,
    MESSAGES_IMAGE_SIZE,
    BUTTONS_CHOOSE_MULTIPLE,
    MESSAGES_DOCUMENT_SIZE,
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

  const [cardFront, setCardFront] = React.useState<string>('');

  const [cardBack, setCardBack] = React.useState<string>('');

  const [licenseCard, setLicenseCard] = React.useState<string>('');

  const [otherDocumentURLs, setOtherDocumentURLs] = React.useState<
    Record<string, string>
  >({});

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    if (initialValues) {
      setCardFront(initialValues.idCardFrontImage);
      setCardBack(initialValues.idCardBackImage);
      setLicenseCard(initialValues.driverLicense);
      setOtherDocumentURLs(
        initialValues.otherDocumentURLs ? initialValues.otherDocumentURLs : {}
      );
    }
  }, [initialValues]);

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
            handleSubmitDriver(values);
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
                <div className="form-image-wrapper">
                  {cardFront && (
                    <div className="image">
                      <a
                        className="zoom-image"
                        href={cardFront}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={cardFront} alt={t(DRIVER_CARD_FRONT)} />
                      </a>
                      <Button
                        className="btn-icon"
                        onClick={() => {
                          setCardFront('');
                          handleDeleteImage(IMAGE_TYPE.FRONT);
                        }}
                      >
                        <i className="ico ico-o-close"></i>
                      </Button>
                    </div>
                  )}
                  <Form.File
                    id="idCardFrontImage"
                    label={t(BUTTONS_CHOOSE_IMAGE)}
                    onChange={handleUploadCardFront}
                    custom
                  />
                  <span className="image-size">
                    {t(MESSAGES_DOCUMENT_SIZE)}
                  </span>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t(DRIVER_CARD_BACK)}</Form.Label>
                <div className="form-image-wrapper">
                  {cardBack && (
                    <div className="image">
                      <a
                        className="zoom-image"
                        href={cardBack}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={cardBack} alt={t(DRIVER_CARD_BACK)} />
                      </a>
                      <Button
                        className="btn-icon"
                        onClick={() => {
                          setCardBack('');
                          handleDeleteImage(IMAGE_TYPE.BACK);
                        }}
                      >
                        <i className="ico ico-o-close"></i>
                      </Button>
                    </div>
                  )}
                  <Form.File
                    id="idCardBackImage"
                    label={t(BUTTONS_CHOOSE_IMAGE)}
                    onChange={handleUploadCardBack}
                    custom
                  />
                  <span className="image-size">{t(MESSAGES_IMAGE_SIZE)}</span>
                </div>
              </Form.Group>
              <Form.Group as={Col} md="12" className="form-file">
                <Form.Label>{t(DRIVER_LICENCE_CARD)}</Form.Label>
                <div className="form-image-wrapper">
                  {licenseCard && (
                    <div className="image">
                      <a
                        className="zoom-image"
                        href={licenseCard}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={licenseCard} alt={t(DRIVER_LICENCE_CARD)} />
                      </a>
                      <Button
                        className="btn-icon"
                        onClick={() => {
                          setLicenseCard('');
                          handleDeleteImage(IMAGE_TYPE.LICENSE);
                        }}
                      >
                        <i className="ico ico-o-close"></i>
                      </Button>
                    </div>
                  )}
                  <Form.File
                    id="driverLicense"
                    label={t(BUTTONS_CHOOSE_IMAGE)}
                    onChange={handleUploadLicense}
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

export default observer(DriverFormModal);
