import React from 'react';
import { observer } from 'mobx-react-lite';
import ForgotForm from '@/modules/account/components/ForgotForm';

interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleForgotPassword: any;
  handleBack?: any;
  formTitle?: string;
  initialValues?: any;
}

const CustomerForgotForm = (props: ComponentProps) => {
  return (
    <>
      <ForgotForm {...props} />
    </>
  );
};

export default observer(CustomerForgotForm);
