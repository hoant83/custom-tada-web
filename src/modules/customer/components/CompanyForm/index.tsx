import React from 'react';
import { observer } from 'mobx-react-lite';

import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';

import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { BUTTONVARIANT } from '@/libs/enums/button.enum';

import {
  Form,
  Row,
  Col,
  Button,
  ButtonGroup,
  Container,
} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Formik } from 'formik';
import * as yup from 'yup';
import bsCustomFileInput from 'bs-custom-file-input';

import { ACTION_MODE } from '@/libs/enums/action.enum';
import { PHONE_REGEXP, NUMBER_REGEXP } from '@/libs/constants/rules.constants';

import { NewCompanyRequestDto } from '@/modules/customer/customer.dto';
import { newCompanyInit } from '@/modules/customer/customer.constants';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  mode: string;
  handleSubmitForm: any;
  initialValues: NewCompanyRequestDto;
  handleUploadBusinessLicense: any;
  handleUploadIcon: any;
  handleDeleteCompanyBusinessLicense: any;
  handleDeleteCompanyIcon: any;
}

const CompanyForm = (props: ComponentProps) => {
  const customerStore = React.useContext(CustomerStoreContext);
  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    mode,
    handleSubmitForm,
    initialValues = newCompanyInit,
    handleUploadBusinessLicense,
    handleUploadIcon,
    handleDeleteCompanyBusinessLicense,
    handleDeleteCompanyIcon,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_PHONE,
    VALIDATE_REQUIRED,
    VALIDATE_NUMBER,
    BUTTONS_UPDATE,
    BUTTONS_CREATE,
    COMPANY_NAME,
    COMPANY_PHONE,
    COMPANY_ADDRESS,
    COMPANY_BUSINESS_LICENSENO,
    BUTTONS_CHOOSE_IMAGE,
    COMPANY_ICON,
    COMPANY_BUSINESS_LICENSE,
    MESSAGES_IMAGE_SIZE,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    name: yup.string().required(t(VALIDATE_REQUIRED)),
    phone: yup.string().matches(PHONE_REGEXP, t(VALIDATE_PHONE)).notRequired(),
    address: yup.string().notRequired(),
    licenseNo: yup
      .string()
      .matches(NUMBER_REGEXP, t(VALIDATE_NUMBER))
      .notRequired(),
  });

  const [companyIco, setCompanyIco] = React.useState<string>('');

  const [businessLicense, setBusinessLicense] = React.useState<string>('');

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  React.useEffect(() => {
    if (customerStore.company) {
      setCompanyIco(customerStore.company.companyIconUrl);
      setBusinessLicense(customerStore.company.businessLicenseUrl);
    }
  }, [customerStore.company]);

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
                    controlId="name"
                    className="form-group-name"
                  >
                    <Form.Label className="form-label form-label-required">
                      {t(COMPANY_NAME)} <span>*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      readOnly={authStore.loggedUser?.accountRole === 1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="phone"
                    className="form-group-phone"
                  >
                    <Form.Label className="form-label">
                      {t(COMPANY_PHONE)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      readOnly={authStore.loggedUser?.accountRole === 1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="address"
                    className="form-group-address"
                  >
                    <Form.Label className="form-label">
                      {t(COMPANY_ADDRESS)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                      readOnly={authStore.loggedUser?.accountRole === 1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="licenseNo"
                    className="form-group-licenseNo"
                  >
                    <Form.Label className="form-label">
                      {t(COMPANY_BUSINESS_LICENSENO)}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.licenseNo}
                      onChange={handleChange}
                      isInvalid={!!errors.licenseNo}
                      readOnly={authStore.loggedUser?.accountRole === 1}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.licenseNo}
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
                    <Form.Label className="form-label">
                      {t(COMPANY_ICON)}
                      <span className="image-size">
                        {t(MESSAGES_IMAGE_SIZE)}
                      </span>
                    </Form.Label>
                    {companyIco && (
                      <div className="image">
                        <a
                          className="zoom-image"
                          href={companyIco}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image src={`${companyIco}`} />
                        </a>
                        {authStore.loggedUser?.accountRole !== 1 && (
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setCompanyIco('');
                              handleDeleteCompanyIcon();
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        )}
                      </div>
                    )}
                    {authStore.loggedUser?.accountRole !== 1 && (
                      <Form.File
                        id="companyIconUrl"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadIcon}
                        custom
                      />
                    )}
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={5}
                    controlId="businessLicenseUrl"
                    className="form-group-businessLicenseUrl"
                  >
                    <Form.Label className="form-label">
                      {t(COMPANY_BUSINESS_LICENSE)}
                      <span className="image-size">
                        {t(MESSAGES_IMAGE_SIZE)}
                      </span>
                    </Form.Label>
                    {businessLicense && (
                      <div className="image">
                        <a
                          className="zoom-image"
                          href={businessLicense}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image src={`${businessLicense}`} />
                        </a>
                        {authStore.loggedUser?.accountRole !== 1 && (
                          <Button
                            className="btn-icon"
                            onClick={() => {
                              setBusinessLicense('');
                              handleDeleteCompanyBusinessLicense();
                            }}
                          >
                            <i className="ico ico-o-close"></i>
                          </Button>
                        )}
                      </div>
                    )}
                    {authStore.loggedUser?.accountRole !== 1 && (
                      <Form.File
                        id="iconCompany"
                        label={t(BUTTONS_CHOOSE_IMAGE)}
                        onChange={handleUploadBusinessLicense}
                        custom
                      />
                    )}
                  </Form.Group>
                </Row>
                {authStore.loggedUser?.accountRole !== 1 && (
                  <ButtonGroup className="form-actions">
                    <Button variant={BUTTONVARIANT.PRIMARY} type="submit">
                      <span>
                        {mode === ACTION_MODE.EDIT
                          ? t(BUTTONS_UPDATE)
                          : t(BUTTONS_CREATE)}
                      </span>
                      <i
                        className={`ico ${
                          mode === ACTION_MODE.EDIT
                            ? 'ico-update'
                            : 'ico-o-next'
                        }`}
                      ></i>
                    </Button>
                  </ButtonGroup>
                )}
              </Container>
            </Form.Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(CompanyForm);
