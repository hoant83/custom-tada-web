import { AuthenticationStoreContext } from '@/modules/account/authentication.store';
import TrailorTractorForm from '@/modules/order/components/TrailorTractorForm';
import NormalTruckForm from '@/modules/order/components/NormalTruckForm';
import { ORDER_TYPE, SERVICE_TYPE } from '@/modules/order/order.enum';
import { observer } from 'mobx-react';
import React from 'react';
import NonMotorized from '@/modules/order/components/NonMotorized';
import ConcatenatedGoods from '@/modules/order/components/ConcatenatedGoods';
import ContractCar from '@/modules/order/components/ContractCar';

interface ComponentProps {
  orderType?: any;
  handleChangeOrderType?: any;
  handleCloneAction?: any;
  mode?: any;
  initData?: any;
  handleSubmit?: any;
  handleDelete?: any;
  serviceType?: any;
  handleChangeTransportation?: any;
  errors?: any;
  handleChange?: any;
  truckTypeDefault?: any;
  handleChangeTruckType?: any;
  truckPayloadDefault?: any;
  handleChangeTruckPayload?: any;
  values: any;
  options: any;
  setSelected: any;
  selected: any;
}
const CreateOrderStepOne = (props: ComponentProps) => {
  const {
    orderType,
    mode,
    initData,
    handleSubmit,
    handleDelete,
    serviceType,
    handleChangeTransportation,
    errors,
    handleChange,
    truckTypeDefault,
    truckPayloadDefault,
    handleChangeTruckType,
    handleChangeTruckPayload,
    values,
    options,
    setSelected,
    selected,
  } = props;

  const authStore = React.useContext(AuthenticationStoreContext);

  return (
    <>
      {authStore.loggedUser &&
        orderType === ORDER_TYPE.STANDARD &&
        serviceType === SERVICE_TYPE.NORMAL_TRUCK_VAN && (
          <NormalTruckForm
            initialValues={initData}
            mode={mode}
            serviceType={serviceType}
            handleServiceType={handleChangeTransportation}
            handleSubmitForm={handleSubmit}
            handleDelete={handleDelete}
            values={values}
            errors={errors}
            handleChange={handleChange}
            truckTypeDefault={truckTypeDefault}
            handleChangeTruckType={handleChangeTruckType}
            truckPayloadDefault={truckPayloadDefault}
            handleChangeTruckPayload={handleChangeTruckPayload}
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        )}

      {authStore.loggedUser &&
        orderType === ORDER_TYPE.STANDARD &&
        serviceType === SERVICE_TYPE.TRAILOR_TRACTOR_TRUCK && (
          <TrailorTractorForm
            initialValues={initData}
            mode={mode}
            serviceType={serviceType}
            handleServiceType={handleChangeTransportation}
            values={values}
            errors={errors}
            handleChange={handleChange}
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        )}
      {authStore.loggedUser &&
        orderType === ORDER_TYPE.STANDARD &&
        serviceType === SERVICE_TYPE.NON_MOTORIZED && (
          <NonMotorized
            initialValues={initData}
            serviceType={serviceType}
            handleServiceType={handleChangeTransportation}
            values={initData}
            errors={errors}
            handleChange={handleChange}
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        )}
      {authStore.loggedUser &&
        orderType === ORDER_TYPE.STANDARD &&
        serviceType === SERVICE_TYPE.CONCATENATED_GOODS && (
          <ConcatenatedGoods
            initialValues={initData}
            serviceType={serviceType}
            handleServiceType={handleChangeTransportation}
            values={initData}
            errors={errors}
            handleChange={handleChange}
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        )}
      {authStore.loggedUser &&
        orderType === ORDER_TYPE.STANDARD &&
        serviceType === SERVICE_TYPE.CONTRACT_CAR && (
          <ContractCar
            initialValues={initData}
            serviceType={serviceType}
            handleServiceType={handleChangeTransportation}
            values={initData}
            errors={errors}
            handleChange={handleChange}
            options={options}
            setSelected={setSelected}
            selected={selected}
          />
        )}
    </>
  );
};
export default observer(CreateOrderStepOne);
