import { I18N } from '@/modules/lang/i18n.enum';
import {
  CargoType,
  PackageSize,
  ServiceType,
} from '@/modules/order/order.constants';
import { ORDER_TYPE, PACKAGE_SIZE } from '@/modules/order/order.enum';
import { contractCarType } from '@/modules/truck/truck.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  Col,
  Container,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import 'react-datetime/css/react-datetime.css';
import { useTranslation } from 'react-i18next';
import MultiSelect from 'react-multi-select-component';
import { contractCarPayload } from '@/modules/truck/truck.enum';
import { ACTIONS_MODE, SERVICE_TYPE } from '@/modules/order/order.enum';
import { OrderStatus } from '@/modules/order/order.constants';

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues: any;
  values: any;
  handleChange: any;
  errors: any;
  mode?: ACTIONS_MODE;
  serviceType: SERVICE_TYPE;
  handleServiceType: any;
  options: any;
  setSelected: any;
  selected: any;
}

const ContractCar = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    values,
    handleChange,
    errors,
    mode,
    serviceType,
    handleServiceType,
    options,
    setSelected,
    selected,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    ORDER_SERVICETYPE_LABELNOTE,
    ORDER_SERVICETYPE_REFNUMBER,
    ORDER_CARGOTYPE_LABEL,
    ORDER_CARGO_NAME,
    ORDER_CARGO_WEIGHT,
    ORDER_PACKAGE_SIZE,
    PLACEHOLDER_CARGO_NAME,
    PLACEHOLDER_CARGO_WEIGHT,
    PLACEHOLDER_PACKAGE_SIZE,
    ORDER_SERVICETYPE_REFNUMBERNOTE,
    ORDER_SERVICETYPE_REFNOTE_LABEL,
    ORDER_SERVICETYPE_REFNOTE,
    ORDER_DETAIL_REQUEST,
    ORDER_SPECIAL_REQUEST,
    ORDER_WEIGHT,
    DEFAULT_CHOOSE_TYPE_LABEL,
    ORDER_SELECT_ALL,
    ORDER_CONTRACT_CAR_TYPE,
    ORDER_CONTRACT_CAR_QUANTITY,
    ORDER_TRUCK_LOAD,
    ORDER_STATUS_LABEL,
  } = I18N;

  const [isOthersOptionSelected, setIsOthersOptionSelected] = React.useState<
    boolean
  >(false);

  const handleChangePackageSize = (value: any, isOthersOption: boolean) => {
    if (value === PACKAGE_SIZE.PACKAGE_SIZE_OTHERS || isOthersOption) {
      setIsOthersOptionSelected(true);
    } else {
      setIsOthersOptionSelected(false);
    }
    values.packageSize = value;
  };

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
      <Form.Row className="service-type-wrapper">
        <Col xs="12" lg="4" className="border-middle">
          <Form.Group controlId="serviceType" className="serviceType">
            <Form.Label className="form-label-required">
              {t(ORDER_SERVICETYPE_LABELNOTE)}{' '}
              <span style={{ color: 'red' }}>(*)</span>
            </Form.Label>
            <Form.Control
              as="select"
              name="serviceType"
              defaultValue={serviceType}
              onChange={handleServiceType}
            >
              {ServiceType.map((value, index) => (
                <option key={`service-type-${index}`} value={value.key}>
                  {t(value.label)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs="6" lg="4" className="border-middle">
          <Form.Group controlId="referenceNo" className="referenceNo">
            <Form.Label>
              <span>{t(ORDER_SERVICETYPE_REFNUMBER)}</span>
              <OverlayTrigger
                key={'right'}
                placement={'bottom'}
                overlay={
                  <Tooltip id="tooltip-right">
                    {t(ORDER_SERVICETYPE_REFNUMBERNOTE)}
                  </Tooltip>
                }
              >
                <div className="tooltip-icon">
                  <span className="ico ico-faq"></span>
                </div>
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={values.referenceNo}
              onChange={handleChange}
              isInvalid={!!errors.referenceNo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.referenceNo}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="6" lg="4">
          <Form.Group controlId="referenceNote" className="referenceNote">
            <Form.Label>
              <span>{t(ORDER_SERVICETYPE_REFNOTE_LABEL)}</span>
              <OverlayTrigger
                key={'right'}
                placement={'bottom'}
                overlay={
                  <Tooltip id="tooltip-right">
                    {t(ORDER_SERVICETYPE_REFNOTE)}
                  </Tooltip>
                }
              >
                <div className="tooltip-icon">
                  <span className="ico ico-faq"></span>
                </div>
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="text"
              defaultValue={values.referenceNote}
              onChange={handleChange}
              isInvalid={!!errors.referenceNote}
            />
            <Form.Control.Feedback type="invalid">
              {errors.referenceNote}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Row className="shipment-info">
        <Container fluid>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="contractCarType"
              className="contractCarType"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CONTRACT_CAR_TYPE)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="contractCarType"
                defaultValue={values.contractCarType}
                onChange={handleChange}
                isInvalid={!!errors.contractCarType}
              >
                {contractCarType.map((value, index) => {
                  return (
                    <option
                      key={`contract-car-type-${index}`}
                      value={value.key}
                    >
                      {t(value.label)}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.containerSize}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="contractCarQuantity"
              className="contractCarQuantity"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CONTRACT_CAR_QUANTITY)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="contractCarQuantity"
                defaultValue={values.contractCarQuantity}
                onChange={handleChange}
                isInvalid={!!errors.contractCarQuantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.contractCarQuantity}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              xs={12}
              lg={5}
              controlId="contractCarPayload"
              className="form-group-truckPayload"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_TRUCK_LOAD)} <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="contractCarPayload"
                defaultValue={values.contractCarPayload ?? ''}
                onChange={handleChange}
                isInvalid={!!errors.contractCarPayload}
              >
                {contractCarPayload.map((value, index) => {
                  return (
                    <option key={`truck-payload-${index}`} value={value.key}>
                      {t(value.label)}
                    </option>
                  );
                })}
              </Form.Control>

              <Form.Control.Feedback type="invalid">
                {errors.contractCarPayload}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Container>
      </Form.Row>
      <Form.Row className="cargo-info">
        <Container fluid>
          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="cargoType"
              className="cargoType"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CARGOTYPE_LABEL)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="cargoType"
                defaultValue={values.cargoType}
                onChange={handleChange}
                isInvalid={!!errors.cargoType}
              >
                {CargoType.map((value, index) => {
                  return (
                    <option key={`cargo-type-${index}`} value={value.key}>
                      {t(value.label)}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cargoType}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              lg={5}
              controlId="cargoName"
              className="cargoName"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CARGO_NAME)} <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={values.cargoName}
                onChange={handleChange}
                isInvalid={!!errors.cargoName}
                placeholder={t(PLACEHOLDER_CARGO_NAME)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cargoName}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="field-inline">
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="cargoWeight"
              className="cargoWeight"
            >
              <Form.Label>
                {t(ORDER_CARGO_WEIGHT)} {t(ORDER_WEIGHT)}
              </Form.Label>
              <Form.Control
                type="text"
                name="cargoWeight"
                defaultValue={values.cargoWeight}
                onChange={handleChange}
                isInvalid={!!errors.cargoWeight}
                placeholder={t(PLACEHOLDER_CARGO_WEIGHT)}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cargoWeight}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              lg={5}
              controlId="packageSize"
              className="packageSize"
            >
              <Form.Label>{t(ORDER_PACKAGE_SIZE)}</Form.Label>
              <Form.Control
                as="select"
                name="packageSize"
                onChange={(e: any) => {
                  handleChange(e);
                  handleChangePackageSize(e.target.value, false);
                }}
                defaultValue={values.packageSize}
              >
                <option style={{ display: 'none' }} value={-1} key={-1}>
                  {t(PLACEHOLDER_PACKAGE_SIZE)}
                </option>
                {PackageSize.map((value, index) => {
                  return (
                    <option key={`container-type-${index}`} value={value.key}>
                      {t(value.label)}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Row>
          {isOthersOptionSelected && (
            <Row>
              <Form.Group
                as={Col}
                xs={12}
                lg={7}
                controlId=""
                className=""
              ></Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                lg={5}
                controlId="packageSizeText"
                className="packageSizeText"
              >
                <Form.Label>{t(ORDER_PACKAGE_SIZE)}</Form.Label>
                {isOthersOptionSelected && (
                  <>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      isInvalid={!!errors.packageSizeText}
                      placeholder={t(PLACEHOLDER_PACKAGE_SIZE)}
                      className={
                        isOthersOptionSelected
                          ? 'package-size-text'
                          : 'no-display'
                      }
                      defaultValue={values.packageSizeText}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.packageSizeText}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
            </Row>
          )}

          <Row>
            <Form.Group
              as={Col}
              xs={12}
              lg={7}
              controlId="specialRequest"
              className="specialRequest"
            >
              <Form.Label>{t(ORDER_SPECIAL_REQUEST)}</Form.Label>
              {options.length > 0 && (
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={(value: any) => {
                    setSelected(value);
                  }}
                  overrideStrings={{
                    selectSomeItems: t(DEFAULT_CHOOSE_TYPE_LABEL),
                    allItemsAreSelected: t(ORDER_SELECT_ALL),
                  }}
                  disableSearch={true}
                  labelledBy={''}
                  selectAllLabel={t(ORDER_SELECT_ALL)}
                />
              )}
            </Form.Group>
          </Row>

          {values.orderType === ORDER_TYPE.QUICK && (
            <Row>
              <Form.Group
                as={Col}
                xs={12}
                controlId="detailRequest"
                className="detailRequest"
              >
                <Form.Label>{t(ORDER_DETAIL_REQUEST)}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  defaultValue={values.detailRequest}
                  onChange={handleChange}
                  isInvalid={!!errors.detailRequest}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.detailRequest}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
          )}
        </Container>
      </Form.Row>
    </>
  );
};

export default observer(ContractCar);
