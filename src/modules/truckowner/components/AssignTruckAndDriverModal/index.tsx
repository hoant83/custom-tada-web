/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Form, Button, ButtonGroup, Col } from 'react-bootstrap';
import MultiSelect from 'react-multi-select-component';
import { useTranslation } from 'react-i18next';
import { I18N } from '@/modules/lang/i18n.enum';
import { Formik } from 'formik';
import * as yup from 'yup';
import bsCustomFileInput from 'bs-custom-file-input';

import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import { TruckOwnerStoreContext } from '@/modules/truckowner/truckowner.store';
import orderService from '@/modules/order/order.service';
import { UpdateOrderCommissionDto } from '../../truckowner.dto';
import { OrderStoreContext } from '@/modules/order/order.store';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  formTitle?: string;
  show: boolean;
  handleClose: any;
  handleAssign: any;
  showDriverPopup: any;
  showTruckPopup: any;
  handleCloseDriverPopup: any;
  order?: any;
  selectedDriverValues?: any[];
  selectedTruckValues?: any[];
  handleChangeDriver: any;
  handleChangeTruck: any;
  defaultCommission: any;
}

const AssignTruckAndDriverModal = (props: ComponentProps) => {
  const authStore = React.useContext(AuthenticationStoreContext);
  const truckOwnerStore = React.useContext(TruckOwnerStoreContext);
  const orderStore = React.useContext(OrderStoreContext);

  const { generalSettingCommission } = orderStore;

  /*
   * Props of Component
   */
  const {
    style,
    className,
    children,
    formTitle = '',
    show,
    handleClose,
    handleAssign,
    showDriverPopup,
    showTruckPopup,
    order,
    selectedDriverValues = [],
    selectedTruckValues = [],
    handleChangeDriver,
    handleChangeTruck,
    defaultCommission,
  } = props;

  /*
   * Translation
   */
  const { t } = useTranslation();
  const {
    VALIDATE_REQUIRED,
    BUTTONS_ASSIGN_JOB,
    TRUCK_ASSIGN_LABEL,
    DRIVER_ASSIGN_LABEL,
    TRUCKOWNER_ASSIGN_TITLE,
    ORDER_ID,
    ORDER_FOR_ORDER_ID,
    DRIVER_ADD_NEW,
    TRUCK_ADD_NEW,
    PRICING_PERCENT_COMMISSION,
    PRICING_FIXED_COMMISSION,
    VALIDATE_NUMBER,
    PRICING_ALLOW_SEE_COMMISSION,
    PRICING_ALLOW_SEE_PRICE,
    PRICING_SET_COMMISSION,
    ORDER_WEIGHT,
    ORDER_ADD_NEW_DRIVER,
    ORDER_ADD_NEW_TRUCK,
    ORDER_IF_NOT_FOUND_IN_THE_LIST,
  } = I18N;

  React.useEffect(() => {
    bsCustomFileInput.init();
  });

  /*
   * Validation
   */
  const schema = yup.object({
    order: yup.string().notRequired(),
    percentCommission: yup.number().typeError(t(VALIDATE_NUMBER)),
    fixedCommission: yup.number().typeError(t(VALIDATE_NUMBER)),
  });

  const [driverOptions, setDriverOptions] = React.useState<any[]>([]);
  const [selectedDrivers, setSelectedDrivers] = React.useState(
    selectedDriverValues ?? []
  );

  const [truckOptions, setTruckOptions] = React.useState<any[]>([]);
  const [selectedTrucks, setSelectedTrucks] = React.useState(
    selectedTruckValues ?? []
  );

  const [messageDriver, setMessageDriver] = React.useState<string>('');
  const [messageTruck, setMessageTruck] = React.useState<string>('');

  const handleAssignMapData = (values: any) => {
    const data: UpdateOrderCommissionDto = {
      isEnableSetCommissionForDriver: values.isSetCommission,
      isEnableAllowDriverSeeCommission: values.allowSeeCommission,
      isEnableAllowDriverSeeOrdersPrice: values.allowSeePrice,
      percentCommission: Number(values.percentCommission),
      fixedCommission: Number(values.fixedCommission),
    };
    handleAssign(data);
  };

  React.useEffect(() => {
    if (truckOwnerStore.myDrivers) {
      truckOwnerStore.myDrivers.forEach((item: any, index: number) => {
        truckOwnerStore.myDrivers[
          index
        ].label = `${item.firstName} (${item.phoneNumber})`;
        truckOwnerStore.myDrivers[index].value = item.id;
      });

      setDriverOptions(truckOwnerStore.myDrivers);
    }
  }, [truckOwnerStore.myDrivers, authStore.loggedUser]);

  React.useEffect(() => {
    if (truckOwnerStore.myTrucks) {
      truckOwnerStore.myTrucks.forEach((item: any, index: number) => {
        truckOwnerStore.myTrucks[
          index
        ].label = `${item.truckNo} (${item.truckLoad})`;
        truckOwnerStore.myTrucks[index].value = item.id;
      });

      setTruckOptions(truckOwnerStore.myTrucks);
    }
  }, [truckOwnerStore.myTrucks, authStore.loggedUser]);

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={`modal-custom modal-driver ${className ? className : ''}`}
      style={style}
    >
      <Modal.Header>
        {formTitle ? formTitle : t(TRUCKOWNER_ASSIGN_TITLE)}
      </Modal.Header>
      <Modal.Body>
        <Formik
          onSubmit={(values) => {
            if (selectedDrivers.length < 1) {
              setMessageDriver(t(VALIDATE_REQUIRED));
            }
            if (selectedTrucks.length < 1) {
              setMessageTruck(t(VALIDATE_REQUIRED));
            }
            if (
              generalSettingCommission?.isEnableSetupDefaultDriversCommission
            ) {
              values.fixedCommission =
                generalSettingCommission.defaultFixedCommission;
              values.percentCommission =
                generalSettingCommission.defaultPercentCommission;
            }
            handleAssignMapData(values);
          }}
          initialValues={{
            isSetCommission: false,
            percentCommission: defaultCommission.percentCommission,
            fixedCommission: defaultCommission.fixedCommission,
            allowSeeCommission: false,
            allowSeePrice: false,
          }}
          validationSchema={schema}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
            <Form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={`form form-driver ${className ? className : ''}`}
              style={style}
            >
              {children}
              <Form.Group as={Col} xs={12} controlId="orderId">
                <Form.Label>{t(ORDER_FOR_ORDER_ID)}</Form.Label>
                <Form.Control type="text" value={order?.orderId} disabled />
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                controlId="drivers"
                className="item-center"
              >
                <MultiSelect
                  options={driverOptions}
                  value={selectedDrivers}
                  onChange={(value: any) => {
                    setSelectedDrivers(value);
                    handleChangeDriver(value);
                    if (value.length < 1) {
                      setMessageDriver(t(VALIDATE_REQUIRED));
                    } else {
                      setMessageDriver('');
                    }
                  }}
                  labelledBy={''}
                  disableSearch={true}
                  overrideStrings={{
                    selectSomeItems: t(DRIVER_ASSIGN_LABEL),
                    allItemsAreSelected: `${selectedDrivers.map(
                      ({ label }) => ' ' + label
                    )}`,
                  }}
                  className="multi-select mb-3"
                />
                {messageDriver && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="pb-3 text-left"
                  >
                    {messageDriver}
                  </Form.Control.Feedback>
                )}
                <div>
                  <a
                    href="#"
                    className="order-item-blue-bold"
                    onClick={showDriverPopup}
                  >
                    {t(ORDER_ADD_NEW_DRIVER)}
                  </a>{' '}
                  {t(ORDER_IF_NOT_FOUND_IN_THE_LIST)}
                </div>
              </Form.Group>
              <Form.Group
                as={Col}
                xs={12}
                controlId="trucks"
                className="item-center"
              >
                <MultiSelect
                  options={truckOptions}
                  value={selectedTrucks}
                  onChange={(value: any) => {
                    setSelectedTrucks(value);
                    handleChangeTruck(value);
                    if (value.length < 1) {
                      setMessageTruck(t(VALIDATE_REQUIRED));
                    } else {
                      setMessageTruck('');
                    }
                  }}
                  labelledBy={''}
                  disableSearch={true}
                  overrideStrings={{
                    selectSomeItems: t(TRUCK_ASSIGN_LABEL),
                    allItemsAreSelected: `${selectedTrucks.map(
                      ({ label }) => ' ' + label
                    )}`,
                  }}
                  className="multi-select mb-3"
                />
                {messageTruck && (
                  <Form.Control.Feedback
                    type="invalid"
                    className="pb-3 text-left"
                  >
                    {messageTruck}
                  </Form.Control.Feedback>
                )}
                <div>
                  <a
                    href="#"
                    className="order-item-blue-bold"
                    onClick={showTruckPopup}
                  >
                    {t(ORDER_ADD_NEW_TRUCK)}
                  </a>{' '}
                  {t(ORDER_IF_NOT_FOUND_IN_THE_LIST)}
                </div>
              </Form.Group>
              {generalSettingCommission?.isEnableCommissionFeature && (
                <Form.Group
                  as={Col}
                  xs={12}
                  controlId="commissionGroup"
                  className=""
                >
                  <Form.Check
                    className="form-checkbox mt-3"
                    type="checkbox"
                    label={t(PRICING_SET_COMMISSION)}
                    checked={values.isSetCommission}
                    onChange={handleChange}
                    name="isSetCommission"
                    id="isSetCommission"
                  />
                  {values.isSetCommission && (
                    <>
                      <Form.Label>{t(PRICING_PERCENT_COMMISSION)}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t(PRICING_PERCENT_COMMISSION)}
                        name="percentCommission"
                        value={
                          generalSettingCommission?.isEnableSetupDefaultDriversCommission
                            ? generalSettingCommission.defaultPercentCommission
                            : values.percentCommission
                        }
                        onChange={handleChange}
                        isInvalid={!!errors.percentCommission}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.percentCommission}
                      </Form.Control.Feedback>

                      <Form.Label>{t(PRICING_FIXED_COMMISSION)}</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={t(PRICING_FIXED_COMMISSION)}
                        name="fixedCommission"
                        value={
                          generalSettingCommission?.isEnableSetupDefaultDriversCommission
                            ? generalSettingCommission.defaultFixedCommission
                            : values.fixedCommission
                        }
                        onChange={handleChange}
                        isInvalid={!!errors.fixedCommission}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fixedCommission}
                      </Form.Control.Feedback>
                      <Form.Check
                        className="form-checkbox mt-2"
                        type="checkbox"
                        label={t(PRICING_ALLOW_SEE_COMMISSION)}
                        checked={values.allowSeeCommission}
                        onChange={handleChange}
                        name="allowSeeCommission"
                        id="allowSeeCommission"
                      />
                      <Form.Check
                        className="form-checkbox mt-2"
                        type="checkbox"
                        label={t(PRICING_ALLOW_SEE_PRICE)}
                        checked={values.allowSeePrice}
                        onChange={handleChange}
                        name="allowSeePrice"
                        id="allowSeePrice"
                      />
                    </>
                  )}
                </Form.Group>
              )}
              <ButtonGroup className="form-actions item-center">
                <Button variant="dark" type="submit">
                  <span>{t(BUTTONS_ASSIGN_JOB)}</span>
                  <i className="ico ico-o-next"></i>
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default observer(AssignTruckAndDriverModal);
