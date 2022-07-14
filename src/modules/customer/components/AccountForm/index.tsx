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
  handleUploadAvatar?: any;
  handleDeleteFiles?: any;
  handleChangeType?: any;
  companyType?: boolean;
  handleChangeAccountType?: any;
  accountType?: number;
}

const CustomerAccountForm = (props: ComponentProps) => {
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
    handleUploadAvatar,
    handleDeleteFiles,
    handleChangeType,
    companyType,
    handleChangeAccountType,
    accountType,
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
    CUSTOMER_TYPE_CORPORATE,
    CUSTOMER_TYPE_LOGISTIC_FORWARDER,
    CUSTOMER_TYPE_BUSINESS_PARTNER,
    CUSTOMER_STATUS_LABEL,
    CUSTOMER_STATUS_LABELNOTE,
    CUSTOMER_ADMIN_EMAIL,
    CUSTOMER_ADMIN_CONTACTNO,
    CUSTOMER_ADMIN_CARDNO,
    CUSTOMER_ADMIN_CARDFRONT,
    CUSTOMER_ADMIN_CARDBACK,
    CUSTOMER_NAME,
    MESSAGES_IMAGE_SIZE,
    CUSTOMER_ADMIN_PROFILE_IMG,
    CUSTOMER_NEW_TYPE_LABEL,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    firstName: yup.string().notRequired(),
    email: yup.string().email(t(VALIDATE_EMAIL)).notRequired(),
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

  const [avatar, setAvatar] = React.useState<string>('');

  // const [cardBack, setCardBack] = React.useState<string>('');

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    if (authStore.loggedUser) {
      setCardFront(authStore.loggedUser.frontCardUrl);
      setCardBack(authStore.loggedUser.backCardUrl);
      setAvatar(authStore.loggedUser.avatarUrl);
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
                      disabled={
                        authStore.loggedUser?.accountRole !== 0 ? true : false
                      }
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
                      disabled={
                        authStore.loggedUser?.accountRole !== 0 ? true : false
                      }
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
                    controlId="accountType"
                    className="form-group-accountType"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_NEW_TYPE_LABEL)}
                    </Form.Label>
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeAccountType(0);
                      }}
                      label={t(CUSTOMER_TYPE_INDIVIDUAL)}
                      checked={accountType === 0 ? true : false}
                      name="accountType"
                      id="accountType1"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeAccountType(1);
                      }}
                      label={t(CUSTOMER_TYPE_CORPORATE)}
                      checked={accountType === 1 ? true : false}
                      name="accountType"
                      id="accountType2"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeAccountType(2);
                      }}
                      label={t(CUSTOMER_TYPE_LOGISTIC_FORWARDER)}
                      checked={accountType === 2 ? true : false}
                      name="accountType"
                      id="accountType3"
                    />
                    <Form.Check
                      inline
                      type="radio"
                      onChange={() => {
                        handleChangeAccountType(3);
                      }}
                      label={t(CUSTOMER_TYPE_BUSINESS_PARTNER)}
                      checked={accountType === 3 ? true : false}
                      name="accountType"
                      id="accountType4"
                    />
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
                      {t(CUSTOMER_NAME)}
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
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="companyIconUrl"
                    className="form-group-companyIconUrl"
                  >
                    <div className="form-image-wrapper">
                      <Form.Label className="form-label">
                        {t(CUSTOMER_ADMIN_CARDFRONT)}
                        <span className="image-size">
                          {t(MESSAGES_IMAGE_SIZE)}
                        </span>
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
                                REFERENCE_TYPE.CUSTOMER_ID_CARD_FRONT_IMAGE
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
                    </div>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="businessLicenseUrl"
                    className="form-group-businessLicenseUrl"
                  >
                    <div className="form-image-wrapper">
                      <Form.Label className="form-label">
                        {t(CUSTOMER_ADMIN_CARDBACK)}
                        <span className="image-size">
                          {t(MESSAGES_IMAGE_SIZE)}
                        </span>
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
                                REFERENCE_TYPE.CUSTOMER_ID_CARD_BACK_IMAGE
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="iconCompany"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadCardBack}
                        custom
                      />
                    </div>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="avatarUrl"
                    className="form-group-avatarUrl"
                  >
                    <div className="form-image-wrapper">
                      <Form.Label className="form-label">
                        {t(CUSTOMER_ADMIN_PROFILE_IMG)}
                        <span className="image-size">
                          {t(MESSAGES_IMAGE_SIZE)}
                        </span>
                      </Form.Label>
                      {avatar && (
                        <div className="image">
                          <a
                            className="zoom-image"
                            href={avatar}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image src={`${avatar}`} />
                          </a>
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setAvatar('');
                              handleDeleteFiles(
                                REFERENCE_TYPE.CUSTOMER_PROFILE_IMG
                              );
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        </div>
                      )}
                      <Form.File
                        id="iconCompany"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadAvatar}
                        custom
                      />
                    </div>
                  </Form.Group>
                </Row>
                {/* <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    controlId="profileUrl"
                    className="form-group-block form-group-profileUrl"
                  >
                    <Form.Label className="form-label">
                      {t(CUSTOMER_PROFILE_PICTURE)}
                    </Form.Label>
                    {cardFront && (
                      <div className="image">
                        <Image src={`${cardFront}`} />
                        <Button
                          className="btn-icon"
                          onClick={() => {
                            setCardFront('');
                            handleDeleteFiles(
                              REFERENCE_TYPE.
                            );
                          }}
                        >
                          <i className="ico ico-o-close"></i>
                        </Button>
                      </div>
                    )}
                    <Form.File
                      id="profileUrl"
                      label={t(BUTTONS_CHOOSE_IMAGE)}
                      onChange={handleUploadCardFront}
                      custom
                    />
                  </Form.Group>
                </Row> */}
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

export default observer(CustomerAccountForm);
