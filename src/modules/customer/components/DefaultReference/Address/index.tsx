import GoogleMapAutocomplete from '@/libs/components/GoogleMapAutocomplete';
import { I18N } from '@/modules/lang/i18n.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  handleChange: any;
  handleChangePlace?: any;
  setFieldValue?: any;
  values?: any;
  handleChooseRecent?: any;
  handleChooseAddressBook?: any;
  handleClearData?: any;
}

const DefaultAddressForm = (props: ComponentProps) => {
  const {
    handleChange,
    handleChangePlace,
    setFieldValue,
    values,
    handleChooseRecent,
    handleChooseAddressBook,
    handleClearData,
  } = props;
  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DEFAULT_PERSON_INCHARGE_NO,
    DEFAULT_PERSON_INCHARGE,
    DEFAULT_PICKUP_LOCATION,
    DEFAULT_DROPOFF_LOCATION,
    DEFAULT_DROPOFF_INFO,
    DEFAULT_PICKUP_INFO,
  } = I18N;

  return (
    <>
      {values && (
        <Form.Row className="transport-info bordered ">
          <Container fluid>
            <Row>
              <Col xs={6} lg={6} className="default-section pickup">
                {t(DEFAULT_PICKUP_INFO)}
              </Col>
              <Col xs={6} lg={6} className="default-section dropoff">
                {t(DEFAULT_DROPOFF_INFO)}
              </Col>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                xs={6}
                lg={6}
                controlId="pickupAddressText"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PICKUP_LOCATION)}
                </Form.Label>
                <GoogleMapAutocomplete
                  handleChangePlace={handleChangePlace}
                  field="pickupAddressText"
                  setFieldValue={setFieldValue}
                  componentId="pickupAddressText"
                  value={values?.pickupAddressText}
                  onChange={handleChange}
                  handleChooseRecent={handleChooseRecent}
                  handleChooseAddressBook={handleChooseAddressBook}
                  handleClearData={handleClearData}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                xs={6}
                lg={6}
                controlId="personInChargeDropoff"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_DROPOFF_LOCATION)}
                </Form.Label>
                <GoogleMapAutocomplete
                  handleChangePlace={handleChangePlace}
                  field="dropoffAddressText"
                  setFieldValue={setFieldValue}
                  componentId="dropoffAddressText"
                  value={values?.dropoffAddressText}
                  onChange={handleChange}
                  handleChooseRecent={handleChooseRecent}
                  handleChooseAddressBook={handleChooseAddressBook}
                  handleClearData={handleClearData}
                />
              </Form.Group>
            </Row>
            <Row></Row>
            <Row>
              <Form.Group
                as={Col}
                xs={6}
                lg={6}
                controlId="personInChargePickup"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PERSON_INCHARGE)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.personInChargePickup}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                xs={6}
                lg={6}
                controlId="personInChargeDropoff"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PERSON_INCHARGE)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.personInChargeDropoff}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                as={Col}
                xs={6}
                lg={6}
                controlId="personInChargePickupNO"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PERSON_INCHARGE_NO)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.personInChargePickupNO}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                xs={6}
                lg={6}
                controlId="personInChargeDropoffNO"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PERSON_INCHARGE_NO)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.personInChargeDropoffNO}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
          </Container>
        </Form.Row>
      )}
    </>
  );
};
export default observer(DefaultAddressForm);
