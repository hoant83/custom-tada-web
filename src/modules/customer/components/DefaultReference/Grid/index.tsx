import { CustomerStoreContext } from '@/modules/customer/customer.stote';
import { I18N } from '@/modules/lang/i18n.enum';
import {
  DEFAULT_CONCATENATED_GOODS_TYPE,
  DEFAULT_CONTAINER_SIZE,
  DEFAULT_CONTAINER_TYPE,
  DEFAULT_NON_MOTORIZED_TYPE,
  DEFAULT_CONTRACT_CAR_TYPE,
  DEFAULT_TRUCK_PAYLOAD,
  DEFAULT_TRUCK_TYPE,
  TRANSPORT_TYPE,
} from '@/modules/truck/truck.enum';
import bsCustomFileInput from 'bs-custom-file-input';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import React from 'react';
import { Button, ButtonGroup, Col, Container, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import DefaultAddressForm from '../Address';
import DefaultTruckForm from '../Truck';

const DefaultSettingGrid = () => {
  const customerStore = React.useContext(CustomerStoreContext);

  /*
   * Translation
   */
  const { t } = useTranslation();
  const { BUTTONS_UPDATE, DEFAULT_TITLE, MESSAGES_UPDATE_SUCCESS } = I18N;

  /*
   * set init values
   */
  const [initValues, setInitValues] = React.useState<any>(null);
  const [truckType, setTruckType] = React.useState<DEFAULT_TRUCK_TYPE | null>(
    null
  );
  const [payLoad, setPayLoad] = React.useState<DEFAULT_TRUCK_PAYLOAD | null>(
    null
  );

  const [
    nonMotorizedType,
    setNonMotorizedType,
  ] = React.useState<DEFAULT_NON_MOTORIZED_TYPE | null>(null);
  const [
    concatenatedGoodsType,
    setConcatenatedGoodsType,
  ] = React.useState<DEFAULT_CONCATENATED_GOODS_TYPE | null>(null);
  const [
    contractCarType,
    setContractCarType,
  ] = React.useState<DEFAULT_CONTRACT_CAR_TYPE | null>(null);
  const [
    containerSize,
    setContainerSize,
  ] = React.useState<DEFAULT_CONTAINER_SIZE | null>(null);
  const [
    containerType,
    setContainerType,
  ] = React.useState<DEFAULT_CONTAINER_TYPE | null>(null);
  const [
    typeOfTransport,
    setTypeOfTransport,
  ] = React.useState<TRANSPORT_TYPE | null>(null);

  const handleUpdate = async (values: any) => {
    if (values.dropoffAddressText === '') {
      values.dropoffAddress = [];
    }
    if (values.pickupAddressText === '') {
      values.pickupAddress = [];
    }
    setTruckType(values.truckType);
    setPayLoad(values.truckPayload);
    setContainerSize(values.containerSize);
    setContainerType(values.containerType);
    values.truckType = truckType || null;
    values.typeOfTransport = typeOfTransport || null;
    values.truckPayload = payLoad || null;
    values.nonMotorizedType = nonMotorizedType || null;
    values.concatenatedGoodsType = concatenatedGoodsType || null;
    values.contractCarType = contractCarType || null;
    values.containerSize = containerSize || null;
    values.containerType = containerType || null;
    const result = await customerStore.updateDefaultReference(values);
    if (result) {
      getDefaultReference();
      toast.dismiss();
      toast.success(t(MESSAGES_UPDATE_SUCCESS));
    }
  };

  const handleSetTruckType = (value: any) => {
    setTruckType(value);
  };

  const handleSetContainerType = (value: any) => {
    setContainerType(value);
  };

  const handleSetContainerSize = (value: any) => {
    setContainerSize(value);
  };

  const handleSetTypeOfTransport = (value: any) => {
    setTypeOfTransport(value);
  };

  const handleSetPayLoad = (value: any) => {
    setPayLoad(value);
  };

  const handleSetNoMotorizedType = (value: any) => {
    setNonMotorizedType(value);
  };

  const handleSetConcatenatedGoodsType = (value: any) => {
    setConcatenatedGoodsType(value);
  };

  const handleSetContractCarType = (value: any) => {
    setContractCarType(value);
  };

  const handleChangePlace = (
    value: any,
    field: string,
    setFieldValue: any,
    isJson?: boolean
  ) => {
    setFieldValue(field, value?.formatted_address, false);
    if (field === 'pickupAddressText') {
      if (!isJson) {
        setFieldValue(
          'pickupAddress',
          [value.geometry?.location?.lat(), value.geometry?.location?.lng()],
          false
        );
      } else {
        setFieldValue(
          'pickupAddress',
          [value.geometry?.location?.lat, value.geometry?.location?.lng],
          false
        );
      }

      value?.address_components.map((value: any) => {
        if (value.types[0] === 'administrative_area_level_1') {
          setFieldValue('pickupCity', value.short_name, false);
        }
      });
    }
    if (field === 'dropoffAddressText') {
      if (!isJson) {
        setFieldValue(
          'dropoffAddress',
          [value.geometry?.location?.lat(), value.geometry?.location?.lng()],
          false
        );
      } else {
        setFieldValue(
          'dropoffAddress',
          [value.geometry?.location?.lat, value.geometry?.location?.lng],
          false
        );
      }
    }
  };

  const getDefaultReference = React.useCallback(async () => {
    const data = await customerStore.getDefaultReference();
    if (data) {
      setTypeOfTransport(data.typeOfTransport);
      setTruckType(data.truckType);
      setPayLoad(data.truckPayload);
      setContainerSize(data.containerSize);
      setContainerType(data.containerType);
      setNonMotorizedType(data.nonMotorizedType);
      setConcatenatedGoodsType(data.concatenatedGoodsType);
      setContractCarType(data.contractCarType);
      setInitValues({
        containerSize: data.containerSize,
        containerType: data.containerType,
        pickupCity: data.pickupCity,
        truckPayload: data.truckPayload,
        nonMotorizedType: data.nonMotorizedType,
        concatenatedGoodsType: data.concatenatedGoodsType,
        contractCarType: data.contractCarType,
        truckType: data.truckType,
        typeOfTransport: data.typeOfTransport,
        orderManagerName: data.orderManagerName,
        orderManagerNo: data.orderManagerNo,
        dropoffAddress: data.dropoffAddress,
        dropoffAddressText: data.dropoffAddressText,
        pickupAddress: data.pickupAddress,
        pickupAddressText: data.pickupAddressText,
        personInChargePickup: data.personInChargePickup,
        personInChargePickupNO: data.personInChargePickupNO,
        personInChargeDropoff: data.personInChargeDropoff,
        personInChargeDropoffNO: data.personInChargeDropoffNO,
      });
    }
  }, [customerStore]);

  const handleChooseRecent = (
    value: any,
    field: string,
    setFieldValue: any
  ) => {
    if (value === 'address-book') {
      return true;
    }
    handleChangePlace(value, field, setFieldValue, true);
  };

  const handleChooseAddressBook = (
    data: any,
    field: string,
    setFieldValue: any
  ) => {
    const dataAddress = data.value;
    setFieldValue(field, dataAddress?.locationAddress, false);
    if (field === 'pickupAddressText') {
      setFieldValue('pickupAddress', dataAddress.pickupAddress, false);
      setFieldValue('pickupCity', dataAddress.pickupCity, false);
    }
    if (field === 'dropoffAddressText') {
      setFieldValue('dropoffAddress', dataAddress.dropoffAddress, false);
    }
  };

  const handleClearData = (
    field: string,
    setFieldValue: any,
    index?: number
  ) => {
    if (field === 'pickupAddressText') {
      setFieldValue('pickupAddress', null, false);
      setFieldValue('pickupCity', null, false);

      const pickupField = document.getElementById('pickupAddressText');
      if (pickupField) {
        pickupField.classList.add('no-google');
      }
    }

    if (field === 'dropoffAddressText') {
      setFieldValue('dropoffAddress', null, false);
      const pickupField = document.getElementById('dropoffAddressText');
      if (pickupField) {
        pickupField.classList.add('no-google');
      }
    }
  };

  React.useEffect(() => {
    bsCustomFileInput.init();
  }, [initValues]);

  React.useEffect(() => {
    getDefaultReference();
  }, [getDefaultReference]);

  return (
    <>
      {initValues && (
        <Container
          fluid
          className={'block block-table table-smaller default-reference'}
        >
          <Col xs={12}>
            <h3 className="block-title">{t(DEFAULT_TITLE)}</h3>
          </Col>
          <Formik
            onSubmit={(values) => {
              handleUpdate(values);
            }}
            initialValues={initValues}
            enableReinitialize
          >
            {({ handleSubmit, handleChange, values, setFieldValue }) => (
              <Form
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className={'form form-custom default-reference'}
              >
                <DefaultTruckForm
                  selectedTypeOfTransport={typeOfTransport}
                  handleSetTruckType={handleSetTruckType}
                  handleSetTypeOfTransport={handleSetTypeOfTransport}
                  handleSetPayLoad={handleSetPayLoad}
                  handleSetNoMotorizedType={handleSetNoMotorizedType}
                  handleSetConcatenatedGoodsType={
                    handleSetConcatenatedGoodsType
                  }
                  handleSetContractCarType={handleSetContractCarType}
                  handleChange={handleChange}
                  values={values}
                  handleSetContainerType={handleSetContainerType}
                  handleSetContainerSize={handleSetContainerSize}
                />
                <DefaultAddressForm
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  values={values}
                  handleChangePlace={handleChangePlace}
                  handleChooseRecent={handleChooseRecent}
                  handleChooseAddressBook={handleChooseAddressBook}
                  handleClearData={handleClearData}
                />
                <ButtonGroup className="form-actions">
                  <Button
                    variant="primary"
                    type="submit"
                    className="default-update-btn"
                  >
                    <span>{t(BUTTONS_UPDATE)}</span>
                    <i className="ico ico-update"></i>
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </Container>
      )}
    </>
  );
};
export default observer(DefaultSettingGrid);
