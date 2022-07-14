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

interface ComponentProps {
  handleSubmitForm: any;
}

const MyPassword = (props: ComponentProps) => {
  const initialValues = {
    current: '',
    password: '',
    confirmPassword: '',
  };

  const { handleSubmitForm } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ACCOUNT_PASSWORD,
    ACCOUNT_CONFIRM_PASSWORD,
    VALIDATE_CONFIRM_PASSWORD,
    BUTTONS_UPDATE,
    ACCOUNT_CHANGE_PASSWORD,
    ACCOUNT_CURRENT_PASSWORD,
    VALIDATE_REQUIRED,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    current: yup.string().required(t(VALIDATE_REQUIRED)),
    password: yup.string().required(t(VALIDATE_REQUIRED)),
    confirmPassword: yup
      .string()
      .required(t(VALIDATE_REQUIRED))
      .oneOf([yup.ref('password')], t(VALIDATE_CONFIRM_PASSWORD)),
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { setErrors, resetForm }) => {
          handleSubmitForm(values, setErrors, resetForm);
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
            className="form form-custom"
          >
            <Form.Row className="company-info">
              <Container fluid>
                <Row>
                  <Col xs={12}>
                    <h3 className="block-title">
                      {t(ACCOUNT_CHANGE_PASSWORD)}
                    </h3>
                  </Col>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={4}
                    controlId="current"
                    className="form-group-password"
                  >
                    <Form.Label className="form-label">
                      {t(ACCOUNT_CURRENT_PASSWORD)}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="current"
                      autoComplete="new-password"
                      value={values.current ?? ''}
                      onChange={handleChange}
                      isInvalid={!!errors.current}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.current}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={4}
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
                    lg={4}
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

export default observer(MyPassword);
