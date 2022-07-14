import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Col, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import { PHONE_REGEXP } from '@/libs/constants/rules.constants';
import {
  customerAccountTypes,
  getCustomerAccountType,
} from '../../account.constants';
import { THEMES } from '@/theme.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleRegister: any;
  handleLogin?: any;
  formTitle?: string;
  initialValues?: any;
  required?: any;
  isCustomerPage: boolean;
}

const RegisterForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleRegister,
    handleLogin = false,
    formTitle = '',
    initialValues = {
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      accountType: '',
      referalCode: '',
    },
    required = {
      email: true,
      password: true,
      confirmPassword: true,
      phone: false,
      accountType: true,
    },
    isCustomerPage = process.env.REACT_APP_THEME === THEMES.TADATRUCK
      ? true
      : false,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_EMAIL,
    VALIDATE_REQUIRED,
    VALIDATE_CONFIRM_PASSWORD,
    VALIDATE_PHONE,
    ACCOUNT_CREATE_TITLE,
    ACCOUNT_EMAIL,
    PLACEHOLDER_EMAIL,
    ACCOUNT_PASSWORD,
    PLACEHOLDER_PASSWORD,
    ACCOUNT_CONFIRM_PASSWORD,
    PLACEHOLDER_CONFIRM_PASSWORD,
    ACCOUNT_PHONE,
    ACCOUNT_PHONE_REQUIRED,
    ACCOUNT_CUSTOMER_TYPE,
    PLACEHOLDER_PHONE,
    BUTTONS_LOGIN,
    BUTTONS_SIGNUP,
    ACCOUNT_REFERAL_CODE,
  } = I18N;

  /*
   * Validation
   */
  const schema = isCustomerPage
    ? yup.object({
        email: required?.email
          ? yup
              .string()
              .required(t(VALIDATE_REQUIRED))
              .email(t(VALIDATE_EMAIL))
              .trim()
          : yup.string().email(t(VALIDATE_EMAIL)).trim(),
        password: required?.password
          ? yup.string().required(t(VALIDATE_REQUIRED))
          : yup.string(),
        confirmPassword: required?.confirmPassword
          ? yup
              .string()
              .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD))
              .required(t(VALIDATE_REQUIRED))
          : yup
              .string()
              .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD)),
        phone: required?.phone
          ? yup
              .string()
              .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
              .required(t(VALIDATE_REQUIRED))
          : yup.string().matches(PHONE_REGEXP, t(VALIDATE_PHONE)).notRequired(),
        accountType: required?.accountType
          ? yup.string().required(t(VALIDATE_REQUIRED))
          : yup.string(),
      })
    : yup.object({
        email: required?.email
          ? yup
              .string()
              .required(t(VALIDATE_REQUIRED))
              .email(t(VALIDATE_EMAIL))
              .trim()
          : yup.string().email(t(VALIDATE_EMAIL)).trim(),
        password: required?.password
          ? yup.string().required(t(VALIDATE_REQUIRED))
          : yup.string(),
        confirmPassword: required?.confirmPassword
          ? yup
              .string()
              .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD))
              .required(t(VALIDATE_REQUIRED))
          : yup
              .string()
              .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD)),
        phone: required?.phone
          ? yup
              .string()
              .matches(PHONE_REGEXP, t(VALIDATE_PHONE))
              .required(t(VALIDATE_REQUIRED))
          : yup.string().matches(PHONE_REGEXP, t(VALIDATE_PHONE)).notRequired(),
      });

  const [accountTypesLabel, setAccountTypesLabel] = React.useState<string>(
    getCustomerAccountType(t, '')
  );

  const handleKeyDown = (e: any) => {
    const spaceBarKeyCode = 32;
    if (e.keyCode === spaceBarKeyCode) {
      e.preventDefault();
      return false;
    }
  };

  const handleChooseType = async (
    type: any,
    index: number,
    values: any,
    errors: any
  ) => {
    setAccountTypesLabel(t(type.label));
    if (index !== 0 && t(type.label) !== getCustomerAccountType(t, '')) {
      values.accountType = index - 1;
      delete errors.accountType;
    } else {
      values.accountType = '';
      errors.accountType = t(VALIDATE_REQUIRED);
    }
  };

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleRegister(values);
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
            className={`form form-register ${className ? className : ''}`}
            style={style}
          >
            <h2 className="form-title">
              {formTitle ? formTitle : t(ACCOUNT_CREATE_TITLE)}
            </h2>
            {children}

            {!isCustomerPage && (
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="phone"
                  className="form-group-phone"
                >
                  <i className="ico ico-phone"></i>
                  {required.phone ? (
                    <Form.Label className="form-label-required">
                      {t(ACCOUNT_PHONE_REQUIRED)} <span>*</span>
                    </Form.Label>
                  ) : (
                    <Form.Label>{t(ACCOUNT_PHONE)}</Form.Label>
                  )}
                  <Form.Control
                    type="text"
                    placeholder={t(PLACEHOLDER_PHONE)}
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            )}

            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="email"
                className="form-group-email"
              >
                <i className="ico ico-user-email"></i>
                {required.email ? (
                  <Form.Label className="form-label-required">
                    {t(ACCOUNT_EMAIL)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{t(ACCOUNT_EMAIL)}</Form.Label>
                )}

                <Form.Control
                  type="text"
                  placeholder={t(PLACEHOLDER_EMAIL)}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  onKeyDown={handleKeyDown}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="password"
                className="form-group-password"
              >
                <i className="ico ico-password"></i>
                {required.password ? (
                  <Form.Label className="form-label-required">
                    {t(ACCOUNT_PASSWORD)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{t(ACCOUNT_PASSWORD)}</Form.Label>
                )}
                <Form.Control
                  type="password"
                  placeholder={t(PLACEHOLDER_PASSWORD)}
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="confirmPassword"
                className="form-group-confirm-password"
              >
                <i className="ico ico-password"></i>
                {required.confirmPassword ? (
                  <Form.Label className="form-label-required">
                    {t(ACCOUNT_CONFIRM_PASSWORD)} <span>*</span>
                  </Form.Label>
                ) : (
                  <Form.Label>{t(ACCOUNT_CONFIRM_PASSWORD)}</Form.Label>
                )}
                <Form.Control
                  type="password"
                  placeholder={t(PLACEHOLDER_CONFIRM_PASSWORD)}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  isInvalid={!!errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            {isCustomerPage && (
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="phone"
                  className="form-group-phone"
                >
                  <i className="ico ico-phone"></i>
                  {required.phone ? (
                    <Form.Label className="form-label-required">
                      {t(ACCOUNT_PHONE_REQUIRED)} <span>*</span>
                    </Form.Label>
                  ) : (
                    <Form.Label>{t(ACCOUNT_PHONE)}</Form.Label>
                  )}
                  <Form.Control
                    type="text"
                    placeholder={t(PLACEHOLDER_PHONE)}
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            )}

            {!isCustomerPage && (
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="referalCode"
                  className="form-group-email"
                >
                  <Form.Label>{t(ACCOUNT_REFERAL_CODE)}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder=""
                    name="referalCode"
                    value={values.referalCode}
                    onChange={handleChange}
                    isInvalid={!!errors.referalCode}
                    onKeyDown={handleKeyDown}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.referalCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
            )}
            {isCustomerPage && (
              <Form.Row>
                <Form.Group
                  as={Col}
                  md="12"
                  controlId="accountType"
                  className="form-group-type"
                >
                  <Form.Label>
                    {t(ACCOUNT_CUSTOMER_TYPE)}
                    <span> *</span>
                  </Form.Label>
                  <i className="ico ico-arrow-down"></i>
                  <Dropdown>
                    <Dropdown.Toggle className="col-select-actions">
                      {t(accountTypesLabel)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="col-select-contents">
                      {customerAccountTypes.map((type: any, index: number) => (
                        <Dropdown.Item
                          key={`drop-down-item-${index}`}
                          onClick={() => {
                            handleChooseType(type, index, values, errors);
                          }}
                        >
                          {t(type.label)}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {errors.accountType && (
                    <Form.Control.Feedback type="invalid">
                      {errors.accountType}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Form.Row>
            )}
            <ButtonGroup className="form-actions">
              <Button variant="primary" type="submit">
                <span>{t(BUTTONS_SIGNUP)}</span>
                <i className="ico ico-plus"></i>
              </Button>
              {handleLogin && (
                <Button onClick={handleLogin}>
                  <span>{t(BUTTONS_LOGIN)}</span>
                  <i className="ico ico-o-next"></i>
                </Button>
              )}
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(RegisterForm);
