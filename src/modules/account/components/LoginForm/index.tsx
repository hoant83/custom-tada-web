import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Col, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleLogin: any;
  handleForgotPassword: any;
  handleSignUp?: any;
  formTitle?: string;
  initialValues?: any;
  userEmail?: string;
  isCustomerPage?: boolean;
  isTruckOwnerPage?: boolean;
}

const LoginForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    handleLogin,
    handleForgotPassword,
    handleSignUp = false,
    formTitle = '',
    userEmail,
    initialValues = {
      email: '',
      password: '',
    },
    isCustomerPage,
    isTruckOwnerPage = false,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_EMAIL,
    VALIDATE_REQUIRED,
    VALIDATE_PHONE,
    ACCOUNT_LOGIN_WELCOME,
    ACCOUNT_EMAIL,
    ACCOUNT_EMAIL_OR_PHONE,
    PLACEHOLDER_EMAIL,
    ACCOUNT_PASSWORD,
    PLACEHOLDER_PASSWORD,
    ACCOUNT_LINK_FORGOTPASSWORD,
    BUTTONS_LOGIN,
    BUTTONS_SIGNUP,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    email: !isTruckOwnerPage
      ? yup.string().required(t(VALIDATE_REQUIRED)).email(t(VALIDATE_EMAIL))
      : yup.string().required(t(VALIDATE_REQUIRED)),
    password: yup.string().required(t(VALIDATE_REQUIRED)),
  });

  initialValues.email = userEmail ?? '';

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          handleLogin(values);
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
            className={`form form-login ${className ? className : ''}`}
            style={style}
          >
            <h2 className="form-title">
              {formTitle ? formTitle : t(ACCOUNT_LOGIN_WELCOME)}
            </h2>
            {children}

            <Form.Row>
              <Form.Group
                as={Col}
                md="12"
                controlId="email"
                className="form-group-email"
              >
                <i className="ico ico-user-email"></i>
                <Form.Label className="form-label-required">
                  {t(
                    !isTruckOwnerPage ? ACCOUNT_EMAIL : ACCOUNT_EMAIL_OR_PHONE
                  )}{' '}
                  <span>*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t(PLACEHOLDER_EMAIL)}
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
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
                <Form.Label className="form-label-required">
                  {t(ACCOUNT_PASSWORD)} <span>*</span>
                </Form.Label>
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
              <Form.Group as={Col} md="12" controlId="formBasicCheckbox">
                <Button
                  variant="link"
                  className="action-link"
                  onClick={handleForgotPassword}
                >
                  {t(ACCOUNT_LINK_FORGOTPASSWORD)}
                </Button>
              </Form.Group>
            </Form.Row>
            <ButtonGroup className="form-actions">
              <Button variant="primary" type="submit">
                <span>{t(BUTTONS_LOGIN)}</span>
                <i className="ico ico-o-next"></i>
              </Button>
              {handleSignUp && (
                <Button onClick={handleSignUp} variant="outline-primary">
                  <span>{t(BUTTONS_SIGNUP)}</span>
                  <i className="ico ico-plus"></i>
                </Button>
              )}
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default observer(LoginForm);
