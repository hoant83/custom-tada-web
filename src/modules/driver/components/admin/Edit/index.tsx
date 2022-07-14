import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  MAXIMUM_OTHER_DOCUMENT,
  VerifiedStatus,
} from '@/modules/account/account.constants';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import Image from 'react-bootstrap/Image';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import { NUMBER_REGEXP, PHONE_REGEXP } from '@/libs/constants/rules.constants';
import { AdminStoreContext } from '@/modules/admin-user/admin.store';
import bsCustomFileInput from 'bs-custom-file-input';
import { isImage, getExtention } from '@/libs/utils/file.util';
import { toJS } from 'mobx';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues: any;
  handleSubmitForm: any;
  handleDelete: any;
  handleUploadCardFront: any;
  handleUploadCardBack: any;
  handleDeleteFiles: any;
  handleUploadLicense: any;
  handleBack: any;
  handleUploadMultipleDocument: (event: any) => void;
  handleDeleteOtherDocument: (key: string) => Promise<boolean>;
  disableChooseOtherDocument: boolean;
}

const EditDriverFormAdmin = (props: ComponentProps) => {
  const adminStore = React.useContext(AdminStoreContext);
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    initialValues,
    handleSubmitForm,
    handleUploadCardFront,
    handleUploadCardBack,
    handleDeleteFiles,
    handleUploadLicense,
    handleBack,
    handleUploadMultipleDocument,
    handleDeleteOtherDocument,
    disableChooseOtherDocument,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_UPDATE,
    DRIVER_PHONE,
    DRIVER_STATUS,
    DRIVER_NAME,
    ACCOUNT_EMAIL,
    DRIVER_CARD_BACK,
    DRIVER_CARD_FRONT,
    DRIVER_LICENCE_CARD,
    CUSTOMER_ADMIN_CARDNO,
    BUTTONS_CHOOSE_IMAGE,
    VALIDATE_EMAIL,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    BUTTONS_CANCEL,
    BUTTONS_CHOOSE_MULTIPLE,
    ACCOUNT_PASSWORD,
    ACCOUNT_CONFIRM_PASSWORD,
    VALIDATE_CONFIRM_PASSWORD,
  } = I18N;

  const [cardFront, setCardFront] = React.useState<string>('');

  const [cardBack, setCardBack] = React.useState<string>('');

  const [license, setLicense] = React.useState<string>('');

  const [otherDocumentURLs, setOtherDocumentURLs] = React.useState<
    Record<string, string>
  >({});

  const handleDeleteURLOtherImage = (key: string) => {
    if (otherDocumentURLs && otherDocumentURLs.hasOwnProperty(key)) {
      delete otherDocumentURLs[key];

      setOtherDocumentURLs({ ...otherDocumentURLs });
    }
  };
  /*
   * Validation
   */
  const schema = yup.object({
    email: yup.string().email(t(VALIDATE_EMAIL)).notRequired().nullable(),
    phoneNumber: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired(),
    cardNo: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
    password: yup.string(),
    confirmPassword: yup
      .string()
      .when('password', {
        is: (val) => val && val.length > 0,
        then: yup.string().required(t(VALIDATE_CONFIRM_PASSWORD)),
      })
      .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD)),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    if (initialValues) {
      setCardFront(initialValues.cardFrontURL);
      setCardBack(initialValues.cardBackURL);
      setLicense(initialValues.licenseURL);
      setOtherDocumentURLs(initialValues.otherDocumentURLs);
    }
  }, [adminStore.updateDriver, initialValues]);

  return (
    <>
      {initialValues && (
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleSubmitForm(values, initialValues);
          }}
          initialValues={initialValues}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            setFieldValue,
          }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`form form-order order-standard ${
                className ? className : ''
              }`}
              style={style}
            >
              <Form.Row className="admin-info">
                <Container fluid>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="email"
                      className="form-group-email"
                    >
                      <Form.Label className="form-label">
                        {t(ACCOUNT_EMAIL)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        value={values.email ?? ''}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="status"
                      className="status"
                    >
                      <Form.Label className="form-label-required">
                        {t(DRIVER_STATUS)} <span>*</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="verifiedStatus"
                        defaultValue={values.verifiedStatus}
                        onChange={handleChange}
                        isInvalid={!!errors.verifiedStatus}
                      >
                        {VerifiedStatus.map((value, index) => {
                          return (
                            <option
                              key={`verified-status-${index}`}
                              value={value.key}
                            >
                              {t(value.label)}
                            </option>
                          );
                        })}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="phoneNumber"
                      className="form-group-phoneNumber"
                    >
                      <Form.Label className="form-label">
                        {t(DRIVER_PHONE)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.phoneNumber ?? ''}
                        onChange={handleChange}
                        isInvalid={!!errors.phoneNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phoneNumber}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="firstName"
                      className="form-group-firstName"
                    >
                      <Form.Label className="form-label">
                        {t(DRIVER_NAME)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.firstName ?? ''}
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="cardNo"
                      className="form-group-cardNo"
                    >
                      <Form.Label className="form-label">
                        {t(CUSTOMER_ADMIN_CARDNO)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.cardNo ?? ''}
                        onChange={handleChange}
                        isInvalid={!!errors.cardNo}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cardNo}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="password"
                      className="form-group-password"
                    >
                      <Form.Label className="form-label">
                        {t(ACCOUNT_PASSWORD)}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        value={values.password ?? ''}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="confirmPassword"
                      className="form-group-password"
                    >
                      <Form.Label className="form-label">
                        {t(ACCOUNT_CONFIRM_PASSWORD)}
                      </Form.Label>
                      <Form.Control
                        type="password"
                        autoComplete="new-password"
                        value={values.confirmPassword ?? ''}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="cardFront"
                      className="form-group-cardFront"
                    >
                      <Form.Label className="form-label">
                        {t(DRIVER_CARD_FRONT)}
                      </Form.Label>
                      {cardFront && (
                        <div className="image">
                          <a
                            className="zoom-image"
                            href={cardFront}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image src={`${cardFront}`} />
                          </a>
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setCardFront('');
                              handleDeleteFiles(
                                REFERENCE_TYPE.DRIVER_ID_CARD_FRONT_IMAGE
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="companyIconUrl"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadCardFront}
                        custom
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="cardBack"
                      className="form-group-cardBack"
                    >
                      <Form.Label className="form-label">
                        {t(DRIVER_CARD_BACK)}
                      </Form.Label>
                      {cardBack && (
                        <div className="image">
                          <a
                            className="zoom-image"
                            href={cardBack}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image src={`${cardBack}`} />
                          </a>
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setCardBack('');
                              handleDeleteFiles(
                                REFERENCE_TYPE.DRIVER_ID_CARD_BACK_IMAGE
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="license"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadCardBack}
                        custom
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="license"
                      className="form-group-license"
                    >
                      <Form.Label className="form-label">
                        {t(DRIVER_LICENCE_CARD)}
                      </Form.Label>
                      {license && (
                        <div className="image">
                          <a
                            className="zoom-image"
                            href={license}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image src={`${license}`} />
                          </a>
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setCardBack('');
                              handleDeleteFiles(REFERENCE_TYPE.DRIVER_LICENSE);
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="iconCompany"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadLicense}
                        custom
                      />
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={6}
                      controlId="otherDoc"
                      className="form-group-license"
                    >
                      <Form.Label className="form-label">
                        {t('Other Document')}
                      </Form.Label>
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
                                  handleDeleteURLOtherImage(key);
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
                      ></Form.File>
                    </Form.Group>
                  </Row>
                  <ButtonGroup className="form-actions">
                    <Button variant={BUTTONVARIANT.PRIMARY} type="submit">
                      <span>{t(BUTTONS_UPDATE)}</span>
                      <i className="ico ico-update"></i>
                    </Button>
                    <Button onClick={handleBack}>
                      <span>{t(BUTTONS_CANCEL)}</span>
                      <i className="ico ico-delete"></i>
                    </Button>
                  </ButtonGroup>
                </Container>
              </Form.Row>
            </Form>
          )}
        </Formik>
      )}
      {children}
    </>
  );
};

export default observer(EditDriverFormAdmin);
