import NormalTruck from '@/modules/order/components/NormalTruck';
import { ACTIONS_MODE, SERVICE_TYPE } from '@/modules/order/order.enum';
import { observer } from 'mobx-react-lite';
import React from 'react';

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

const NormalTruckForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    initialValues,
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

  return (
    <>
      {values && (
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
      )}
    </>
  );
};

export default observer(NormalTruckForm);
