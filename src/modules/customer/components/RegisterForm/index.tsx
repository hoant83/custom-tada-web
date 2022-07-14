import React from 'react';
import { observer } from 'mobx-react-lite';
import RegisterForm from '@/modules/account/components/RegisterForm';

/*
 * Props of Component
 */
interface ComponentProps {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  handleRegister: any;
  handleLogin?: any;
  formTitle?: string;
  initialValues?: any;
  required?: any;
  isCustomerPage: boolean;
}

const CustomerRegisterForm = (props: ComponentProps) => {
  return (
    <>
      <RegisterForm {...props} />
    </>
  );
};

export default observer(CustomerRegisterForm);
