import { I18N } from '@/modules/lang/i18n.enum';
import {
  concatenatedGoodsType,
  contractCarType,
  defaultContainerSize,
  defaultContainerType,
  nonMotorizedType,
  transportType,
  TRANSPORT_TYPE,
  truckPayload,
  truckType,
} from '@/modules/truck/truck.enum';
import { observer } from 'mobx-react';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

interface ComponentProps {
  values?: any;
  handleChange: any;
  handleSetTruckType?: any;
  handleSetTypeOfTransport?: any;
  handleSetPayLoad?: any;
  handleSetContainerType?: any;
  selectedTypeOfTransport?: TRANSPORT_TYPE | null;
  handleSetContainerSize?: any;
  handleSetNoMotorizedType?: any;
  handleSetConcatenatedGoodsType?: any;
  handleSetContractCarType?: any;
}

const DefaultTruckForm = (props: ComponentProps) => {
  const {
    values,
    handleChange,
    handleSetTypeOfTransport,
    handleSetTruckType,
    handleSetPayLoad,
    selectedTypeOfTransport,
    handleSetContainerSize,
    handleSetContainerType,
    handleSetNoMotorizedType,
    handleSetConcatenatedGoodsType,
    handleSetContractCarType,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    DEFAULT_PAYLOAD_TITLE,
    DEFAULT_TRANSPORT_TITLE,
    DEFAULT_PERSON_INCHARGE,
    DEFAULT_PERSON_INCHARGE_NO,
    ORDER_CONTAINERSIZE_LABEL,
    TRUCK_TYPE,
    ORDER_NON_MOTORIZED_TYPE,
    ORDER_CONCATENATED_GOODS_TYPE,
    ORDER_CONTRACT_CAR_TYPE,
  } = I18N;

  return (
    <>
      {values && (
        <Form.Row className="transport-info bordered ">
          <Container fluid>
            <Row>
              <Form.Group
                as={Col}
                xs={12}
                lg={7}
                controlId="typeOfTransport"
                className="form-group-company"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_TRANSPORT_TITLE)}
                </Form.Label>
                <Form.Control
                  as="select"
                  className="block-filter-options"
                  name="typeOfTransport"
                  defaultValue={values.typeOfTransport}
                  onChange={(event) => {
                    handleSetTypeOfTransport(event.target.value);
                  }}
                >
                  {transportType.map((value, index) => {
                    return (
                      <option key={`account-type-${index}`} value={value.key}>
                        {t(value.label)}
                      </option>
                    );
                  })}
                </Form.Control>
              </Form.Group>
              {selectedTypeOfTransport === TRANSPORT_TYPE.NON_MOTORIZED && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId="nonMotorizedType"
                  className="form-group-nonMotorizedType"
                >
                  <Form.Label className="form-label">
                    {t(ORDER_NON_MOTORIZED_TYPE)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="nonMotorizedType"
                    defaultValue={values.nonMotorizedType}
                    onChange={(event) => {
                      handleSetNoMotorizedType(event.target.value);
                    }}
                  >
                    {nonMotorizedType.map((value, index) => {
                      return (
                        <option key={`non-moto-${index}`} value={value.key}>
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}

              {selectedTypeOfTransport ===
                TRANSPORT_TYPE.CONCATENATED_GOODS && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId="concatenatedGoodsType"
                  className="form-group-concatenatedGoodsType"
                >
                  <Form.Label className="form-label">
                    {t(ORDER_CONCATENATED_GOODS_TYPE)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="concatenatedGoodsType"
                    defaultValue={values.concatenatedGoodsType}
                    onChange={(event) => {
                      handleSetConcatenatedGoodsType(event.target.value);
                    }}
                  >
                    {concatenatedGoodsType.map((value, index) => {
                      return (
                        <option
                          key={`concatenated-goods-${index}`}
                          value={value.key}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}

              {selectedTypeOfTransport === TRANSPORT_TYPE.CONTRACT_CAR && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId="contractCarType"
                  className="form-group-contractCarType"
                >
                  <Form.Label className="form-label">
                    {t(ORDER_CONTRACT_CAR_TYPE)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="contractCarType"
                    defaultValue={values.contractCarType}
                    onChange={(event) => {
                      handleSetContractCarType(event.target.value);
                    }}
                  >
                    {contractCarType.map((value, index) => {
                      return (
                        <option
                          key={`concatenated-goods-${index}`}
                          value={value.key}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}

              {selectedTypeOfTransport === TRANSPORT_TYPE.NORMAL && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId="truckPayload"
                  className="form-group-truckPayload"
                >
                  <Form.Label className="form-label">
                    {t(DEFAULT_PAYLOAD_TITLE)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="truckPayload"
                    defaultValue={values.truckPayload}
                    onChange={(event) => {
                      handleSetPayLoad(event.target.value);
                    }}
                  >
                    {truckPayload.map((value, index) => {
                      return (
                        <option
                          key={`truck-payload-${index}`}
                          value={value.key}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}
              {selectedTypeOfTransport === TRANSPORT_TYPE.TRAILOR && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={5}
                  controlId="containerSize"
                  className="form-group-truckPayload"
                >
                  <Form.Label className="form-label">
                    {t(ORDER_CONTAINERSIZE_LABEL)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="containerSize"
                    defaultValue={values.containerSize}
                    onChange={(event) => {
                      handleSetContainerSize(event.target.value);
                    }}
                  >
                    {defaultContainerSize.map((value, index) => {
                      return (
                        <option
                          key={`truck-payload-${index}`}
                          value={value.key}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}
            </Row>
            <Row>
              {selectedTypeOfTransport === TRANSPORT_TYPE.NORMAL && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={7}
                  controlId="truckType"
                  className="form-group-company"
                >
                  <Form.Label className="form-label">
                    {t(TRUCK_TYPE)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="truckType"
                    defaultValue={values.truckType}
                    onChange={(event) => {
                      handleSetTruckType(event.target.value);
                    }}
                  >
                    {truckType.map((value, index) => {
                      return (
                        <option key={`truck-type-${index}`} value={value.key}>
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}
              {selectedTypeOfTransport === TRANSPORT_TYPE.TRAILOR && (
                <Form.Group
                  as={Col}
                  xs={12}
                  lg={7}
                  controlId="containerType"
                  className="form-group-containerType"
                >
                  <Form.Label className="form-label">
                    {t(ORDER_CONTAINERSIZE_LABEL)}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="block-filter-options"
                    name="containerType"
                    defaultValue={values.containerType}
                    onChange={(event) => {
                      handleSetContainerType(event.target.value);
                    }}
                  >
                    {defaultContainerType.map((value, index) => {
                      return (
                        <option
                          key={`truck-payload-${index}`}
                          value={value.key}
                        >
                          {t(value.label)}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              )}
            </Row>
            <Row>
              <Form.Group
                as={Col}
                xs={12}
                lg={7}
                controlId="orderManagerName"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PERSON_INCHARGE)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.orderManagerName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                lg={5}
                controlId="orderManagerNo"
                className="form-group-locationName"
              >
                <Form.Label className="form-label">
                  {t(DEFAULT_PERSON_INCHARGE_NO)}
                </Form.Label>
                <Form.Control
                  type="text"
                  value={values.orderManagerNo}
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
export default observer(DefaultTruckForm);
