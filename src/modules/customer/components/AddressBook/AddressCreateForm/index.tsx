import GoogleMapAutocompleteInput from '@/libs/components/GoogleMapAutoCompleteInput';
import { I18N } from '@/modules/lang/i18n.enum';
import { ACTIONS_MODE } from '@/modules/order/order.enum';
import bsCustomFileInput from 'bs-custom-file-input';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

interface ComponentProps {
  handleCreate: any;
  initialValues?: any;
  handleChangeType: any;
  locationType: string;
  handleChangePlace: any;
  actionMode: ACTIONS_MODE;
  handleCancel?: any;
  mode: string;
}

const AddressCreateForm = (props: ComponentProps) => {
  const {
    handleCreate,
    initialValues,
    handleChangeType,
    locationType,
    handleChangePlace,
    actionMode,
    handleCancel,
    mode,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    BUTTONS_CANCEL,
    BUTTONS_UPDATE,
    ADDRESS_COMPANY,
    ADDRESS_LOCATION_ADDRESS,
    ADDRESS_LOCATION_NAME,
    ADDRESS_PERSON_INCHARGE_NAME,
    ADDRESS_PERSON_INCHARGE_NO,
    ORDER_PICKUP_ADDRESS,
    ORDER_DROPOFF_ADDRESS,
    ADDRESS_CHOOSE_LOCATION_TYPE,
    ADDRESS_NEW,
    ADDRESS_EDIT,
  } = I18N;

  /*
   * Validation
   */
  const schema = yup.object({
    company: yup.string().required(),
    locationName: yup.string().required(),
    locationAddress: yup.string().required(),
    inChargeName: yup.string().notRequired(),
    inChargeNo: yup.string().notRequired(),
    locationType: yup.string().notRequired(),
    pickupCity: yup.string().notRequired().nullable(),
  });

  React.useEffect(() => {
    bsCustomFileInput.init();
  }, [initialValues]);

  return (
    <>
      {initialValues && initialValues.locationType && (
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            handleCreate(values);
          }}
          initialValues={initialValues}
          enableReinitialize
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={'form form-custom address-book'}
            >
              <Form.Row className="address-book-info bordered ">
                <Container fluid>
                  <div
                    style={{
                      textAlign: 'center',
                      fontSize: '18px',
                      fontWeight: 400,
                    }}
                  >
                    {mode === 'edit' ? t(ADDRESS_EDIT) : t(ADDRESS_NEW)}{' '}
                  </div>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={5}
                      controlId="company"
                      className="form-group-company"
                    >
                      <Form.Label className="form-label">
                        {t(ADDRESS_COMPANY)} <span>(*)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.company}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.company}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.company}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={12}
                      controlId="locationType"
                      className="form-group-locationType"
                    >
                      <Form.Label className="form-label">
                        {t(ADDRESS_CHOOSE_LOCATION_TYPE)}
                      </Form.Label>
                      <Form.Check
                        inline
                        type="radio"
                        onChange={() => {
                          handleChangeType('pickup');
                          setFieldValue('locationAddress', '', false);
                          setFieldValue('pickupCity', '', false);
                        }}
                        label={t(ORDER_PICKUP_ADDRESS)}
                        checked={locationType === 'pickup' ? true : false}
                        name="locationType"
                        id="locationType1"
                      />
                      <Form.Check
                        inline
                        type="radio"
                        onChange={() => {
                          handleChangeType('dropoff');
                          setFieldValue('locationAddress', '', false);
                          setFieldValue('pickupCity', '', false);
                        }}
                        label={t(ORDER_DROPOFF_ADDRESS)}
                        checked={locationType === 'dropoff' ? true : false}
                        name="locationType"
                        id="locationType2"
                      />
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={5}
                      controlId="locationName"
                      className="form-group-locationName"
                    >
                      <Form.Label className="form-label">
                        {t(ADDRESS_LOCATION_NAME)} <span>(*)</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.locationName}
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.locationName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.locationName}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={7}
                      controlId="locationAddress"
                      className="form-group-locationAddress"
                    >
                      <Form.Label className="form-label">
                        {t(ADDRESS_LOCATION_ADDRESS)} <span>(*)</span>
                      </Form.Label>
                      <GoogleMapAutocompleteInput
                        handleChangePlace={handleChangePlace}
                        field="locationAddress"
                        setFieldValue={setFieldValue}
                        componentId="locationAddress"
                        value={values.locationAddress}
                        onChange={handleChange}
                        isInvalid={!!errors.locationAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.locationAddress}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={5}
                      controlId="inChargeName"
                      className="form-group-inChargeName"
                    >
                      <Form.Label className="form-label">
                        {t(ADDRESS_PERSON_INCHARGE_NAME)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.inChargeName}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      xs={12}
                      lg={7}
                      controlId="inChargeNo"
                      className="form-group-inChargeNo"
                    >
                      <Form.Label className="form-label">
                        {t(ADDRESS_PERSON_INCHARGE_NO)}
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={values.inChargeNo}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row>
                    <ButtonGroup className="form-actions">
                      {actionMode === ACTIONS_MODE.CREATE ? (
                        <Button variant="primary" type="submit">
                          <span>{t(ADDRESS_NEW)}</span>
                          <i className="ico ico-plus"></i>
                        </Button>
                      ) : (
                        <>
                          <Button variant="primary" type="submit">
                            <span>{t(BUTTONS_UPDATE)}</span>
                            <i className="ico ico-update"></i>
                          </Button>
                          <Button onClick={handleCancel}>
                            <span>{t(BUTTONS_CANCEL)}</span>
                            <i className="ico ico-minus"></i>
                          </Button>
                        </>
                      )}
                    </ButtonGroup>
                  </Row>
                </Container>
              </Form.Row>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default observer(AddressCreateForm);
