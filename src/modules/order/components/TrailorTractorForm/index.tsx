import TrailorTractor from '@/modules/order/components/TrailorTractor';
import { observer } from 'mobx-react-lite';
import React from 'react';

/*
 * Props of Component
 */
interface ComponentProps {
  initialValues: any;
  mode?: string;
  values?: any;
  errors?: any;
  handleChange?: any;
  serviceType: any;
  handleServiceType: any;
  options: any;
  setSelected: any;
  selected: any;
}

const TrailorTractorForm = (props: ComponentProps) => {
  /*
   * Props of Component
   */
  const {
    initialValues,
    values,
    errors,
    handleChange,
    serviceType,
    handleServiceType,
    options,
    setSelected,
    selected,
  } = props;

  return (
    <>
      {values && (
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
      )}
    </>
  );
};

export default observer(TrailorTractorForm);
