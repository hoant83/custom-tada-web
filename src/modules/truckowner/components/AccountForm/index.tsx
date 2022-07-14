import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';
import { REFERENCE_TYPE } from '@/modules/account/referenceType.enum';
import { getVerifiedStatus } from '@/modules/truckowner/truckowner.util';

import {
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
  Container,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import { Formik } from 'formik';
import * as yup from 'yup';
import bsCustomFileInput from 'bs-custom-file-input';
import { PHONE_REGEXP, NUMBER_REGEXP } from '@/libs/constants/rules.constants';
import Image from 'react-bootstrap/Image';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues?: any;
  handleSubmitForm?: any;
  handleUploadCardFront?: any;
  handleUploadCardBack?: any;
  handleDeleteFiles?: any;
  handleChangeType?: any;
  companyType?: boolean;
}

const TruckOwnerAccountForm = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);

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
    handleChangeType,
    companyType,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_EMAIL,
    VALIDATE_PHONE,
    VALIDATE_NUMBER,
    BUTTONS_UPDATE,
    BUTTONS_CHOOSE_IMAGE,
    CUSTOMER_TYPE_LABEL,
    CUSTOMER_TYPE_COMPANY,
    CUSTOMER_TYPE_INDIVIDUAL,
    CUSTOMER_STATUS_LABEL,
    CUSTOMER_STATUS_LABELNOTE,
    CUSTOMER_ADMIN_EMAIL,
    CUSTOMER_ADMIN_CONTACTNO,
    CUSTOMER_ADMIN_CARDNO,
    CUSTOMER_ADMIN_CARDFRONT,
    CUSTOMER_ADMIN_CARDBACK,
    CUSTOMER_ADMIN_NAME,
    MESSAGES_IMAGE_SIZE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    email: yup.string().email(t(VALIDATE_EMAIL)).notRequired(),
    firstName: yup.string().notRequired(),
    phoneNumber: yup
      .string()
      .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
      .notRequired(),
    cardNo: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
  });

  const [cardFront, setCardFront] = React.useState<string>('');

  const [cardBack, setCardBack] = React.useState<string>('');

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    if (authStore.loggedUser) {
      setCardFront(authStore.loggedUser.frontCardUrl);
      setCardBack(authStore.loggedUser.backCardUrl);
    }
  }, [authStore.loggedUser]);

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
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="customerType"
                    className="form-group-customerType"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_TYPE_LABEL)}
                    </Form.Label>
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeType(true);
                      }}
                      label={t(CUSTOMER_TYPE_COMPANY)}
                      checked={companyType ? true : false}
                      name="companyType"
                      id="companyType1"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeType(false);
                      }}
                      label={t(CUSTOMER_TYPE_INDIVIDUAL)}
                      checked={!companyType ? true : false}
                      name="companyType"
                      id="companyType2"
                    />
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    className="form-group-verifiedStatus"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_STATUS_LABEL)}
                    </Form.Label>
                    <div className="account-status">
                      {getVerifiedStatus(t, initialValues.verifiedStatus)}
                    </div>
                    <OverlayTrigger
                      key={'top'}
                      placement={'top'}
                      overlay={
                        <Tooltip id="tooltip-info">
                          {t(CUSTOMER_STATUS_LABELNOTE)}
                        </Tooltip>
                      }
                    >
                      <div className="tooltip-icon">
                        <span className="ico ico-faq"></span>
                      </div>
                    </OverlayTrigger>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="email"
                    className="form-group-email"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_ADMIN_EMAIL)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="firstName"
                    className="form-group-firstName"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_ADMIN_NAME)}
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
                    lg={7}
                    controlId="phoneNumber"
                    className="form-group-phoneNumber"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_ADMIN_CONTACTNO)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.phoneNumber ?? ''}
                      onChange={handleChange}
                      isInvalid={!!errors.phoneNumber}
                      readOnly
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="cardNo"
                    className="form-group-cardNo"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_ADMIN_CARDNO)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="cardNo"
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
                    lg={7}
                    className="form-group-cardFront"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_ADMIN_CARDFRONT)}
                    </Form.Label>
                    <div className="form-image-wrapper">
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
                                REFERENCE_TYPE.TRUCK_OWNER_ID_CARD_FRONT_IMAGE
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="cardFront"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadCardFront}
                        custom
                      />
                      <span className="image-size">
                        {t(MESSAGES_IMAGE_SIZE)}
                      </span>
                    </div>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    className="form-group-cardBack"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_ADMIN_CARDBACK)}
                    </Form.Label>
                    <div className="form-image-wrapper">
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
                                REFERENCE_TYPE.TRUCK_OWNER_ID_CARD_BACK_IMAGE
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="cardBack"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadCardBack}
                        custom
                      />
                      <span className="image-size">
                        {t(MESSAGES_IMAGE_SIZE)}
                      </span>
                    </div>
                  </Form.Group>
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

export default observer(TruckOwnerAccountForm);
