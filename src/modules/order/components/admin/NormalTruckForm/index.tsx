import { I18N } from '@/modules/lang/i18n.enum';
import NormalTruck from '@/modules/order/components/NormalTruck';
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
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  initialValues: any;
  mode?: ACTIONS_MODE;
  serviceType: SERVICE_TYPE;
  handleServiceType: any;
  handleSubmitForm: any;
  handleDelete: any;
  values?: any;
  errors?: any;
  handleChange?: any;
  setFieldValue?: any;
  truckTypeDefault?: any;
  handleChangeTruckType?: any;
  truckPayloadDefault?: any;
  handleChangeTruckPayload?: any;
  options: any;
  setSelected: any;
  selected: any;
}

const NormalTruckFormAdmin = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    initialValues,
    mode = 'created',
    serviceType,
    handleServiceType,
    values,
    errors,
    handleChange,
    setFieldValue,
    truckTypeDefault,
    truckPayloadDefault,
    handleChangeTruckType,
    handleChangeTruckPayload,
    options,
    setSelected,
    selected,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { ORDER_STATUS_LABEL } = I18N;

  return (
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
      <NormalTruck
        initialValues={initialValues}
        values={values}
        handleChange={handleChange}
        errors={errors}
        setFieldValue={setFieldValue}
        serviceType={serviceType}
        handleServiceType={handleServiceType}
        truckTypeDefault={truckTypeDefault}
        handleChangeTruckType={handleChangeTruckType}
        truckPayloadDefault={truckPayloadDefault}
        handleChangeTruckPayload={handleChangeTruckPayload}
        options={options}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
};

export default observer(NormalTruckFormAdmin);
