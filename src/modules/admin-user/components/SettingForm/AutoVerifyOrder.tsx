import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues?: any;
  handleSubmitForm?: any;
}

const AutoVerifyOrder = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  /*
   * Props of Component
   */
  const { initialValues, handleSubmitForm } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    SETTINGS_CREATE_ORDER,
    SETTINGS_CREATE_ORDER_DESCRIPTION,
    SETTINGS_YES,
    SETTINGS_NO,
  } = I18N;

  return (
    <>
      {initialValues && (
        <>
          <Container fluid className="page-title-wrapper">
            <h1 className="page-title mb-4">{t(SETTINGS_CREATE_ORDER)}</h1>
          </Container>
          <Formik
            onSubmit={(values) => {
              handleSubmitForm(values);
            }}
            initialValues={initialValues}
          >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="form"
              >
                <Form.Row className="company-info">
                  <Container fluid>
                    <h6 className="mb-3">
                      {t(SETTINGS_CREATE_ORDER_DESCRIPTION)}
                    </h6>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={2}
                        controlId="autoVerifyOrderYes"
                        className="form-group-phoneNumber"
                      >
                        <Form.Check
                          className=""
                          type="radio"
                          onChange={(e) => {
                            setFieldValue('autoVerifyOrder', true);
                            handleSubmit();
                          }}
                          label={t(SETTINGS_YES)}
                          checked={values?.autoVerifyOrder}
                          name="autoVerifyOrder"
                          id="autoVerifyOrderYes"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={2}
                        controlId="autoVerifyOrderNo"
                        className="form-group-phoneNumber"
                      >
                        <Form.Check
                          className=""
                          type="radio"
                          onChange={(e) => {
                            setFieldValue('autoVerifyOrder', false);
                            handleSubmit();
                          }}
                          label={t(SETTINGS_NO)}
                          checked={!values?.autoVerifyOrder}
                          name="autoVerifyOrder"
                          id="autoVerifyOrderNo"
                        />
                      </Form.Group>
                    </Row>
                  </Container>
                </Form.Row>
              </Form>
            )}
          </Formik>
        </>
      )}
    </>
  );
};

export default observer(AutoVerifyOrder);
