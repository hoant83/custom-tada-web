import { I18N } from '@/modules/lang/i18n.enum';
import TrailorTractor from '@/modules/order/components/TrailorTractor';
import { OrderStatus } from '@/modules/order/order.constants';
import { ACTIONS_MODE, SERVICE_TYPE } from '@/modules/order/order.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues: any;
  values: any;
  mode?: string;
  serviceType: SERVICE_TYPE;
  handleServiceType: any;
  handleChange: any;
  errors: any;
  options: any;
  setSelected: any;
  selected: any;
}

const TrailorTractorFormAdmin = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    initialValues,
    mode = 'created',
    serviceType,
    handleServiceType,
    values,
    handleChange,
    errors,
    options,
    setSelected,
    selected,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_STATUS_LABEL,
    ORDER_STAFF_ANOTHERNOTE,
    ORDER_STAFF_NOTE,
  } = I18N;

  return (
    <>
      {initialValues && (
        <>
          {mode === ACTIONS_MODE.EDIT && (
            <Form.Row className="admin-info">
              <Container fluid>
                <Row>
                  <Form.Group
                    as={Col}
                    xs={12}
                    lg={7}
                    controlId="status"
                    className="status"
                  >
                    <Form.Label className="form-label-required">
                      {t(ORDER_STATUS_LABEL)} <span>*</span>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="status"
                      defaultValue={values.status}
                      onChange={handleChange}
                      isInvalid={!!errors.status}
                    >
                      {OrderStatus.map((value, index) => {
                        return (
                          <option key={`status-${index}`} value={value.key}>
                            {t(value.label)}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.status}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </Container>
            </Form.Row>
          )}
          <TrailorTractor
            initialValues={initialValues}
            values={values}
            handleChange={handleChange}
            errors={errors}
            handleServiceType={handleServiceType}
            serviceType={serviceType}
            options={options}
            selected={selected}
            setSelected={setSelected}
          />
          <Form.Row as={Row} className="other-note">
            <Container fluid>
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="staffNote"
                  className="staffNote"
                >
                  <Form.Label>{t(ORDER_STAFF_NOTE)}</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={values.staffNote}
                    onChange={handleChange}
                    isInvalid={!!errors.staffNote}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.staffNote}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row>
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="staffAnotherNote"
                  className="staffAnotherNote"
                >
                  <Form.Label>{t(ORDER_STAFF_ANOTHERNOTE)}</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={values.staffAnotherNote}
                    onChange={handleChange}
                    isInvalid={!!errors.staffAnotherNote}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.staffAnotherNote}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
            </Container>
          </Form.Row>
        </>
      )}
    </>
  );
};

export default observer(TrailorTractorFormAdmin);
