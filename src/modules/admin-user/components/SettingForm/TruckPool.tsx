import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { ACCOUNT_ROLE } from '@/modules/admin-user/admin.enum';

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues?: any;
  handleSubmitForm?: any;
  handleSyncData?: any;
}

const TruckPool = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const { initialValues, handleSubmitForm, handleSyncData } = props;

  const authStore = React.useContext(AuthenticationStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    SETTINGS_TRUCK_POOL,
    SETTINGS_TRUCK_POOL_DESCRIPTION,
    SETTINGS_YES,
    SETTINGS_NO,
    SETTINGS_SYNC_DATA,
  } = I18N;

  return (
    <>
      {initialValues && (
        <>
          <Container fluid className="page-title-wrapper">
            <h1 className="page-title mb-4">{t(SETTINGS_TRUCK_POOL)}</h1>
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
                      {t(SETTINGS_TRUCK_POOL_DESCRIPTION)}
                    </h6>
                    <Row>
                      <Form.Group
                        as={Col}
                        xs={2}
                        controlId="truckPoolYes"
                        className="form-group-phoneNumber"
                      >
                        <Form.Check
                          className=""
                          type="radio"
                          onChange={(e) => {
                            setFieldValue('truckPool', true);
                            handleSubmit();
                          }}
                          label={t(SETTINGS_YES)}
                          checked={values?.truckPool}
                          name="truckPool"
                          id="truckPoolYes"
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        xs={2}
                        controlId="truckPoolNo"
                        className="form-group-phoneNumber"
                      >
                        <Form.Check
                          className=""
                          type="radio"
                          onChange={(e) => {
                            setFieldValue('truckPool', false);
                            handleSubmit();
                          }}
                          label={t(SETTINGS_NO)}
                          checked={!values?.truckPool}
                          name="truckPool"
                          id="truckPoolNo"
                        />
                      </Form.Group>
                    </Row>
                    {authStore.loggedUser?.userType ===
                      ACCOUNT_ROLE.SUPERADMIN && (
                      <Row>
                        <Col className="py-3">
                          <Button onClick={handleSyncData}>
                            {t(SETTINGS_SYNC_DATA)}
                          </Button>
                        </Col>
                      </Row>
                    )}
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

export default observer(TruckPool);
