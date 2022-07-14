import { I18N } from '@/modules/lang/i18n.enum';
import {
  CargoType,
  ContainerSize,
  ContainerType,
  PackageSize,
  ServiceType,
} from '@/modules/order/order.constants';
import { ORDER_TYPE, PACKAGE_SIZE } from '@/modules/order/order.enum';
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

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues: any;
  values: any;
  handleChange: any;
  errors: any;
  serviceType: any;
  handleServiceType: any;
  options: any;
  setSelected: any;
  selected: any;
}

const TrailorTractor = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    values,
    handleChange,
    errors,
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
    ORDER_CONTAINERQUANTITY,
    ORDER_CONTAINERSIZE_LABEL,
    ORDER_CONTAINERTYPE_LABEL,
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
              value={values.referenceNo}
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
              value={values.referenceNote}
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
              controlId="containerSize"
              className="containerSize"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CONTAINERSIZE_LABEL)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="containerSize"
                value={values.containerSize}
                defaultValue={values.containerSize}
                onChange={handleChange}
                isInvalid={!!errors.containerSize}
              >
                {ContainerSize.map((value, index) => {
                  return (
                    <option key={`container-size-${index}`} value={value.key}>
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
              controlId="containerQuantity"
              className="containerQuantity"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CONTAINERQUANTITY)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={values.containerQuantity}
                onChange={handleChange}
                isInvalid={!!errors.containerQuantity}
              />
              <Form.Control.Feedback type="invalid">
                {errors.containerQuantity}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              xs={12}
              lg={5}
              controlId="containerType"
              className="containerType"
            >
              <Form.Label className="form-label-required">
                {t(ORDER_CONTAINERTYPE_LABEL)}{' '}
                <span style={{ color: 'red' }}>(*)</span>
              </Form.Label>
              <Form.Control
                as="select"
                name="containerType"
                value={values.containerType}
                defaultValue={values.containerType}
                onChange={handleChange}
                isInvalid={!!errors.containerType}
              >
                {ContainerType.map((value, index) => {
                  return (
                    <option key={`container-type-${index}`} value={value.key}>
                      {t(value.label)}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.containerType}
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
                value={values.cargoName}
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
                value={values.cargoWeight}
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
                      value={values.packageSizeText}
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
                  value={values.detailRequest}
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

export default observer(TrailorTractor);
